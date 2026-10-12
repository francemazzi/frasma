import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeDb, type FakeDb } from "../mongodb/__tests__/fakeDb";

const { getMongoDb, isMongoConfigured, ensureChatIndexes } = vi.hoisted(() => ({
  getMongoDb: vi.fn(),
  isMongoConfigured: vi.fn(() => true),
  ensureChatIndexes: vi.fn(async () => undefined),
}));

vi.mock("../mongodb/client", () => ({ getMongoDb, isMongoConfigured }));
vi.mock("../mongodb/indexes", () => ({ ensureChatIndexes }));

import {
  DEFAULT_RETENTION_DAYS,
  MAX_RETENTION_DAYS,
  appendMessage,
  createConversation,
  getRetentionDays,
  logConversionEvent,
  touchRetention,
} from "./persistence";

const CONVERSATION_ID = "550e8400-e29b-41d4-a716-446655440000";
const USER_ID = "7c9e6679-7425-40de-944b-e07fc1f90ae7";
const DAY_MS = 86_400_000;

function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / DAY_MS);
}

describe("retention window", () => {
  afterEach(() => {
    delete process.env.CHAT_RETENTION_DAYS;
  });

  it("defaults to 730 days, the privacy policy ceiling", () => {
    expect(DEFAULT_RETENTION_DAYS).toBe(730);
    expect(MAX_RETENTION_DAYS).toBe(730);
    expect(getRetentionDays()).toBe(730);
  });

  it("honours a shorter CHAT_RETENTION_DAYS", () => {
    process.env.CHAT_RETENTION_DAYS = "30";
    expect(getRetentionDays()).toBe(30);
  });

  it("never exceeds the policy ceiling", () => {
    process.env.CHAT_RETENTION_DAYS = "1000";
    expect(getRetentionDays()).toBe(730);
  });

  it("falls back to the default on invalid values", () => {
    process.env.CHAT_RETENTION_DAYS = "abc";
    expect(getRetentionDays()).toBe(730);
    process.env.CHAT_RETENTION_DAYS = "0";
    expect(getRetentionDays()).toBe(730);
  });
});

describe("touchRetention", () => {
  let fake: FakeDb;

  beforeEach(() => {
    fake = createFakeDb();
  });

  it("extends the conversation, its messages and its events", async () => {
    const now = new Date("2026-10-12T10:00:00Z");
    const expiresAt = await touchRetention(
      fake.db as never,
      { conversationId: CONVERSATION_ID },
      now,
    );

    expect(daysBetween(now, expiresAt)).toBe(730);
    expect(fake.collection("conversations").updateOne).toHaveBeenCalledWith(
      { _id: CONVERSATION_ID },
      { $set: { expiresAt } },
    );
    expect(fake.collection("messages").updateMany).toHaveBeenCalledWith(
      { conversationId: CONVERSATION_ID },
      { $set: { expiresAt } },
    );
    expect(fake.collection("events").updateMany).toHaveBeenCalledWith(
      { conversationId: CONVERSATION_ID },
      { $set: { expiresAt } },
    );
    expect(fake.collections.has("users")).toBe(false);
    expect(fake.collections.has("leads")).toBe(false);
  });

  it("extends the user with $max and their leads when a userId is given", async () => {
    const now = new Date("2026-10-12T10:00:00Z");
    const expiresAt = await touchRetention(
      fake.db as never,
      { conversationId: CONVERSATION_ID, userId: USER_ID },
      now,
    );

    expect(fake.collection("events").updateMany).toHaveBeenCalledWith(
      { $or: [{ conversationId: CONVERSATION_ID }, { userId: USER_ID }] },
      { $set: { expiresAt } },
    );
    expect(fake.collection("leads").updateMany).toHaveBeenCalledWith(
      { userId: USER_ID },
      { $set: { expiresAt } },
    );
    expect(fake.collection("users").updateOne).toHaveBeenCalledWith(
      { _id: USER_ID },
      { $max: { expiresAt } },
    );
  });

  it("does nothing with an empty scope", async () => {
    await touchRetention(fake.db as never, {});
    expect(fake.collections.size).toBe(0);
  });
});

