import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { buildProcessAssessmentEmail } from "../../lib/email/processAssessment";
import {
  ProcessAssessmentSchema,
  type ProcessAssessment,
} from "../../lib/processAssessment";
import {
  InMemoryFixedWindowRateLimiter,
  getClientIp,
} from "../../lib/rate-limit";

type ApiResponse =
  | { ok: true }
  | { ok: false; error: "invalid" | "rate_limited" | "delivery_failed" };

type EmailMessage = {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  text: string;
};

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

function formatFromAddress(email: string, name: string): string {
  if (!name || email.includes("<")) return email;
  return `${name.replace(/[\r\n]+/g, " ").trim()} <${email}>`;
}

function getRecipient(): string {
  return (
    process.env.MEETING_NOTIFICATION_EMAIL?.trim() ||
    "francemazzi@gmail.com"
  );
}

async function sendWithSmtp(message: EmailMessage): Promise<boolean> {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !portRaw || !user || !pass) return false;

  const port = Number(portRaw);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("Invalid SMTP configuration.");
  }

  const secureValue = process.env.SMTP_SECURE?.trim().toLowerCase();
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: secureValue ? secureValue === "true" : port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail(message);
  return true;
}

async function sendWithResend(message: EmailMessage): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) throw new Error("Email service is not configured.");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: message.from,
      to: [message.to],
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend request failed with status ${response.status}.`);
  }
}

async function sendAssessment(input: ProcessAssessment): Promise<void> {
  const email = buildProcessAssessmentEmail(input);
  const fromEmail =
    process.env.MEETING_FROM_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "onboarding@resend.dev";
  const fromName = process.env.MEETING_FROM_NAME?.trim() || "Frasma";
  const message: EmailMessage = {
    to: getRecipient(),
    from: formatFromAddress(fromEmail, fromName),
    replyTo: input.clientEmail,
    subject: email.subject,
    text: email.text,
  };

  const sentWithSmtp = await sendWithSmtp(message);
  if (!sentWithSmtp) await sendWithResend(message);
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
    await sendAssessment(parsed.data);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[request-process-assessment] Email delivery failed.", error);
    return res.status(500).json({ ok: false, error: "delivery_failed" });
  }
}
