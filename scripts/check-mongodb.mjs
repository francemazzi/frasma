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

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 10_000,
  connectTimeoutMS: 10_000,
});

try {
  const started = Date.now();
  await client.connect();
  const db = client.db();
  await db.command({ ping: 1 });

  const [conversations, messages, events] = await Promise.all([
    db.collection("conversations").countDocuments(),
    db.collection("messages").countDocuments(),
    db.collection("events").countDocuments(),
  ]);

  console.log(
    JSON.stringify(
      {
        configured: true,
        connected: true,
        latencyMs: Date.now() - started,
        database: db.databaseName,
        collections: { conversations, messages, events },
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
