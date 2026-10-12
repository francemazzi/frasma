/**
 * Collection names shared by every persistence module.
 *
 * Kept in a leaf module so that `lib/chat/persistence.ts` can touch `users`
 * and `leads` (retention) without importing `visitors.ts` or `leads/submit.ts`,
 * which already import persistence.ts.
 */
export const CONVERSATIONS_COLLECTION = "conversations";
export const MESSAGES_COLLECTION = "messages";
export const EVENTS_COLLECTION = "events";
export const USERS_COLLECTION = "users";
export const LEADS_COLLECTION = "leads";
