/**
 * One-off, idempotent backfill of the retention deadline (`expiresAt`).
 *
 * Documents written before the retention policy have no `expiresAt`, and a
 * TTL index never deletes a document whose indexed field is not a Date. This
 * script gives every such document a deadline computed from its last activity,
 * then raises each user's deadline to the latest one among the conversations
 * and leads they own (same `$max` rule as `touchRetention` in
 * lib/chat/persistence.ts).
 *
 *   node scripts/backfill-retention.mjs --dry-run   # counts only
 *   node scripts/backfill-retention.mjs             # apply
 *
 * Reads MONGODB_URI and CHAT_RETENTION_DAYS from the environment, then from
 * .env.local and .env (first value wins), like scripts/check-mongodb.mjs.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { MongoClient } from "mongodb";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(resolve(process.cwd(), ".env.local"));
loadEnvFile(resolve(process.cwd(), ".env"));

// Mirrors getRetentionDays() in lib/chat/persistence.ts (default 730, cap 730).
const DEFAULT_RETENTION_DAYS = 730;
const MAX_RETENTION_DAYS = 730;

function resolveRetentionDays() {
  const raw = Number(process.env.CHAT_RETENTION_DAYS ?? DEFAULT_RETENTION_DAYS);
  if (!Number.isFinite(raw) || raw <= 0) return DEFAULT_RETENTION_DAYS;
  return Math.min(Math.floor(raw), MAX_RETENTION_DAYS);
}

const RETENTION_DAYS = resolveRetentionDays();
const DRY_RUN = process.argv.includes("--dry-run");
const MISSING = { expiresAt: { $not: { $type: "date" } } };
const BULK_CHUNK = 500;

const plusRetention = (startDate) => ({
  $dateAdd: { startDate, unit: "day", amount: RETENTION_DAYS },
});

const uri = process.env.MONGODB_URI?.trim();
if (!uri) {
  console.error("MONGODB_URI is not configured.");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 10_000,
  connectTimeoutMS: 10_000,
});

async function backfillCollection(collection, pipeline) {
  const missingBefore = await collection.countDocuments(MISSING);
  let modifiedCount = 0;
  if (!DRY_RUN && missingBefore > 0) {
    const result = await collection.updateMany(MISSING, pipeline);
    modifiedCount = result.modifiedCount;
  }
  const missingAfter = DRY_RUN
    ? missingBefore
    : await collection.countDocuments(MISSING);
  return { missingBefore, modifiedCount, missingAfter };
}

try {
  await client.connect();
  const db = client.db();

  const { versionArray } = await db.command({ buildInfo: 1 });
  if (!Array.isArray(versionArray) || versionArray[0] < 5) {
    throw new Error(
      `MongoDB ${versionArray?.join(".") ?? "?"} is too old: $dateAdd needs 5.0+.`,
    );
  }

  const conversations = db.collection("conversations");
  const messages = db.collection("messages");
  const events = db.collection("events");
  const leads = db.collection("leads");
  const users = db.collection("users");

  const report = {
    retentionDays: RETENTION_DAYS,
    dryRun: DRY_RUN,
    database: db.databaseName,
    serverVersion: versionArray.join("."),
    collections: {},
    usersRaised: 0,
  };

  // 1. Conversations: last message, else last update, else creation.
  report.collections.conversations = await backfillCollection(conversations, [
    {
      $set: {
        expiresAt: plusRetention({
          $ifNull: ["$lastMessageAt", { $ifNull: ["$updatedAt", "$createdAt"] }],
        }),
      },
    },
  ]);

  // 2. Messages and events inherit the deadline of their conversation.
  const [messagesMissingBefore, eventsMissingBefore] = await Promise.all([
    messages.countDocuments(MISSING),
    events.countDocuments(MISSING),
  ]);
  const inherited = { messages: 0, events: 0 };
  if (!DRY_RUN) {
    for await (const conversation of conversations.find(
      { expiresAt: { $type: "date" } },
      { projection: { _id: 1, expiresAt: 1 } },
    )) {
      const filter = { conversationId: conversation._id, ...MISSING };
      const update = { $set: { expiresAt: conversation.expiresAt } };
      const [m, e] = await Promise.all([
        messages.updateMany(filter, update),
        events.updateMany(filter, update),
      ]);
      inherited.messages += m.modifiedCount;
      inherited.events += e.modifiedCount;
    }
  }

  // 3. Orphans (conversation already deleted) and userId-only events:
  //    their own creation date plus retention.
  const fromCreatedAt = [{ $set: { expiresAt: plusRetention("$createdAt") } }];
  const messagesReport = await backfillCollection(messages, fromCreatedAt);
  const eventsReport = await backfillCollection(events, fromCreatedAt);
  report.collections.messages = {
    ...messagesReport,
    missingBefore: messagesMissingBefore,
    inheritedFromConversation: inherited.messages,
  };
  report.collections.events = {
    ...eventsReport,
    missingBefore: eventsMissingBefore,
    inheritedFromConversation: inherited.events,
  };

  // 4-5. Leads and users: last update, else creation.
  const fromUpdatedAt = [
    { $set: { expiresAt: plusRetention({ $ifNull: ["$updatedAt", "$createdAt"] }) } },
  ];
  report.collections.leads = await backfillCollection(leads, fromUpdatedAt);
  report.collections.users = await backfillCollection(users, fromUpdatedAt);

  // 6. A user never expires before the conversations and leads they own.
  const ownerPipeline = [
    { $match: { userId: { $type: "string" }, expiresAt: { $type: "date" } } },
    { $group: { _id: "$userId", maxExpiresAt: { $max: "$expiresAt" } } },
  ];
  const groups = [
    ...(await conversations.aggregate(ownerPipeline).toArray()),
    ...(await leads.aggregate(ownerPipeline).toArray()),
  ];
  const maxByUser = new Map();
  for (const group of groups) {
    const current = maxByUser.get(group._id);
    if (!current || group.maxExpiresAt > current) {
      maxByUser.set(group._id, group.maxExpiresAt);
    }
  }
  const operations = [...maxByUser.entries()].map(([userId, expiresAt]) => ({
    updateOne: { filter: { _id: userId }, update: { $max: { expiresAt } } },
  }));
  report.usersConsidered = operations.length;
  if (!DRY_RUN) {
    for (let i = 0; i < operations.length; i += BULK_CHUNK) {
      const result = await users.bulkWrite(operations.slice(i, i + BULK_CHUNK));
      report.usersRaised += result.modifiedCount;
    }
  }

  console.log(JSON.stringify(report, null, 2));
} catch (error) {
  console.error(
    JSON.stringify(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      null,
      2,
    ),
  );
  process.exitCode = 1;
} finally {
  await client.close().catch(() => undefined);
}
