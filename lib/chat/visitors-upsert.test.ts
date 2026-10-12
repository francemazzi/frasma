import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeDb, type FakeDb } from "../mongodb/__tests__/fakeDb";

const { getMongoDb, isMongoConfigured, ensureChatIndexes, touchRetention } =
  vi.hoisted(() => ({
    getMongoDb: vi.fn(),
    isMongoConfigured: vi.fn(() => true),
    ensureChatIndexes: vi.fn(async () => undefined),
    touchRetention: vi.fn(async () => new Date()),
  }));

vi.mock("../mongodb/client", () => ({ getMongoDb, isMongoConfigured }));
vi.mock("../mongodb/indexes", () => ({ ensureChatIndexes }));
vi.mock("./persistence", async () => {
  const actual = await vi.importActual<typeof import("./persistence")>(
    "./persistence",
  );
  return { ...actual, touchRetention };
});

import { setVisitorLastConversation, upsertVisitor } from "./visitors";

const CONVERSATION_ID = "550e8400-e29b-41d4-a716-446655440000";
const DAY_MS = 86_400_000;

const storedUser = {
  _id: "user-1",
  email: "ada@example.com",
  name: "Ada Lovelace",
  company: "Analytical Engines",
  sector: "Manufacturing",
  role: "CTO",
  createdAt: new Date("2026-01-01T00:00:00Z"),
  updatedAt: new Date("2026-01-02T00:00:00Z"),
};

const registration = {
  email: "  Ada@Example.COM ",
  name: "Ada Lovelace",
  company: "Analytical Engines",
  sector: "Manufacturing",
};

type UpsertCall = [
  filter: { email: string },
  update: {
    $set: Record<string, unknown>;
    $setOnInsert: Record<string, unknown>;
    $max: { expiresAt: Date };
  },
  options: Record<string, unknown>,
];

function upsertCall(fake: FakeDb, index = 0): UpsertCall {
  return fake.collection("users").findOneAndUpdate.mock.calls[
    index
  ] as unknown as UpsertCall;
}

