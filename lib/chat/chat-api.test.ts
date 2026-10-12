import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextApiRequest, NextApiResponse } from "next";

vi.mock("../../lib/chat/persistence", () => ({
  appendMessage: vi.fn(async () => undefined),
  requireRegisteredConversation: vi.fn(async (id?: string) =>
    id
      ? {
          conversationId: "550e8400-e29b-41d4-a716-446655440000",
          visitor: {
            name: "Francesco",
            email: "francesco@example.com",
            company: "Test",
            sector: "lamiera",
          },
        }
      : null,
  ),
}));

// Shared by every agent instance the route caches: never resolves by default
// (timeout tests), individual tests queue a resolved value when they need one.
const { agentInvoke } = vi.hoisted(() => ({
  agentInvoke: vi.fn(() => new Promise<unknown>(() => {})),
}));

vi.mock("@langchain/langgraph/prebuilt", () => ({
  createReactAgent: vi.fn(() => ({
    invoke: agentInvoke,
  })),
}));

import handler from "../../pages/api/chat";
import { appendMessage } from "../../lib/chat/persistence";

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

  it("accepts long conversations below the raised message cap", async () => {
    const { response, state } = createResponse();
    const messages = Array.from({ length: 25 }, (_, index) => ({
      role: index % 2 === 0 ? ("user" as const) : ("assistant" as const),
      content: `message ${index}`,
    }));

    await handler(
      request(
        "POST",
        {
          messages,
          lang: "it",
          timezone: "Europe/Rome",
          pagePath: "/",
          conversationId: "550e8400-e29b-41d4-a716-446655440000",
        },
        "203.0.113.14",
      ),
      response,
    );

    expect(state.status).not.toBe(400);
    expect(state.body).not.toEqual({ error: "Too many messages." });
  });

  it("rejects conversations above the raised message cap", async () => {
    const { response, state } = createResponse();
    const messages = Array.from({ length: 61 }, (_, index) => ({
      role: index % 2 === 0 ? ("user" as const) : ("assistant" as const),
      content: `message ${index}`,
    }));

    await handler(
      request(
        "POST",
        {
          messages,
          lang: "it",
          timezone: "Europe/Rome",
          pagePath: "/",
          conversationId: "550e8400-e29b-41d4-a716-446655440000",
        },
        "203.0.113.15",
      ),
      response,
    );

    expect(state.status).toBe(400);
    expect(state.body).toEqual({ error: "Too many messages." });
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
          conversationId: "550e8400-e29b-41d4-a716-446655440000",
        },
        "203.0.113.20",
      ),
      response,
    );

    await vi.advanceTimersByTimeAsync(120_000);
    await handlerPromise;

    expect(state.status).toBe(200);
    expect(state.body).toMatchObject({ code: "TIMEOUT" });
    expect((state.body as { response?: string }).response).toContain(
      "PROJECT_BRIEF_FORM",
    );
    expect((state.body as { response?: string }).response).not.toContain(
      "EMAIL_FORM",
    );
    expect((state.body as { response?: string }).response).not.toContain(
      "MEETING_FORM",
    );
  });

  it("rejects chat without a registered conversation", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    const { requireRegisteredConversation } = await import(
      "../../lib/chat/persistence"
    );
    vi.mocked(requireRegisteredConversation).mockResolvedValueOnce(null);

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
        "203.0.113.21",
      ),
      response,
    );

    expect(state.status).toBe(401);
    expect(state.body).toEqual({ error: "Chat registration required." });
  });
});

describe("chat API persistence of the assistant reply", () => {
  const body = {
    messages: [{ role: "user", content: "Ciao" }],
    lang: "it",
    timezone: "Europe/Rome",
    pagePath: "/",
    conversationId: "550e8400-e29b-41d4-a716-446655440000",
  };

  beforeEach(() => {
    vi.useRealTimers();
    process.env.OPENAI_API_KEY = "test-key";
    vi.mocked(appendMessage).mockReset();
    vi.mocked(appendMessage).mockResolvedValue(undefined);
  });

  it("waits for the reply to be persisted before responding", async () => {
    agentInvoke.mockResolvedValueOnce({ messages: [{ content: "Risposta" }] });
    let finishPersist: (() => void) | undefined;
    vi.mocked(appendMessage)
      .mockResolvedValueOnce(undefined) // the user message
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            finishPersist = resolve;
          }),
      );

    const { response, state } = createResponse();
    const handlerPromise = handler(
      request("POST", body, "203.0.113.30"),
      response,
    );
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(finishPersist).toBeDefined();
    expect(response.json).not.toHaveBeenCalled();

    finishPersist?.();
    await handlerPromise;

    expect(state.status).toBe(200);
    expect(state.body).toMatchObject({
      response: "Risposta",
      conversationId: body.conversationId,
    });
    expect(appendMessage).toHaveBeenNthCalledWith(
      2,
      body.conversationId,
      expect.objectContaining({ role: "assistant", content: "Risposta" }),
    );
  });

  it("still returns the reply when persisting it fails", async () => {
    agentInvoke.mockResolvedValueOnce({ messages: [{ content: "Risposta" }] });
    vi.mocked(appendMessage)
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error("mongo down"));
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    const { response, state } = createResponse();
    await handler(request("POST", body, "203.0.113.31"), response);

    expect(state.status).toBe(200);
    expect(state.body).toMatchObject({ response: "Risposta" });
    expect(consoleError).toHaveBeenCalledWith(
      "[chat] Persistence error after invoke:",
      expect.any(Error),
    );
    consoleError.mockRestore();
  });
});
