import { MongoClient, type Db } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const MONGO_TIMEOUT_MS = 10_000;
const MONGO_PING_TIMEOUT_MS = 5_000;

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI?.trim());
}

function getMongoUri(): string | null {
  const uri = process.env.MONGODB_URI?.trim();
  return uri || null;
}

function createMongoClient(): MongoClient {
  const uri = getMongoUri();
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  return new MongoClient(uri, {
    serverSelectionTimeoutMS: MONGO_TIMEOUT_MS,
    connectTimeoutMS: MONGO_TIMEOUT_MS,
  });
}

function createClientPromise(): Promise<MongoClient> {
  return createMongoClient().connect();
}

export async function getMongoClient(): Promise<MongoClient | null> {
  if (!isMongoConfigured()) return null;

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClientPromise();
  }

  return global._mongoClientPromise;
}

export async function getMongoDb(): Promise<Db | null> {
  const client = await getMongoClient();
  if (!client) return null;

  return client.db();
}

export async function checkMongoConnection(): Promise<boolean> {
  if (!isMongoConfigured()) return false;

  try {
    const connected = await Promise.race([
      (async () => {
        const db = await getMongoDb();
        if (!db) return false;
        await db.command({ ping: 1 });
        return true;
      })(),
      new Promise<boolean>((_, reject) => {
        setTimeout(
          () => reject(new Error("MongoDB ping timed out.")),
          MONGO_PING_TIMEOUT_MS,
        );
      }),
    ]);
    return connected;
  } catch (error) {
    console.error("[mongodb] Connection check failed.", error);
    global._mongoClientPromise = undefined;
    return false;
  }
}
