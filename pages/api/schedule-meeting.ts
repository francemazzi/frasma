import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type ApiError = { ok: false; error: string };
type ApiSuccess = { ok: true };
type ApiResponse = ApiError | ApiSuccess;

type MeetingSchedulePayload = {
  date: string;
  time: string;
  email: string;
  description?: string;
  timezone?: string;
};

class MeetingScheduleRequest {
  public constructor(
    private readonly _date: string,
    private readonly _time: string,
    private readonly _email: string,
    private readonly _description: string,
    private readonly _timezone: string
  ) {}

  public get date(): string {
    return this._date;
  }

  public get time(): string {
    return this._time;
  }

  public get email(): string {
    return this._email;
  }

  public get description(): string {
    return this._description;
  }

  public get timezone(): string {
    return this._timezone;
  }
}

class MeetingScheduleRequestParser {
  private readonly _emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private readonly _dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
  private readonly _timeRegex = /^\d{2}:\d{2}$/; // HH:mm

  public parse(body: unknown): MeetingScheduleRequest {
    const payload = body as Partial<MeetingSchedulePayload> | null;
    if (!payload || typeof payload !== "object") {
      throw new Error("Invalid request body.");
    }

    const date = String(payload.date ?? "").trim();
    const time = String(payload.time ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const description = String(payload.description ?? "").trim();
    const timezone = String(payload.timezone ?? "").trim() || "Unknown";

    if (!this._dateRegex.test(date)) {
      throw new Error("Invalid date.");
    }

    if (!this._timeRegex.test(time)) {
      throw new Error("Invalid time.");
    }

    if (!this._emailRegex.test(email)) {
      throw new Error("Invalid email.");
    }

    if (description.length > 2000) {
      throw new Error("Description too long.");
    }

    return new MeetingScheduleRequest(date, time, email, description, timezone);
  }
}

interface IRateLimiter {
  allow(key: string): boolean;
}

class InMemoryFixedWindowRateLimiter implements IRateLimiter {
  private readonly _hitsByKey: Map<string, { windowStartMs: number; hits: number }> =
    new Map();

  public constructor(
    private readonly _maxHits: number,
    private readonly _windowMs: number
  ) {}

  public allow(key: string): boolean {
    const now = Date.now();
    const entry = this._hitsByKey.get(key);

    if (!entry) {
      this._hitsByKey.set(key, { windowStartMs: now, hits: 1 });
      return true;
    }

    if (now - entry.windowStartMs > this._windowMs) {
      this._hitsByKey.set(key, { windowStartMs: now, hits: 1 });
      return true;
    }

    if (entry.hits >= this._maxHits) {
      return false;
    }

    entry.hits += 1;
    return true;
  }
}

interface IEmailSender {
  sendMeetingNotification(request: MeetingScheduleRequest): Promise<void>;
}

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  fromName: string;
  to: string;
};

class SmtpConfigReader {
  public read(): SmtpConfig | null {
    const host = process.env.SMTP_HOST?.trim();
    const portRaw = process.env.SMTP_PORT?.trim();
    const user = process.env.SMTP_USER?.trim();
    const pass = process.env.SMTP_PASS?.trim();

    if (!host || !portRaw || !user || !pass) return null;

    const port = Number(portRaw);
    if (!Number.isFinite(port) || port <= 0) return null;

    const secure =
      (process.env.SMTP_SECURE?.trim() || "true").toLowerCase() === "true";
    const to =
      (process.env.MEETING_NOTIFICATION_EMAIL?.trim() ||
        "francemazzi@gmail.com") as string;
    const from = (process.env.MEETING_FROM_EMAIL?.trim() ||
      user) as string;
    const fromName = (process.env.MEETING_FROM_NAME?.trim() ||
      "Frasma") as string;

    return { host, port, secure, user, pass, from, fromName, to };
  }
}

class NodemailerSmtpEmailSender implements IEmailSender {
  public constructor(private readonly _config: SmtpConfig) {}

