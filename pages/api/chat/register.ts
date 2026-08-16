import type { NextApiRequest, NextApiResponse } from "next";
import {
  ChatRegisterSchema,
  registerChatSession,
} from "../../../lib/chat/visitors";
import { isPersistenceEnabled } from "../../../lib/chat/persistence";
import {
  InMemoryFixedWindowRateLimiter,
  getClientIp,
} from "../../../lib/rate-limit";

const registerRateLimiter = new InMemoryFixedWindowRateLimiter(10, 60_000);
const disposableDomainFragments = [
  "tempmail",
  "10minutemail",
  "guerrillamail",
  "mailinator",
];

function normalizePagePath(value: unknown): string {
  if (typeof value !== "string" || value.trim().length === 0) return "/";
  const trimmed = value.trim();
  if (!trimmed.startsWith("/")) return "/";
  return trimmed.slice(0, 500);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const ipKey = getClientIp(req);
  if (!registerRateLimiter.allow(ipKey)) {
    return res
      .status(429)
      .json({ error: "Too many requests. Try again later." });
  }

  if (!isPersistenceEnabled()) {
    return res.status(503).json({
      error: "Chat registration requires persistence.",
    });
  }

  const parsed = ChatRegisterSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request." });
  }

  const data = parsed.data;
  if (String(data.honeypot ?? "").trim().length > 0) {
    return res.status(200).json({
      conversationId: "00000000-0000-4000-8000-000000000000",
      messages: [],
      visitor: {
        name: data.name,
        email: data.email,
        company: data.company,
        sector: data.sector,
      },
      returning: false,
    });
  }

  const emailDomain = data.email.split("@")[1]?.toLowerCase() || "";
  if (
    disposableDomainFragments.some((fragment) => emailDomain.includes(fragment))
  ) {
    return res.status(400).json({ error: "Invalid email." });
  }

  try {
    const session = await registerChatSession({
      name: data.name,
      email: data.email,
      company: data.company,
      sector: data.sector,
      lang: data.lang === "en" ? "en" : "it",
      timezone:
        typeof data.timezone === "string" && data.timezone.trim().length > 0
          ? data.timezone.trim()
          : "Europe/Rome",
      pagePath: normalizePagePath(data.pagePath),
      clientIp: ipKey,
    });

    if (!session) {
      return res.status(503).json({
        error: "Unable to register chat visitor.",
      });
    }

    return res.status(200).json({
      conversationId: session.conversationId,
      messages: session.messages,
      visitor: session.visitor,
      returning: session.returning,
    });
  } catch (error) {
    console.error("[chat/register] Failed to register visitor.", error);
    return res.status(500).json({
      error: "Unable to register chat visitor.",
    });
  }
}