describe("appendMessage", () => {
  let fake: FakeDb;

  beforeEach(() => {
    fake = createFakeDb();
    getMongoDb.mockResolvedValue(fake.db);
    isMongoConfigured.mockReturnValue(true);
    ensureChatIndexes.mockClear();
  });

  it("stores the message with a retention deadline and extends everything it touches", async () => {
    fake
      .collection("conversations")
      .findOne.mockResolvedValue({ _id: CONVERSATION_ID, userId: USER_ID });

    await appendMessage(CONVERSATION_ID, {
      role: "assistant",
      content: "Ciao",
      latencyMs: 120,
    });

    const insert = fake.collection("messages").insertOne.mock.calls[0]?.[0] as
      | { createdAt: Date; expiresAt: Date; conversationId: string; role: string; latencyMs: number }
      | undefined;
    expect(insert).toMatchObject({
      conversationId: CONVERSATION_ID,
      role: "assistant",
      content: "Ciao",
      latencyMs: 120,
    });
    expect(insert?.createdAt).toBeInstanceOf(Date);
    expect(insert?.expiresAt).toBeInstanceOf(Date);
    expect(daysBetween(insert!.createdAt, insert!.expiresAt)).toBe(730);

    const conversationUpdates = fake.collection("conversations").updateOne.mock
      .calls;
    expect(conversationUpdates[0]?.[1]).toEqual({
      $inc: { messageCount: 1 },
      $set: { updatedAt: insert!.createdAt, lastMessageAt: insert!.createdAt },
    });
    expect(conversationUpdates[1]?.[1]).toEqual({
      $set: { expiresAt: insert!.expiresAt },
    });
    expect(fake.collection("messages").updateMany).toHaveBeenCalledWith(
      { conversationId: CONVERSATION_ID },
      { $set: { expiresAt: insert!.expiresAt } },
    );
    expect(fake.collection("events").updateMany).toHaveBeenCalledWith(
      { $or: [{ conversationId: CONVERSATION_ID }, { userId: USER_ID }] },
      { $set: { expiresAt: insert!.expiresAt } },
    );
    expect(fake.collection("leads").updateMany).toHaveBeenCalledWith(
      { userId: USER_ID },
      { $set: { expiresAt: insert!.expiresAt } },
    );
    expect(fake.collection("users").updateOne).toHaveBeenCalledWith(
      { _id: USER_ID },
      { $max: { expiresAt: insert!.expiresAt } },
    );
    expect(ensureChatIndexes).toHaveBeenCalledWith(fake.db);
  });

  it("skips user and lead updates when the conversation has no owner", async () => {
    fake
      .collection("conversations")
      .findOne.mockResolvedValue({ _id: CONVERSATION_ID });

    await appendMessage(CONVERSATION_ID, { role: "user", content: "Ciao" });

    expect(fake.collection("messages").insertOne).toHaveBeenCalledOnce();
    expect(fake.collection("events").updateMany).toHaveBeenCalledWith(
      { conversationId: CONVERSATION_ID },
      expect.anything(),
    );
    expect(fake.collections.has("users")).toBe(false);
    expect(fake.collections.has("leads")).toBe(false);
  });

  it("writes nothing for an unknown conversation", async () => {
    await appendMessage(CONVERSATION_ID, { role: "user", content: "Ciao" });

    expect(fake.collections.has("messages")).toBe(false);
    expect(fake.collection("conversations").updateOne).not.toHaveBeenCalled();
  });
});

describe("createConversation", () => {
  it("touches the owning user", async () => {
    const fake = createFakeDb();
    getMongoDb.mockResolvedValue(fake.db);
    isMongoConfigured.mockReturnValue(true);

    const conversationId = await createConversation({
      lang: "it",
      timezone: "Europe/Rome",
      pagePath: "/",
      userId: USER_ID,
    });

    expect(conversationId).toMatch(/^[0-9a-f-]{36}$/);
    const insert = fake.collection("conversations").insertOne.mock.calls[0]?.[0] as
      | { expiresAt: Date; createdAt: Date }
      | undefined;
    expect(daysBetween(insert!.createdAt, insert!.expiresAt)).toBe(730);
    expect(fake.collection("users").updateOne).toHaveBeenCalledWith(
      { _id: USER_ID },
      { $max: { expiresAt: expect.any(Date) } },
    );
    expect(fake.collection("leads").updateMany).toHaveBeenCalledOnce();
  });
});