  public async sendMeetingNotification(
    request: MeetingScheduleRequest
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: this._config.host,
      port: this._config.port,
      secure: this._config.secure,
      auth: { user: this._config.user, pass: this._config.pass },
    });

    const subject = `New meeting request: ${request.date} ${request.time} (${request.timezone})`;
    const text = [
      "New meeting request received.",
      "",
      `Date: ${request.date}`,
      `Time: ${request.time}`,
      `Timezone: ${request.timezone}`,
      `Requester email: ${request.email}`,
      "",
      "Description:",
      request.description || "(empty)",
    ].join("\n");

    const fromAddress = this._config.fromName
      ? `${this._config.fromName} <${this._config.from}>`
      : this._config.from;

    const info = await transporter.sendMail({
      from: fromAddress,
      to: this._config.to,
      subject,
      text,
      replyTo: request.email,
    });

    if (!info || !info.messageId) {
      throw new Error("SMTP send failed.");
    }
  }
}

class ResendEmailSender implements IEmailSender {
  private readonly _endpoint = "https://api.resend.com/emails";

  public constructor(
    private readonly _apiKey: string,
    private readonly _toEmail: string,
    private readonly _fromEmail: string
  ) {}

  public async sendMeetingNotification(
    request: MeetingScheduleRequest
  ): Promise<void> {
    const subject = `New meeting request: ${request.date} ${request.time} (${request.timezone})`;
    const text = [
      "New meeting request received.",
      "",
      `Date: ${request.date}`,
      `Time: ${request.time}`,
      `Timezone: ${request.timezone}`,
      `Requester email: ${request.email}`,
      "",
      "Description:",
      request.description || "(empty)",
    ].join("\n");

    const res = await fetch(this._endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this._apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: this._fromEmail,
        to: [this._toEmail],
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const details = await res.text().catch(() => "");
      throw new Error(
        `Email provider error (${res.status}). ${details || "No details."}`
      );
    }
  }
}

class EmailSenderFactory {
  public static fromEnv(): IEmailSender {
    const smtpReader = new SmtpConfigReader();
    const smtpConfig = smtpReader.read();
    if (smtpConfig) {
      return new NodemailerSmtpEmailSender(smtpConfig);
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const toEmail = (process.env.MEETING_NOTIFICATION_EMAIL?.trim() ||
      "francemazzi@gmail.com") as string;
    const fromEmail = (process.env.MEETING_FROM_EMAIL?.trim() ||
      "Frasma <onboarding@resend.dev>") as string;

    if (!apiKey) {
      throw new Error(
        "Email service not configured. Set SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS (SMTP) or RESEND_API_KEY (Resend)."
      );
    }

    return new ResendEmailSender(apiKey, toEmail, fromEmail);
  }
}

const rateLimiter: IRateLimiter = new InMemoryFixedWindowRateLimiter(5, 60_000);
const parser = new MeetingScheduleRequestParser();

class HttpResponder {
  public ok(res: NextApiResponse<ApiResponse>): void {
    res.status(200).json({ ok: true });
  }

  public badRequest(res: NextApiResponse<ApiResponse>, message: string): void {
    res.status(400).json({ ok: false, error: message });
  }

  public tooMany(res: NextApiResponse<ApiResponse>): void {
    res.status(429).json({ ok: false, error: "Too many requests. Try again later." });
  }

  public methodNotAllowed(res: NextApiResponse<ApiResponse>): void {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  public serverError(res: NextApiResponse<ApiResponse>, message: string): void {
    res.status(500).json({ ok: false, error: message });
  }
}

const responder = new HttpResponder();

function getClientKey(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : typeof forwarded === "string"
      ? forwarded.split(",")[0]?.trim()
      : req.socket.remoteAddress || "unknown";

  return ip || "unknown";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return responder.methodNotAllowed(res);
  }

  const key = getClientKey(req);
  if (!rateLimiter.allow(key)) {
    return responder.tooMany(res);
  }

  let request: MeetingScheduleRequest;
  try {
    request = parser.parse(req.body);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid request.";
    return responder.badRequest(res, message);
  }

  try {
    const sender = EmailSenderFactory.fromEnv();
    await sender.sendMeetingNotification(request);
    return responder.ok(res);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to send email.";
    return responder.serverError(res, message);
  }
}


