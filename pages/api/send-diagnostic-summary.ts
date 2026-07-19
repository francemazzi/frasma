import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import {
  DiagnosticSummarySchema as diagnosticSummarySchema,
  type DiagnosticSummary,
} from "../../lib/chat/diagnostic";
import { buildDiagnosticEmail } from "../../lib/email/diagnostic";
import { logConversionEvent } from "../../lib/chat/persistence";
import { isValidConversationId } from "../../lib/chat/session";
import {
  InMemoryFixedWindowRateLimiter,
  getClientIp,
} from "../../lib/rate-limit";

type ApiResponse =
  | { ok: true }
  | {
      ok: false;
      error: string;
    };

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
  const secure = secureValue ? secureValue === "true" : port === 465;
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
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

async function sendDiagnosticSummary(
  summary: DiagnosticSummary,
): Promise<void> {
  const email = buildDiagnosticEmail(summary);
  const fromEmail =
    process.env.MEETING_FROM_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "onboarding@resend.dev";
  const fromName = process.env.MEETING_FROM_NAME?.trim() || "Frasma";
  const message: EmailMessage = {
    to: getRecipient(),
    from: formatFromAddress(fromEmail, fromName),
    replyTo: summary.clientEmail,
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
    return res
      .status(405)
      .json({ ok: false, error: "Method not allowed." });
  }

  if (!ipRateLimiter.allow(getClientIp(req))) {
    return res
      .status(429)
      .json({ ok: false, error: "Too many requests. Try again later." });
  }

  const body =
    req.body && typeof req.body === "object"
      ? (req.body as Record<string, unknown>)
      : null;
  const rawConversationId = body?.conversationId;
  const conversationId = isValidConversationId(rawConversationId)
    ? rawConversationId
    : undefined;
  const { conversationId: _ignored, ...summaryBody } = body ?? {};

  const parsed = diagnosticSummarySchema.safeParse(summaryBody);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "Invalid request." });
  }

  const summary = parsed.data;
  if (summary.honeypot?.trim()) {
    return res.status(400).json({ ok: false, error: "Invalid request." });
  }

  if (isDisposableEmail(summary.clientEmail)) {
    return res.status(400).json({ ok: false, error: "Invalid email." });
  }

  if (!emailRateLimiter.allow(summary.clientEmail.toLowerCase())) {
    return res
      .status(429)
      .json({ ok: false, error: "Too many requests. Try again later." });
  }

  try {
    await sendDiagnosticSummary(summary);

    void logConversionEvent(
      conversationId,
      "diagnostic_sent",
      {
        sector: summary.sector,
        process: summary.process,
        needCategories: summary.needCategories,
      },
      {
        contactEmail: summary.clientEmail,
        contactName: summary.clientName,
      },
    ).catch((error) => {
      console.error(
        "[send-diagnostic-summary] Failed to log conversion event.",
        error,
      );
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[send-diagnostic-summary] Email delivery failed.", error);
    return res
      .status(500)
      .json({ ok: false, error: "Unable to send diagnostic summary." });
  }
}
