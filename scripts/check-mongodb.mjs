import { readFileSync, existsSync } from "node:fs";
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

const uri = process.env.MONGODB_URI?.trim();
const configured = Boolean(uri);

if (!configured) {
  console.log(JSON.stringify({ configured: false, connected: false }, null, 2));
  process.exit(1);
}

const RETAINED_COLLECTIONS = [
  "conversations",
  "messages",
  "events",
  "users",
  "leads",
];
const MISSING_EXPIRES_AT = { expiresAt: { $not: { $type: "date" } } };

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 10_000,
  connectTimeoutMS: 10_000,
});

try {
  const started = Date.now();
  await client.connect();
  const db = client.db();
  await db.command({ ping: 1 });

  const collections = {};
  for (const name of RETAINED_COLLECTIONS) {
    const collection = db.collection(name);
    const [count, missingExpiresAt, indexes] = await Promise.all([
      collection.countDocuments(),
      collection.countDocuments(MISSING_EXPIRES_AT),
      collection.indexes().catch(() => []),
    ]);
    const ttlIndex = indexes.some(
      (index) =>
        index.key?.expiresAt === 1 && index.expireAfterSeconds !== undefined,
    );
    collections[name] = { count, missingExpiresAt, ttlIndex };
  }

  console.log(
    JSON.stringify(
      {
        configured: true,
        connected: true,
        latencyMs: Date.now() - started,
        database: db.databaseName,
        collections,
      },
      null,
      2,
    ),
  );
} catch (error) {
  console.log(
    JSON.stringify(
      {
        configured: true,
        connected: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      null,
      2,
    ),
  );
  process.exit(1);
} finally {
  await client.close().catch(() => undefined);
}
