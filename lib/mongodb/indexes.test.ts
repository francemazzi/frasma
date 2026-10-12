import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeDb } from "./__tests__/fakeDb";

const { getMongoDb, isMongoConfigured } = vi.hoisted(() => ({
  getMongoDb: vi.fn(),
  isMongoConfigured: vi.fn(() => true),
}));

vi.mock("./client", () => ({ getMongoDb, isMongoConfigured }));

const RETAINED_COLLECTIONS = [
  "conversations",
  "messages",
  "events",
  "users",
  "leads",
];

describe("ensureChatIndexes", () => {
  beforeEach(() => {
    vi.resetModules();
    isMongoConfigured.mockReturnValue(true);
  });

  it("creates a TTL index on expiresAt for every retained collection", async () => {
    const { ensureChatIndexes } = await import("./indexes");
    const fake = createFakeDb();

    await ensureChatIndexes(fake.db as never);

    for (const name of RETAINED_COLLECTIONS) {
      expect(fake.collection(name).createIndex).toHaveBeenCalledWith(
        { expiresAt: 1 },
        { expireAfterSeconds: 0 },
      );
    }
    expect(fake.collection("users").createIndex).toHaveBeenCalledWith(
      { email: 1 },
      { unique: true },
    );
    expect(fake.collection("messages").createIndex).toHaveBeenCalledWith({
      conversationId: 1,
      createdAt: 1,
    });
  });

  it("only runs once per process", async () => {
    const { ensureChatIndexes } = await import("./indexes");
    const fake = createFakeDb();

    await ensureChatIndexes(fake.db as never);
    const callsAfterFirstRun = fake.db.collection.mock.calls.length;
    expect(callsAfterFirstRun).toBeGreaterThan(0);

    await ensureChatIndexes(fake.db as never);

    expect(fake.db.collection).toHaveBeenCalledTimes(callsAfterFirstRun);
  });

  it("skips when persistence is not configured", async () => {
    isMongoConfigured.mockReturnValue(false);
    const { ensureChatIndexes } = await import("./indexes");
    const fake = createFakeDb();

    await ensureChatIndexes(fake.db as never);

    expect(fake.collections.size).toBe(0);
  });
});
