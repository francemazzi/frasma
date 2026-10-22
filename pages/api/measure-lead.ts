import type { NextApiRequest, NextApiResponse } from "next";
import {
  InMemoryFixedWindowRateLimiter,
  getClientIp,
} from "../../lib/rate-limit";
import {
  OAI_CONVERSIONS_KEY_ENV,
  cleanOpaqueRef,
  isEventId,
  landingSourceUrl,
  sendLeadCreatedEvent,
} from "../../lib/openai/conversions";

type ApiResponse =
  | { ok: true }
  | { ok: false; error: "invalid" | "rate_limited" | "unconfigured" | "delivery_failed" };

const ipRateLimiter = new InMemoryFixedWindowRateLimiter(20, 60_000);

function readCookie(req: NextApiRequest, name: string): string | undefined {
  const parsed = req.cookies?.[name];
  if (typeof parsed === "string" && parsed) return parsed;
  const header = req.headers.cookie;
  if (!header) return undefined;
  const part = header
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`));
  if (!part) return undefined;
  try {
    return decodeURIComponent(part.slice(name.length + 1));
  } catch {
    return undefined;
  }
}

function clientIp(req: NextApiRequest): string | undefined {
  const ip = getClientIp(req);
  if (!ip || ip === "unknown") return undefined;
  if (!/^[\d.]+$/.test(ip) && !ip.includes(":")) return undefined;
  return ip;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "invalid" });
  }

  if (!ipRateLimiter.allow(getClientIp(req))) {
    return res.status(429).json({ ok: false, error: "rate_limited" });
  }

  const body = req.body as { eventId?: unknown; sourceUrl?: unknown; oppref?: unknown; obref?: unknown };
  const id = typeof body?.eventId === "string" ? body.eventId : "";
  const sourceUrl = landingSourceUrl(body?.sourceUrl);
  if (!isEventId(id) || !sourceUrl) {
    return res.status(400).json({ ok: false, error: "invalid" });
  }

  const apiKey = process.env[OAI_CONVERSIONS_KEY_ENV]?.trim();
  if (!apiKey) {
    console.error(`[measure-lead] ${OAI_CONVERSIONS_KEY_ENV} is not set.`);
    return res.status(503).json({ ok: false, error: "unconfigured" });
  }

  const oppref =
    cleanOpaqueRef(readCookie(req, "__oppref")) ?? cleanOpaqueRef(body?.oppref);
  const obref =
    cleanOpaqueRef(readCookie(req, "__obref")) ?? cleanOpaqueRef(body?.obref);
  const userAgent = cleanOpaqueRef(req.headers["user-agent"], 512);

  try {
    const delivered = await sendLeadCreatedEvent({
      id,
      timestampMs: Date.now(),
      sourceUrl,
      oppref,
      obref,
      ipAddress: clientIp(req),
      userAgent,
    }, apiKey);
    if (!delivered) {
      console.error("[measure-lead] OpenAI conversions API rejected the event.");
      return res.status(502).json({ ok: false, error: "delivery_failed" });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[measure-lead] OpenAI conversions API request failed.", error);
    return res.status(502).json({ ok: false, error: "delivery_failed" });
  }
}