describe("upsertVisitor", () => {
  let fake: FakeDb;

  beforeEach(() => {
    fake = createFakeDb();
    getMongoDb.mockResolvedValue(fake.db);
    isMongoConfigured.mockReturnValue(true);
    fake.collection("users").findOneAndUpdate.mockResolvedValue({
      value: storedUser,
      lastErrorObject: { n: 1, updatedExisting: true },
    });
  });

  it("performs one atomic upsert keyed by the normalised email", async () => {
    await upsertVisitor(registration);

    const users = fake.collection("users");
    expect(users.findOneAndUpdate).toHaveBeenCalledOnce();
    expect(users.findOne).not.toHaveBeenCalled();
    expect(users.insertOne).not.toHaveBeenCalled();

    const [filter, , options] = upsertCall(fake);
    expect(filter).toEqual({ email: "ada@example.com" });
    expect(options).toEqual({
      upsert: true,
      returnDocument: "after",
      includeResultMetadata: true,
    });
    expect(ensureChatIndexes).toHaveBeenCalledWith(fake.db);
  });

  it("overwrites name, a non-empty company and a specific sector", async () => {
    await upsertVisitor(registration);

    const [, update] = upsertCall(fake);
    expect(update.$set).toEqual({
      name: "Ada Lovelace",
      company: "Analytical Engines",
      sector: "Manufacturing",
      updatedAt: expect.any(Date),
    });
    expect(update.$setOnInsert).toEqual({
      _id: expect.stringMatching(/^[0-9a-f-]{36}$/),
      email: "ada@example.com",
      createdAt: expect.any(Date),
    });
  });

  it("keeps the stored company and sector when the input is empty or unspecified", async () => {
    await upsertVisitor({
      email: "ada@example.com",
      name: "Ada",
      company: "",
      sector: "unspecified",
    });

    const [, update] = upsertCall(fake);
    expect(update.$set).toEqual({ name: "Ada", updatedAt: expect.any(Date) });
    expect(update.$setOnInsert).toMatchObject({
      company: "",
      sector: "unspecified",
    });
  });

  it("never places a field in both $set and $setOnInsert", async () => {
    await upsertVisitor(registration);
    await upsertVisitor({
      email: "ada@example.com",
      name: "Ada",
      company: "",
      sector: "unspecified",
      role: "CTO",
    });

    for (const index of [0, 1]) {
      const [, update] = upsertCall(fake, index);
      const overlap = Object.keys(update.$set).filter(
        (key) => key in update.$setOnInsert,
      );
      expect(overlap).toEqual([]);
    }
  });

  it("stores the role only when provided", async () => {
    await upsertVisitor({ ...registration, role: "  CTO " });
    await upsertVisitor(registration);

    expect(upsertCall(fake, 0)[1].$set).toMatchObject({ role: "CTO" });
    const [, withoutRole] = upsertCall(fake, 1);
    expect(withoutRole.$set).not.toHaveProperty("role");
    expect(withoutRole.$setOnInsert).not.toHaveProperty("role");
  });

  it("extends the retention deadline with $max", async () => {
    await upsertVisitor(registration);

    const [, update] = upsertCall(fake);
    const updatedAt = update.$set.updatedAt as Date;
    expect(update.$max.expiresAt).toBeInstanceOf(Date);
    expect(
      Math.round((update.$max.expiresAt.getTime() - updatedAt.getTime()) / DAY_MS),
    ).toBe(730);
  });

  it("maps the returned document and reports an existing visitor", async () => {
    const result = await upsertVisitor(registration);

    expect(result).toEqual({
      created: false,
      visitor: {
        id: "user-1",
        email: "ada@example.com",
        name: "Ada Lovelace",
        company: "Analytical Engines",
        sector: "Manufacturing",
        role: "CTO",
        createdAt: storedUser.createdAt,
        updatedAt: storedUser.updatedAt,
      },
    });
  });

  it("reports a created visitor from the upsert metadata", async () => {
    fake.collection("users").findOneAndUpdate.mockResolvedValue({
      value: { ...storedUser, role: undefined },
      lastErrorObject: { n: 1, updatedExisting: false, upserted: "user-1" },
    });

    const result = await upsertVisitor(registration);

    expect(result?.created).toBe(true);
    expect(result?.visitor).not.toHaveProperty("role");
  });

  it("retries once when the insert loses a duplicate-key race", async () => {
    fake
      .collection("users")
      .findOneAndUpdate.mockRejectedValueOnce({ code: 11000 });

    const result = await upsertVisitor(registration);

    expect(fake.collection("users").findOneAndUpdate).toHaveBeenCalledTimes(2);
    expect(result?.created).toBe(false);
    expect(result?.visitor.id).toBe("user-1");
  });

  it("rethrows errors other than duplicate keys", async () => {
    fake
      .collection("users")
      .findOneAndUpdate.mockRejectedValueOnce(new Error("mongo down"));

    await expect(upsertVisitor(registration)).rejects.toThrow("mongo down");
    expect(fake.collection("users").findOneAndUpdate).toHaveBeenCalledOnce();
  });

  it("throws when the upsert returns no document", async () => {
    fake.collection("users").findOneAndUpdate.mockResolvedValue({
      value: null,
      lastErrorObject: { n: 0, updatedExisting: false },
    });

    await expect(upsertVisitor(registration)).rejects.toThrow(
      "Visitor upsert returned no document.",
    );
  });

  it("returns null when persistence is disabled", async () => {
    isMongoConfigured.mockReturnValue(false);

    await expect(upsertVisitor(registration)).resolves.toBeNull();
    expect(fake.collection("users").findOneAndUpdate).not.toHaveBeenCalled();
  });
});

describe("setVisitorLastConversation", () => {
  it("records the conversation and touches retention for both", async () => {
    const fake = createFakeDb();
    getMongoDb.mockResolvedValue(fake.db);
    isMongoConfigured.mockReturnValue(true);
    touchRetention.mockClear();

    await setVisitorLastConversation("user-1", CONVERSATION_ID);

    expect(fake.collection("users").updateOne).toHaveBeenCalledWith(
      { _id: "user-1" },
      {
        $set: {
          lastConversationId: CONVERSATION_ID,
          updatedAt: expect.any(Date),
        },
      },
    );
    expect(touchRetention).toHaveBeenCalledWith(
      fake.db,
      { conversationId: CONVERSATION_ID, userId: "user-1" },
      expect.any(Date),
    );
  });

  it("ignores invalid conversation ids", async () => {
    const fake = createFakeDb();
    getMongoDb.mockResolvedValue(fake.db);
    isMongoConfigured.mockReturnValue(true);
    touchRetention.mockClear();

    await setVisitorLastConversation("user-1", "not-a-uuid");

    expect(fake.collections.size).toBe(0);
    expect(touchRetention).not.toHaveBeenCalled();
  });
});
