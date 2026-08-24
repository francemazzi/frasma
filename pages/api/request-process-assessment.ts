import type { NextApiRequest, NextApiResponse } from "next";
import { inferLeadSource, submitProjectBrief } from "../../lib/leads/submit";
import { ProcessAssessmentSchema } from "../../lib/processAssessment";
import {
  InMemoryFixedWindowRateLimiter,
  getClientIp,
} from "../../lib/rate-limit";

type ApiResponse =
  | { ok: true }
  | { ok: false; error: "invalid" | "rate_limited" | "delivery_failed" };

const ipRateLimiter = new InMemoryFixedWindowRateLimiter(3, 60_000);
const emailRateLimiter = new InMemoryFixedWindowRateLimiter(2, 300_000);
const disposableDomainFragments = [
  "tempmail",
  "10minutemail",
  "guerrillamail",
  "mailinator",
];

function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return disposableDomainFragments.some((fragment) => domain.includes(fragment));
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

  const parsed = ProcessAssessmentSchema.safeParse(req.body);
  if (!parsed.success || isDisposableEmail(parsed.data.clientEmail)) {
    return res.status(400).json({ ok: false, error: "invalid" });
  }

  if (!emailRateLimiter.allow(parsed.data.clientEmail.toLowerCase())) {
    return res.status(429).json({ ok: false, error: "rate_limited" });
  }

  try {
    await submitProjectBrief(
      parsed.data,
      inferLeadSource(parsed.data.conversationId),
    );
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[request-process-assessment] Email delivery failed.", error);
    return res.status(500).json({ ok: false, error: "delivery_failed" });
  }
}
