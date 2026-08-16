import type { Db } from "mongodb";
import { getMongoDb, isMongoConfigured } from "./client";

let indexesEnsured = false;

export async function ensureChatIndexes(db?: Db | null): Promise<void> {
  if (!isMongoConfigured()) return;
  if (indexesEnsured) return;

  const database = db ?? (await getMongoDb());
  if (!database) return;

  await Promise.all([
    database
      .collection("conversations")
      .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    database
      .collection("conversations")
      .createIndex({ userId: 1, lastMessageAt: -1 }),
    database
      .collection("messages")
      .createIndex({ conversationId: 1, createdAt: 1 }),
    database
      .collection("events")
      .createIndex({ conversationId: 1, createdAt: -1 }),
    database.collection("users").createIndex({ email: 1 }, { unique: true }),
  ]);

  indexesEnsured = true;
}
