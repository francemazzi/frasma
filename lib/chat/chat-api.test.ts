import { describe, expect, it, vi } from "vitest";
import type { NextApiRequest, NextApiResponse } from "next";
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
});
