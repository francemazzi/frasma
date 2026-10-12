import { vi } from "vitest";

/**
 * Minimal in-memory stand-in for the MongoDB `Db` handle used by the
 * persistence modules. Every collection method is a `vi.fn` so tests can
 * assert the exact operations sent to the driver.
 */
type Args = unknown[];

export function createFakeCollection() {
  const cursor = {
    sort: vi.fn((..._args: Args) => cursor),
    limit: vi.fn((..._args: Args) => cursor),
    next: vi.fn(async (..._args: Args) => null as unknown),
    toArray: vi.fn(async (..._args: Args) => [] as unknown[]),
  };

  return {
    insertOne: vi.fn(async (..._args: Args) => ({
      acknowledged: true,
      insertedId: "id",
    })),
    updateOne: vi.fn(async (..._args: Args) => ({
      acknowledged: true,
      matchedCount: 1,
      modifiedCount: 1,
    })),
    updateMany: vi.fn(async (..._args: Args) => ({
      acknowledged: true,
      matchedCount: 0,
      modifiedCount: 0,
    })),
    findOne: vi.fn(async (..._args: Args) => null as unknown),
    findOneAndUpdate: vi.fn(async (..._args: Args) => ({
      value: null as unknown,
      lastErrorObject: { n: 0, updatedExisting: false } as {
        n: number;
        updatedExisting: boolean;
        upserted?: unknown;
      },
    })),
    find: vi.fn((..._args: Args) => cursor),
    createIndex: vi.fn(async (..._args: Args) => "index"),
    countDocuments: vi.fn(async (..._args: Args) => 0),
    cursor,
  };
}

export type FakeCollection = ReturnType<typeof createFakeCollection>;

export function createFakeDb() {
  const collections = new Map<string, FakeCollection>();

  const collection = (name: string): FakeCollection => {
    let existing = collections.get(name);
    if (!existing) {
      existing = createFakeCollection();
      collections.set(name, existing);
    }
    return existing;
  };

  const db = {
    databaseName: "frasma_chat_test",
    collection: vi.fn(collection),
  };

  return { db, collection, collections };
}

export type FakeDb = ReturnType<typeof createFakeDb>;
