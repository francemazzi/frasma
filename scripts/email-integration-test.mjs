import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(resolve(process.cwd(), ".env.local"));
loadEnvFile(resolve(process.cwd(), ".env"));

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }
  return value;
}

const host = required("SMTP_HOST");
const port = Number(required("SMTP_PORT"));
const user = required("SMTP_USER");
const pass = required("SMTP_PASS");
const fromEmail = process.env.MEETING_FROM_EMAIL?.trim() || user;
const fromName = process.env.MEETING_FROM_NAME?.trim() || "Frasma";
const notifyTo = process.env.MEETING_NOTIFICATION_EMAIL?.trim() || user;
const verifyTo = process.env.EMAIL_INTEGRATION_VERIFY_TO?.trim() ||
  "francemazzi@gmail.com";

if (!Number.isInteger(port) || port <= 0) {
  throw new Error("Invalid SMTP_PORT.");
}

const token = `frasma-smtp-${randomUUID()}`;
const from = `${fromName} <${fromEmail}>`;
const recipients = [...new Set([notifyTo, verifyTo])];
const secureValue = process.env.SMTP_SECURE?.trim().toLowerCase();

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: secureValue ? secureValue === "true" : port === 465,
  auth: { user, pass },
});

const started = Date.now();

try {
  await transporter.verify();
  const info = await transporter.sendMail({
    from,
    to: recipients,
    replyTo: fromEmail,
    subject: `[Frasma] SMTP integration test ${token}`,
    text: [
      "Integration test from the Frasma site SMTP path.",
      "",
      `Token: ${token}`,
      `SMTP user: ${user}`,
      `From: ${from}`,
      `To: ${recipients.join(", ")}`,
      "",
      "If you received this, smtp.gmail.com accepted mail as frasma@frasma.org.",
    ].join("\n"),
  });

  console.log(
    JSON.stringify(
      {
        ok: true,
        latencyMs: Date.now() - started,
        token,
        smtpUser: user,
        from,
        to: recipients,
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
        response: info.response,
      },
      null,
      2,
    ),
  );
} catch (error) {
  console.log(
    JSON.stringify(
      {
        ok: false,
        latencyMs: Date.now() - started,
        token,
        smtpUser: user,
        from,
        to: recipients,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      null,
      2,
    ),
  );
  process.exit(1);
}
