import { afterEach, describe, expect, it } from "vitest";
import { hashClientIp, isPersistenceEnabled } from "./persistence";
import { isValidConversationId } from "./session";

describe("chat persistence helpers", () => {
  afterEach(() => {
    delete process.env.MONGODB_URI;
  });

  it("hashes client ip to a short stable prefix", () => {
    const hash = hashClientIp("203.0.113.10");
    expect(hash).toHaveLength(8);
    expect(hashClientIp("203.0.113.10")).toBe(hash);
  });

  it("reports persistence disabled without MongoDB env", () => {
    expect(isPersistenceEnabled()).toBe(false);
  });

  it("reports persistence enabled when MONGODB_URI is set", () => {
    process.env.MONGODB_URI =
      "mongodb+srv://user:pass@cluster.mongodb.net/frasma_chat";
    expect(isPersistenceEnabled()).toBe(true);
  });

  it("reuses session validation for conversation ids", () => {
    expect(isValidConversationId("550e8400-e29b-41d4-a716-446655440000")).toBe(
      true,
    );
  });
});
