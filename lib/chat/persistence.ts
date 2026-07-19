import { createHash, randomUUID } from "node:crypto";
import { getMongoDb, isMongoConfigured } from "../mongodb/client";
import { ensureChatIndexes } from "../mongodb/indexes";
import { isValidConversationId } from "./session";

export type ConversationLang = "it" | "en";
export type ConversationStatus = "active" | "completed" | "abandoned";
export type MessageRole = "user" | "assistant";
export type ConversionEventType =
  | "email_sent"
  | "meeting_scheduled"
  | "diagnostic_sent";

export type StoredMessage = {
  role: MessageRole;
  content: string;
};

export type CreateConversationInput = {
  lang: ConversationLang;
  timezone: string;
  pagePath: string;
  clientIp?: string;
};

export type AppendMessageInput = {
  role: MessageRole;
  content: string;
  latencyMs?: number;
};

export type ContactUpdate = {
  contactEmail?: string;
  contactName?: string;
};

const CONVERSATIONS_COLLECTION = "conversations";
const MESSAGES_COLLECTION = "messages";
const EVENTS_COLLECTION = "events";

type ConversationDocument = {
  _id: string;
  lang: ConversationLang;
  timezone: string;
  pagePath: string;
  status: ConversationStatus;
  messageCount: number;
  hasDiagnostic: boolean;
  hasEmailSent: boolean;
  hasMeetingScheduled: boolean;
  contactEmail?: string;
  contactName?: string;
  clientIpHash?: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
  expiresAt: Date;
};

type MessageDocument = {
  conversationId: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
  latencyMs?: number;
};

type EventDocument = {
  conversationId: string;
  type: ConversionEventType;
  payload: Record<string, unknown>;
  createdAt: Date;
};

function getRetentionDays(): number {
  const raw = Number(process.env.CHAT_RETENTION_DAYS ?? "90");
  if (!Number.isFinite(raw) || raw <= 0) return 90;
  return Math.min(Math.floor(raw), 365);
}

function buildExpiresAt(from = new Date()): Date {
  const expiresAt = new Date(from);
  expiresAt.setDate(expiresAt.getDate() + getRetentionDays());
  return expiresAt;
}

export function hashClientIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 8);
}

export function isPersistenceEnabled(): boolean {
  return isMongoConfigured();
}

async function getDbWithIndexes() {
  const db = await getMongoDb();
  if (!db) return null;

  await ensureChatIndexes(db);
  return db;
}

export async function createConversation(
  input: CreateConversationInput,
): Promise<string | null> {
  if (!isPersistenceEnabled()) return null;

  const db = await getDbWithIndexes();
  if (!db) return null;

  const conversationId = randomUUID();
  const now = new Date();

  await db.collection<ConversationDocument>(CONVERSATIONS_COLLECTION).insertOne({
    _id: conversationId,
    lang: input.lang,
    timezone: input.timezone,
    pagePath: input.pagePath,
    status: "active" as ConversationStatus,
    messageCount: 0,
    hasDiagnostic: false,
    hasEmailSent: false,
    hasMeetingScheduled: false,
    ...(input.clientIp ? { clientIpHash: hashClientIp(input.clientIp) } : {}),
    createdAt: now,
    updatedAt: now,
    lastMessageAt: now,
    expiresAt: buildExpiresAt(now),
  });

  return conversationId;
}

export async function conversationExists(
  conversationId: string,
): Promise<boolean> {
  if (!isPersistenceEnabled() || !isValidConversationId(conversationId)) {
    return false;
  }

  const db = await getDbWithIndexes();
  if (!db) return false;

  const conversation = await db
    .collection<ConversationDocument>(CONVERSATIONS_COLLECTION)
    .findOne({ _id: conversationId }, { projection: { _id: 1 } });

  return conversation !== null;
}

export async function getConversationMessages(
  conversationId: string,
): Promise<StoredMessage[] | null> {
  if (!isPersistenceEnabled() || !isValidConversationId(conversationId)) {
    return null;
  }

  const db = await getDbWithIndexes();
  if (!db) return null;

  const conversation = await db
    .collection<ConversationDocument>(CONVERSATIONS_COLLECTION)
    .findOne({ _id: conversationId }, { projection: { _id: 1 } });

  if (!conversation) return null;

  const messages = await db
    .collection<MessageDocument>(MESSAGES_COLLECTION)
    .find({ conversationId })
    .sort({ createdAt: 1 })
    .toArray();

  return messages.map((message) => ({
    role: message.role as MessageRole,
    content: String(message.content ?? ""),
  }));
}

export async function appendMessage(
  conversationId: string,
  input: AppendMessageInput,
): Promise<void> {
  if (!isPersistenceEnabled() || !isValidConversationId(conversationId)) return;

  const db = await getDbWithIndexes();
  if (!db) return;

  const conversation = await db
    .collection<ConversationDocument>(CONVERSATIONS_COLLECTION)
    .findOne({ _id: conversationId }, { projection: { _id: 1 } });

  if (!conversation) return;

  const now = new Date();

  await db.collection<MessageDocument>(MESSAGES_COLLECTION).insertOne({
    conversationId,
    role: input.role,
    content: input.content,
    createdAt: now,
    ...(typeof input.latencyMs === "number"
      ? { latencyMs: input.latencyMs }
      : {}),
  });

  await db.collection<ConversationDocument>(CONVERSATIONS_COLLECTION).updateOne(
    { _id: conversationId },
    {
      $inc: { messageCount: 1 },
      $set: {
        updatedAt: now,
        lastMessageAt: now,
        expiresAt: buildExpiresAt(now),
      },
    },
  );
}

export async function resolveConversationId(
  conversationId: string | undefined,
  input: CreateConversationInput,
): Promise<string | null> {
  if (!isPersistenceEnabled()) return null;

  if (conversationId && isValidConversationId(conversationId)) {
    const exists = await conversationExists(conversationId);
    if (exists) return conversationId;
  }

  return createConversation(input);
}

export async function logConversionEvent(
  conversationId: string | undefined,
  type: ConversionEventType,
  payload: Record<string, unknown>,
  contact?: ContactUpdate,
): Promise<void> {
  if (!isPersistenceEnabled()) return;
  if (!conversationId || !isValidConversationId(conversationId)) return;

  const db = await getDbWithIndexes();
  if (!db) return;

  const conversation = await db
    .collection<ConversationDocument>(CONVERSATIONS_COLLECTION)
    .findOne({ _id: conversationId }, { projection: { _id: 1 } });

  if (!conversation) return;

  const now = new Date();

  await db.collection<EventDocument>(EVENTS_COLLECTION).insertOne({
    conversationId,
    type,
    payload,
    createdAt: now,
  });

  const updates: Record<string, unknown> = {
    updatedAt: now,
    expiresAt: buildExpiresAt(now),
  };

  if (type === "email_sent") updates.hasEmailSent = true;
  if (type === "meeting_scheduled") updates.hasMeetingScheduled = true;
  if (type === "diagnostic_sent") {
    updates.hasDiagnostic = true;
    updates.status = "completed";
  }

  if (contact?.contactEmail) updates.contactEmail = contact.contactEmail;
  if (contact?.contactName) updates.contactName = contact.contactName;

  await db
    .collection<ConversationDocument>(CONVERSATIONS_COLLECTION)
    .updateOne({ _id: conversationId }, { $set: updates });
}
