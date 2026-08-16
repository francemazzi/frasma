import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  decodeAudioBase64,
  extensionForMimeType,
  MAX_AUDIO_BYTES,
  TranscribeRequestSchema,
} from "./transcribe";

vi.mock("next/server", () => ({}));

import handler from "../pages/api/transcribe";

function createResponse() {
  const state: {
    status?: number;
    body?: unknown;
    headers: Record<string, string>;
  } = {
    headers: {},
  };
  const response = {
    setHeader: vi.fn((name: string, value: string) => {
      state.headers[name] = value;
    }),
    status: vi.fn((status: number) => {
      state.status = status;
      return response;
    }),
    json: vi.fn((body: unknown) => {
      state.body = body;
      return response;
    }),
  } as unknown as NextApiResponse;
  return { response, state };
}

function request(method: string, body: unknown, ip: string): NextApiRequest {
  return {
    method,
    body,
    headers: { "x-forwarded-for": ip },
    socket: { remoteAddress: ip },
  } as unknown as NextApiRequest;
}

describe("transcribe helpers", () => {
  it("maps mime types to file extensions", () => {
    expect(extensionForMimeType("audio/webm")).toBe("webm");
    expect(extensionForMimeType("audio/mpeg")).toBe("mp3");
  });

  it("rejects empty or oversized base64 payloads", () => {
    expect(decodeAudioBase64("")).toBeNull();
    const oversized = Buffer.alloc(MAX_AUDIO_BYTES + 1).toString("base64");
    expect(decodeAudioBase64(oversized)).toBeNull();
  });

  it("accepts a valid request payload", () => {
    const audioBase64 = Buffer.from("hello").toString("base64");
    const parsed = TranscribeRequestSchema.safeParse({
      audioBase64,
      mimeType: "audio/webm",
      lang: "it",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects unsupported mime types", () => {
    const parsed = TranscribeRequestSchema.safeParse({
      audioBase64: Buffer.from("hello").toString("base64"),
      mimeType: "audio/flac",
      lang: "it",
    });
    expect(parsed.success).toBe(false);
  });
});

describe("transcribe API", () => {
  beforeEach(() => {
    delete process.env.OPENAI_API_KEY;
    vi.unstubAllGlobals();
  });

  it("rejects unsupported methods", async () => {
    const { response, state } = createResponse();
    await handler(request("GET", null, "203.0.113.40"), response);
    expect(state.status).toBe(405);
  });

  it("rejects invalid bodies", async () => {
    const { response, state } = createResponse();
    await handler(
      request("POST", { mimeType: "audio/webm" }, "203.0.113.41"),
      response,
    );
    expect(state.status).toBe(400);
    expect(state.body).toEqual({ error: "invalid" });
  });

  it("returns 500 when OpenAI is not configured", async () => {
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        {
          audioBase64: Buffer.from("hello").toString("base64"),
          mimeType: "audio/webm",
          lang: "it",
        },
        "203.0.113.42",
      ),
      response,
    );
    expect(state.status).toBe(500);
    expect(state.body).toEqual({ error: "OpenAI API key not configured." });
  });

  it("rate limits repeated requests from the same IP", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ text: "ciao" }),
      })),
    );

    const ip = "203.0.113.43";
    for (let i = 0; i < 8; i += 1) {
      const { response, state } = createResponse();
      await handler(
        request(
          "POST",
          {
            audioBase64: Buffer.from(`audio-${i}`).toString("base64"),
            mimeType: "audio/webm",
            lang: "it",
          },
          ip,
        ),
        response,
      );
      expect(state.status).toBe(200);
    }

    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        {
          audioBase64: Buffer.from("audio-final").toString("base64"),
          mimeType: "audio/webm",
          lang: "it",
        },
        ip,
      ),
      response,
    );
    expect(state.status).toBe(429);
    expect(state.body).toEqual({ error: "rate_limited" });
  });
});
