import { describe, expect, it } from "vitest";
import {
  CHAT_CONVERSATION_STORAGE_KEY,
  isValidConversationId,
} from "./session";

describe("chat session helpers", () => {
  it("accepts valid UUID v4 conversation ids", () => {
    expect(
      isValidConversationId("550e8400-e29b-41d4-a716-446655440000"),
    ).toBe(true);
  });

  it("rejects invalid conversation ids", () => {
    expect(isValidConversationId("not-a-uuid")).toBe(false);
    expect(isValidConversationId("")).toBe(false);
    expect(isValidConversationId(null)).toBe(false);
  });

  it("exports the localStorage key", () => {
    expect(CHAT_CONVERSATION_STORAGE_KEY).toBe("frasma_chat_conversation_id");
  });
});
