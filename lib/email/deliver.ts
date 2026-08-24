import nodemailer from "nodemailer";

export type NotificationEmailMessage = {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  text: string;
};

export function getNotificationRecipient(): string {
  return (
    process.env.MEETING_NOTIFICATION_EMAIL?.trim() || "francemazzi@gmail.com"
  );
}

export function formatFromAddress(email: string, name: string): string {
  if (!name || email.includes("<")) return email;
  return `${name.replace(/[\r\n]+/g, " ").trim()} <${email}>`;
}

export function buildNotificationFromAddress(): string {
  const fromEmail =
    process.env.MEETING_FROM_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "onboarding@resend.dev";
  const fromName = process.env.MEETING_FROM_NAME?.trim() || "Frasma";
  return formatFromAddress(fromEmail, fromName);
}

async function sendWithSmtp(message: NotificationEmailMessage): Promise<boolean> {
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

async function sendWithResend(message: NotificationEmailMessage): Promise<void> {
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

export async function deliverNotificationEmail(
  message: NotificationEmailMessage,
): Promise<void> {
  const sentWithSmtp = await sendWithSmtp(message);
  if (!sentWithSmtp) await sendWithResend(message);
}
