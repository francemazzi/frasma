import { z } from "zod";

export const MAX_AUDIO_BYTES = 4 * 1024 * 1024;

export const ALLOWED_AUDIO_MIME_TYPES = [
  "audio/webm",
  "audio/mp4",
  "audio/ogg",
  "audio/wav",
  "audio/mpeg",
] as const;

export type AllowedAudioMimeType = (typeof ALLOWED_AUDIO_MIME_TYPES)[number];

export const TranscribeRequestSchema = z
  .object({
    audioBase64: z.string().min(1).max(Math.ceil((MAX_AUDIO_BYTES * 4) / 3) + 64),
    mimeType: z.enum(ALLOWED_AUDIO_MIME_TYPES),
    lang: z.enum(["it", "en"]).default("it"),
  })
  .strict();

export type TranscribeRequest = z.infer<typeof TranscribeRequestSchema>;

export function extensionForMimeType(mimeType: AllowedAudioMimeType): string {
  switch (mimeType) {
    case "audio/webm":
      return "webm";
    case "audio/mp4":
      return "mp4";
    case "audio/ogg":
      return "ogg";
    case "audio/wav":
      return "wav";
    case "audio/mpeg":
      return "mp3";
    default:
      return "webm";
  }
}

export function decodeAudioBase64(audioBase64: string): Buffer | null {
  try {
    const buffer = Buffer.from(audioBase64, "base64");
    if (buffer.byteLength === 0 || buffer.byteLength > MAX_AUDIO_BYTES) {
      return null;
    }
    return buffer;
  } catch {
    return null;
  }
}
