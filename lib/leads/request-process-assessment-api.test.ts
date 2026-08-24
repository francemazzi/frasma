import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextApiRequest, NextApiResponse } from "next";

const { submitProjectBrief, inferLeadSource } = vi.hoisted(() => ({
  submitProjectBrief: vi.fn(async () => ({ leadId: undefined })),
  inferLeadSource: vi.fn((conversationId?: string) =>
    conversationId === "550e8400-e29b-41d4-a716-446655440000"
      ? "chat"
      : "form",
  ),
}));

vi.mock("../../lib/leads/submit", () => ({
  submitProjectBrief,
  inferLeadSource,
}));

import handler from "../../pages/api/request-process-assessment";

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

const validBrief = {
  name: "Ada Lovelace",
  clientEmail: "ada@example.com",
  company: "Analytical Engines",
  role: "Operations",
  process:
    "Orders arrive as PDF attachments and are copied manually into the ERP.",
  systems: "Outlook, ERP",
  volume: "80 per week",
};

describe("request process assessment API", () => {
  beforeEach(() => {
    submitProjectBrief.mockReset();
    submitProjectBrief.mockResolvedValue({ leadId: undefined });
    inferLeadSource.mockClear();
  });

  it("rejects unsupported methods", async () => {
    const { response, state } = createResponse();
    await handler(request("GET", null, "198.51.100.1"), response);
    expect(state.status).toBe(405);
    expect(state.headers.Allow).toBe("POST");
    expect(state.body).toEqual({ ok: false, error: "invalid" });
    expect(submitProjectBrief).not.toHaveBeenCalled();
  });

  it("rejects a missing name", async () => {
    const { name: _name, ...withoutName } = validBrief;
    const { response, state } = createResponse();
    await handler(request("POST", withoutName, "198.51.100.2"), response);
    expect(state.status).toBe(400);
    expect(submitProjectBrief).not.toHaveBeenCalled();
  });

  it("rejects an invalid email", async () => {
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        { ...validBrief, clientEmail: "not-an-email" },
        "198.51.100.3",
      ),
      response,
    );
    expect(state.status).toBe(400);
    expect(submitProjectBrief).not.toHaveBeenCalled();
  });

  it("rejects a process shorter than 20 characters", async () => {
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        { ...validBrief, process: "Too short" },
        "198.51.100.4",
      ),
      response,
    );
    expect(state.status).toBe(400);
    expect(submitProjectBrief).not.toHaveBeenCalled();
  });

  it("rejects disposable email domains", async () => {
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        { ...validBrief, clientEmail: "bot@mailinator.com" },
        "198.51.100.5",
      ),
      response,
    );
    expect(state.status).toBe(400);
    expect(submitProjectBrief).not.toHaveBeenCalled();
  });

  it("rejects a filled honeypot", async () => {
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        { ...validBrief, honeypot: "http://spam.example" },
        "198.51.100.6",
      ),
      response,
    );
    expect(state.status).toBe(400);
    expect(submitProjectBrief).not.toHaveBeenCalled();
  });

  it("rejects unknown fields", async () => {
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        { ...validBrief, budget: "10k" },
        "198.51.100.7",
      ),
      response,
    );
    expect(state.status).toBe(400);
    expect(submitProjectBrief).not.toHaveBeenCalled();
  });

  it("accepts a landing form brief as source form", async () => {
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        { ...validBrief, lang: "it", honeypot: "" },
        "198.51.100.8",
      ),
      response,
    );

    expect(state.status).toBe(200);
    expect(state.body).toEqual({ ok: true });
    expect(inferLeadSource).toHaveBeenCalledWith(undefined);
    expect(submitProjectBrief).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Ada Lovelace",
        clientEmail: "ada@example.com",
        process: validBrief.process,
        lang: "it",
      }),
      "form",
    );
  });

  it("accepts a chat brief with conversationId as source chat", async () => {
    const conversationId = "550e8400-e29b-41d4-a716-446655440000";
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        {
          ...validBrief,
          clientEmail: "ada.chat@example.com",
          conversationId,
          lang: "en",
        },
        "198.51.100.9",
      ),
      response,
    );

    expect(state.status).toBe(200);
    expect(inferLeadSource).toHaveBeenCalledWith(conversationId);
    expect(submitProjectBrief).toHaveBeenCalledWith(
      expect.objectContaining({
        conversationId,
        lang: "en",
        clientEmail: "ada.chat@example.com",
      }),
      "chat",
    );
  });

  it("normalizes empty optional fields before submit", async () => {
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        {
          name: "Ada",
          clientEmail: "ada.empty@example.com",
          company: "",
          role: " ",
          process: validBrief.process,
          systems: "",
          volume: "",
        },
        "198.51.100.10",
      ),
      response,
    );

    expect(state.status).toBe(200);
    expect(submitProjectBrief).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Ada",
        company: undefined,
        role: undefined,
        systems: undefined,
        volume: undefined,
      }),
      "form",
    );
  });

  it("rejects an invalid language", async () => {
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        { ...validBrief, lang: "es" },
        "198.51.100.23",
      ),
      response,
    );
    expect(state.status).toBe(400);
    expect(state.body).toEqual({ ok: false, error: "invalid" });
    expect(submitProjectBrief).not.toHaveBeenCalled();
  });

  it("returns delivery_failed when submit throws", async () => {
    submitProjectBrief.mockRejectedValueOnce(new Error("SMTP down"));
    const { response, state } = createResponse();
    await handler(
      request(
        "POST",
        { ...validBrief, clientEmail: "ada.fail@example.com" },
        "198.51.100.11",
      ),
      response,
    );

    expect(state.status).toBe(500);
    expect(state.body).toEqual({ ok: false, error: "delivery_failed" });
  });

  it("rate limits repeated submissions from the same IP", async () => {
    const ip = "198.51.100.12";
    for (let index = 0; index < 3; index += 1) {
      const { response, state } = createResponse();
      await handler(
        request(
          "POST",
          {
            ...validBrief,
            clientEmail: `ada.ip${index}@example.com`,
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
        { ...validBrief, clientEmail: "ada.ip-blocked@example.com" },
        ip,
      ),
      response,
    );
    expect(state.status).toBe(429);
    expect(state.body).toEqual({ ok: false, error: "rate_limited" });
  });

  it("rate limits repeated submissions from the same email", async () => {
    const email = "ada.repeat@example.com";
    for (let index = 0; index < 2; index += 1) {
      const { response, state } = createResponse();
      await handler(
        request("POST", { ...validBrief, clientEmail: email }, `198.51.100.${20 + index}`),
        response,
      );
      expect(state.status).toBe(200);
    }

    const { response, state } = createResponse();
    await handler(
      request("POST", { ...validBrief, clientEmail: email }, "198.51.100.22"),
      response,
    );
    expect(state.status).toBe(429);
    expect(submitProjectBrief).toHaveBeenCalledTimes(2);
  });
});
