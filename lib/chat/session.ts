export const CHAT_CONVERSATION_STORAGE_KEY = "frasma_chat_conversation_id";

const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidConversationId(value: unknown): value is string {
  return typeof value === "string" && UUID_V4_REGEX.test(value);
}

export function readStoredConversationId(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(CHAT_CONVERSATION_STORAGE_KEY);
    return isValidConversationId(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function writeStoredConversationId(conversationId: string): void {
  if (typeof window === "undefined") return;
  if (!isValidConversationId(conversationId)) return;

  try {
    window.localStorage.setItem(CHAT_CONVERSATION_STORAGE_KEY, conversationId);
  } catch {
    // Ignore quota or privacy mode errors.
  }
}

export function clearStoredConversationId(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(CHAT_CONVERSATION_STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
}
