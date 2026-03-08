import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { clientEmail, subject, body } = req.body ?? {};

  if (!clientEmail || !subject || !body) {
    return res.status(400).json({ error: "Missing required fields." });
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
      from: `Bobby AI <${user}>`,
      to,
      replyTo: clientEmail,
      subject,
      text: body,
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("[send-email] Error:", msg);
    return res.status(500).json({ error: msg });
  }
}
