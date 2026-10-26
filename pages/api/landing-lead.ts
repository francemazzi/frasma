import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";
import { CONTACT } from "../../lib/contact";
import {
  buildNotificationFromAddress,
  deliverNotificationEmail,
  getNotificationRecipient,
} from "../../lib/email/deliver";
import { landingLeadMessage, parseLandingLead } from "../../lib/landingLead";
import {
  OAI_CONVERSIONS_KEY_ENV,
  cleanOpaqueRef,
  landingSourceUrl,
  sendLeadCreatedEvent,
} from "../../lib/openai/conversions";
import {
  InMemoryFixedWindowRateLimiter,
  getClientIp,
} from "../../lib/rate-limit";

type ApiResponse =
  | { ok: true; eventId?: string }
  | { ok: false; error: "invalid" | "rate_limited" | "delivery_failed" };

const ipRateLimiter = new InMemoryFixedWindowRateLimiter(8, 60_000);

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

  const body = (req.body ?? {}) as {
    name?: unknown;
    company?: unknown;
    intent?: unknown;
    custom?: unknown;
    contact?: unknown;
    sourceUrl?: unknown;
    oppref?: unknown;
    website?: unknown;
  };

  if (typeof body.website === "string" && body.website.trim()) {
    return res.status(200).json({ ok: true });
  }

  const lead = parseLandingLead(body);
  const sourceUrl = landingSourceUrl(body.sourceUrl);
  if (!lead || !sourceUrl) {
    return res.status(400).json({ ok: false, error: "invalid" });
  }

  const oppref =
    cleanOpaqueRef(readCookie(req, "__oppref")) ?? cleanOpaqueRef(body.oppref);
  const obref = cleanOpaqueRef(readCookie(req, "__obref"));
  const message = landingLeadMessage(lead, sourceUrl, oppref);

  try {
    await deliverNotificationEmail({
      to: getNotificationRecipient(),
      from: buildNotificationFromAddress(),
      replyTo: message.replyTo || CONTACT.email,
      subject: message.subject,
      text: message.text,
    });
  } catch (error) {
    console.error("[landing-lead] Email delivery failed.", error);
    return res.status(502).json({ ok: false, error: "delivery_failed" });
  }

  const eventId = randomUUID();
  const apiKey = process.env[OAI_CONVERSIONS_KEY_ENV]?.trim();
  if (apiKey) {
    try {
      const userAgentHeader = req.headers["user-agent"];
      const delivered = await sendLeadCreatedEvent(
        {
          id: eventId,
          timestampMs: Date.now(),
          sourceUrl,
          oppref,
          obref,
          userAgent: cleanOpaqueRef(
            Array.isArray(userAgentHeader) ? userAgentHeader[0] : userAgentHeader,
            512,
          ),
        },
        apiKey,
      );
      if (!delivered) {
        console.error("[landing-lead] OpenAI conversions API rejected the event.");
      }
    } catch (error) {
      console.error("[landing-lead] OpenAI conversions API request failed.", error);
    }
  } else {
    console.error(`[landing-lead] ${OAI_CONVERSIONS_KEY_ENV} is not set.`);
  }

  return res.status(200).json({ ok: true, eventId });
}