describe("logConversionEvent", () => {
  let fake: FakeDb;

  beforeEach(() => {
    fake = createFakeDb();
    getMongoDb.mockResolvedValue(fake.db);
    isMongoConfigured.mockReturnValue(true);
  });

  it("stores the event with a retention deadline and completes the conversation", async () => {
    fake
      .collection("conversations")
      .findOne.mockResolvedValue({ _id: CONVERSATION_ID, userId: USER_ID });

    await logConversionEvent(
      CONVERSATION_ID,
      "project_brief_submitted",
      { leadId: "lead-1" },
      { contactEmail: "ada@example.com", contactName: "Ada", userId: USER_ID },
    );

    const insert = fake.collection("events").insertOne.mock.calls[0]?.[0] as
      | { createdAt: Date; expiresAt: Date }
      | undefined;
    expect(insert).toMatchObject({
      conversationId: CONVERSATION_ID,
      userId: USER_ID,
      type: "project_brief_submitted",
      payload: { leadId: "lead-1" },
    });
    expect(daysBetween(insert!.createdAt, insert!.expiresAt)).toBe(730);

    const flagUpdate = fake.collection("conversations").updateOne.mock.calls[0];
    expect(flagUpdate?.[0]).toEqual({ _id: CONVERSATION_ID });
    expect(flagUpdate?.[1]).toEqual({
      $set: {
        updatedAt: insert!.createdAt,
        hasProjectBrief: true,
        status: "completed",
        contactEmail: "ada@example.com",
        contactName: "Ada",
      },
    });
    expect(fake.collection("users").updateOne).toHaveBeenCalledWith(
      { _id: USER_ID },
      { $max: { expiresAt: insert!.expiresAt } },
    );
    expect(fake.collection("messages").updateMany).toHaveBeenCalledWith(
      { conversationId: CONVERSATION_ID },
      { $set: { expiresAt: insert!.expiresAt } },
    );
  });

  it("extends retention for userId-only events from the landing form", async () => {
    await logConversionEvent(
      undefined,
      "project_brief_submitted",
      { leadId: "lead-2" },
      { userId: USER_ID },
    );

    expect(fake.collection("events").insertOne).toHaveBeenCalledWith(
      expect.objectContaining({ userId: USER_ID, expiresAt: expect.any(Date) }),
    );
    expect(fake.collection("events").insertOne).toHaveBeenCalledWith(
      expect.not.objectContaining({ conversationId: expect.anything() }),
    );
    expect(fake.collection("conversations").updateOne).not.toHaveBeenCalled();
    expect(fake.collection("leads").updateMany).toHaveBeenCalledWith(
      { userId: USER_ID },
      { $set: { expiresAt: expect.any(Date) } },
    );
    expect(fake.collection("users").updateOne).toHaveBeenCalledWith(
      { _id: USER_ID },
      { $max: { expiresAt: expect.any(Date) } },
    );
  });

  it("falls back to the conversation owner when the caller has no userId", async () => {
    fake
      .collection("conversations")
      .findOne.mockResolvedValue({ _id: CONVERSATION_ID, userId: USER_ID });

    await logConversionEvent(CONVERSATION_ID, "diagnostic_sent", {});

    expect(fake.collection("users").updateOne).toHaveBeenCalledWith(
      { _id: USER_ID },
      { $max: { expiresAt: expect.any(Date) } },
    );
  });

  it("writes nothing for an unknown conversation without a userId", async () => {
    await logConversionEvent(CONVERSATION_ID, "diagnostic_sent", {});

    expect(fake.collections.has("events")).toBe(false);
  });
});
