import type { NextApiRequest, NextApiResponse } from "next";
import { getConversationMessages } from "../../../../lib/chat/persistence";
import { isValidConversationId } from "../../../../lib/chat/session";
import {
  InMemoryFixedWindowRateLimiter,
  getClientIp,
} from "../../../../lib/rate-limit";

const conversationRateLimiter = new InMemoryFixedWindowRateLimiter(30, 60_000);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const ipKey = getClientIp(req);
  if (!conversationRateLimiter.allow(ipKey)) {
    return res
      .status(429)
      .json({ error: "Too many requests. Try again later." });
  }

  const rawId = req.query.id;
  const conversationId = Array.isArray(rawId) ? rawId[0] : rawId;
  if (!isValidConversationId(conversationId)) {
    return res.status(400).json({ error: "Invalid conversation id." });
  }

  try {
    const messages = await getConversationMessages(conversationId);
    if (messages === null) {
      return res.status(404).json({ error: "Conversation not found." });
    }

    return res.status(200).json({
      conversationId,
      messages,
    });
  } catch (error) {
    console.error("[conversations] Failed to load conversation.", error);
    return res
      .status(500)
      .json({ error: "Unable to load conversation." });
  }
}
