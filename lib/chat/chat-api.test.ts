import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextApiRequest, NextApiResponse } from "next";

vi.mock("../../lib/chat/persistence", () => ({
  appendMessage: vi.fn(async () => undefined),
  resolveConversationId: vi.fn(async () => "550e8400-e29b-41d4-a716-446655440000"),
}));

vi.mock("@langchain/langgraph/prebuilt", () => ({
  createReactAgent: vi.fn(() => ({
    invoke: vi.fn(() => new Promise(() => {})),
  })),
}));

import handler from "../../pages/api/chat";

function createResponse() {
  const state: { status?: number; body?: unknown; headers: Record<string, string> } = {
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

describe("chat API validation", () => {
  beforeEach(() => {
    delete process.env.OPENAI_API_KEY;
    vi.useRealTimers();
  });

  it("rejects unsupported methods", async () => {
    const { response, state } = createResponse();
    await handler(request("GET", null, "203.0.113.10"), response);
    expect(state.status).toBe(405);
  });

  it("requires at least one message", async () => {
    const { response, state } = createResponse();
    await handler(request("POST", { messages: [] }, "203.0.113.11"), response);
    expect(state.status).toBe(400);
    expect(state.body).toEqual({ error: "Messages are required." });
  });

  it("rejects oversized messages before invoking the model", async () => {
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        {
          messages: [{ role: "user", content: "x".repeat(2_001) }],
          lang: "it",
          timezone: "Europe/Rome",
          pagePath: "/",
        },
        "203.0.113.12",
      ),
      response,
    );
    expect(state.status).toBe(400);
    expect(state.body).toEqual({ error: "Message too long." });
  });

  it("returns 500 when OpenAI is not configured", async () => {
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        {
          messages: [{ role: "user", content: "Ciao" }],
          lang: "it",
          timezone: "Europe/Rome",
          pagePath: "/",
        },
        "203.0.113.13",
      ),
      response,
    );
    expect(state.status).toBe(500);
    expect(state.body).toEqual({ error: "OpenAI API key not configured." });
  });

  it("returns timeout fallback forms when the agent invoke times out", async () => {
    vi.useFakeTimers();
    process.env.OPENAI_API_KEY = "test-key";

    const { response, state } = createResponse();
    const handlerPromise = handler(
      request(
        "POST",
        {
          messages: [
            {
              role: "user",
              content:
                "Vorrei automatizzare i DDT. Email ada@example.com",
            },
          ],
          lang: "it",
          timezone: "Europe/Rome",
          pagePath: "/",
        },
        "203.0.113.20",
      ),
      response,
    );

    await vi.advanceTimersByTimeAsync(120_000);
    await handlerPromise;

    expect(state.status).toBe(200);
    expect(state.body).toMatchObject({ code: "TIMEOUT" });
    expect((state.body as { response?: string }).response).toContain("EMAIL_FORM");
    expect((state.body as { response?: string }).response).toContain("MEETING_FORM");
  });
});
