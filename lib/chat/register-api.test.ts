import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextApiRequest, NextApiResponse } from "next";

const { registerChatSession, isPersistenceEnabled } = vi.hoisted(() => ({
  registerChatSession: vi.fn(),
  isPersistenceEnabled: vi.fn(() => true),
}));

vi.mock("../../lib/chat/visitors", async () => {
  const actual = await vi.importActual<typeof import("../../lib/chat/visitors")>(
    "../../lib/chat/visitors",
  );
  return {
    ...actual,
    registerChatSession,
  };
});

vi.mock("../../lib/chat/persistence", async () => {
  const actual = await vi.importActual<
    typeof import("../../lib/chat/persistence")
  >("../../lib/chat/persistence");
  return {
    ...actual,
    isPersistenceEnabled,
  };
});

import handler from "../../pages/api/chat/register";

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

describe("chat register API", () => {
  beforeEach(() => {
    registerChatSession.mockReset();
    isPersistenceEnabled.mockReturnValue(true);
  });

  it("rejects unsupported methods", async () => {
    const { response, state } = createResponse();
    await handler(request("GET", null, "203.0.113.30"), response);
    expect(state.status).toBe(405);
  });

  it("returns 503 when persistence is disabled", async () => {
    isPersistenceEnabled.mockReturnValue(false);
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        {
          name: "Ada",
          email: "ada@example.com",
          company: "Analytical Engines",
          sector: "Manufacturing",
        },
        "203.0.113.31",
      ),
      response,
    );
    expect(state.status).toBe(503);
  });

  it("rejects invalid payloads", async () => {
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        {
          name: "",
          email: "bad",
          company: "X",
          sector: "Y",
        },
        "203.0.113.32",
      ),
      response,
    );
    expect(state.status).toBe(400);
  });

  it("silently accepts honeypot submissions", async () => {
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        {
          name: "Ada",
          email: "ada@example.com",
          company: "Analytical Engines",
          sector: "Manufacturing",
          honeypot: "http://spam.example",
        },
        "203.0.113.33",
      ),
      response,
    );
    expect(registerChatSession).not.toHaveBeenCalled();
    expect(state.status).toBe(200);
    expect(state.body).toMatchObject({ returning: false });
  });

  it("returns returning visitor with messages", async () => {
    registerChatSession.mockResolvedValue({
      conversationId: "550e8400-e29b-41d4-a716-446655440000",
      messages: [{ role: "assistant", content: "Welcome back" }],
      visitor: {
        name: "Ada",
        email: "ada@example.com",
        company: "Analytical Engines",
        sector: "Manufacturing",
      },
      returning: true,
      createdVisitor: false,
    });

    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        {
          name: "Ada",
          email: "ada@example.com",
          company: "Analytical Engines",
          sector: "Manufacturing",
          lang: "it",
        },
        "203.0.113.34",
      ),
      response,
    );

    expect(state.status).toBe(200);
    expect(state.body).toMatchObject({
      conversationId: "550e8400-e29b-41d4-a716-446655440000",
      returning: true,
      messages: [{ role: "assistant", content: "Welcome back" }],
    });
  });
});
