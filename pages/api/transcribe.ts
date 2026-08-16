import type { NextApiRequest, NextApiResponse } from "next";
import {
  decodeAudioBase64,
  extensionForMimeType,
  TranscribeRequestSchema,
  type AllowedAudioMimeType,
} from "../../lib/transcribe";
import {
  InMemoryFixedWindowRateLimiter,
  getClientIp,
} from "../../lib/rate-limit";

type ApiResponse =
  | { text: string }
  | { error: string };

const ipRateLimiter = new InMemoryFixedWindowRateLimiter(8, 60_000);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "6mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const ip = getClientIp(req);
  if (!ipRateLimiter.allow(ip)) {
    return res.status(429).json({ error: "rate_limited" });
  }

  const parsed = TranscribeRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "invalid" });
  }

  const { audioBase64, mimeType, lang } = parsed.data;
  const audioBuffer = decodeAudioBase64(audioBase64);
  if (!audioBuffer) {
    return res.status(400).json({ error: "invalid_audio" });
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return res.status(500).json({ error: "OpenAI API key not configured." });
  }

  const model = process.env.OPENAI_WHISPER_MODEL?.trim() || "whisper-1";
  const extension = extensionForMimeType(mimeType as AllowedAudioMimeType);
  const form = new FormData();
  form.append(
    "file",
    new Blob([new Uint8Array(audioBuffer)], { type: mimeType }),
    `dictation.${extension}`,
  );
  form.append("model", model);
  form.append("language", lang);
  form.append("response_format", "json");

  try {
    const whisperResponse = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: form,
      },
    );

    const payload = (await whisperResponse.json().catch(() => null)) as
      | { text?: string; error?: { message?: string } }
      | null;

    if (!whisperResponse.ok) {
      return res.status(502).json({
        error: payload?.error?.message || "transcription_failed",
      });
    }

    const text = payload?.text?.trim() ?? "";
    if (!text) {
      return res.status(502).json({ error: "empty_transcript" });
    }

    return res.status(200).json({ text });
  } catch {
    return res.status(502).json({ error: "transcription_failed" });
  }
}
