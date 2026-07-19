import type { NextApiRequest, NextApiResponse } from "next";
import {
  InMemoryFixedWindowRateLimiter,
  getClientIp,
} from "../../lib/rate-limit";
import { z } from "zod";
import { logConversionEvent } from "../../lib/chat/persistence";
import { isValidConversationId } from "../../lib/chat/session";

const ipRateLimiter = new InMemoryFixedWindowRateLimiter(3, 60_000); // 3 per minute per IP
const emailRateLimiter = new InMemoryFixedWindowRateLimiter(2, 300_000); // 2 per 5 minutes per email
const emailRequestSchema = z
  .object({
    clientEmail: z.string().trim().email().max(254),
    subject: z.string().trim().min(1).max(200),
    body: z.string().trim().min(1).max(5000),
    honeypot: z.string().max(0).optional(),
    conversationId: z.string().optional(),
  })
  .strict();
const disposableDomainFragments = [
  "tempmail",
  "10minutemail",
  "guerrillamail",
  "mailinator",
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  // Rate limiting by IP
  const ipKey = getClientIp(req);
  if (!ipRateLimiter.allow(ipKey)) {
    return res
      .status(429)
      .json({ error: "Too many requests. Try again later." });
  }

  const parsed = emailRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request." });
  }
  const { clientEmail, subject, body } = parsed.data;
  const emailDomain = clientEmail.split("@")[1]?.toLowerCase() || "";
  if (disposableDomainFragments.some((domain) => emailDomain.includes(domain))) {
    return res.status(400).json({ error: "Invalid email." });
  }

  // Rate limiting by email
  const emailKey = clientEmail.toLowerCase();
  if (!emailRateLimiter.allow(emailKey)) {
    return res
      .status(429)
      .json({ error: "Too many requests. Try again later." });
  }

  const nodemailer = await import("nodemailer");

  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT?.trim() || "465");
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const to =
    process.env.MEETING_NOTIFICATION_EMAIL?.trim() || "francemazzi@gmail.com";

  if (!host || !user || !pass) {
    return res.status(500).json({ error: "Email service not configured." });
  }

  const transporter = nodemailer.default.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `Frasma AI <${user}>`,
      to,
      replyTo: clientEmail,
      subject,
      text: body,
    });

    const conversationId = isValidConversationId(parsed.data.conversationId)
      ? parsed.data.conversationId
      : undefined;
    void logConversionEvent(
      conversationId,
      "email_sent",
      { subjectLength: subject.length },
      { contactEmail: clientEmail },
    ).catch((error) => {
      console.error("[send-email] Failed to log conversion event.", error);
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("[send-email] Error:", msg);
    return res.status(500).json({ error: "Unable to send email." });
  }
}
