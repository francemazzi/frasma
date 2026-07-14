import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextApiRequest, NextApiResponse } from "next";
import type { DiagnosticSummary } from "./diagnostic";

const sendMail = vi.fn().mockResolvedValue({ messageId: "test-message" });

vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({ sendMail })),
  },
}));

import handler from "../../pages/api/send-diagnostic-summary";

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

const validSummary: DiagnosticSummary = {
  clientName: "Mario Rossi",
  clientEmail: "mario@example.com",
  clientCompany: "Example Srl",
  sector: "Manufacturing",
  process: "Delivery note registration",
  currentWorkflow: "Operators copy delivery note data into the ERP.",
  bottlenecks: ["Manual data entry"],
  currentSystems: ["Mago Zucchetti"],
  volumesAndFrequency: "100 delivery notes per week",
  baselineMetrics: ["8 minutes per delivery note"],
  dataAvailable: ["Anonymized delivery note PDFs"],
  constraints: ["Human approval before ERP import"],
  desiredOutcomes: ["Reduce repetitive data entry"],
  needCategories: ["document_erp"],
  opportunities: ["Controlled extraction and validation"],
  recommendations: ["Build a representative dataset before prototyping"],
  openQuestions: ["How are exceptions handled?"],
  nextSteps: ["Collect anonymized samples"],
  language: "en",
  honeypot: "",
};

describe("send diagnostic summary API", () => {
  beforeEach(() => {
    sendMail.mockClear();
    process.env.SMTP_HOST = "smtp.example.com";
    process.env.SMTP_PORT = "465";
    process.env.SMTP_USER = "sender@example.com";
    process.env.SMTP_PASS = "secret";
  });

  it("rejects unsupported methods", async () => {
    const { response, state } = createResponse();
    await handler(request("GET", null, "198.51.100.10"), response);
    expect(state.status).toBe(405);
    expect(state.body).toEqual({ ok: false, error: "Method not allowed." });
  });

  it("rejects invalid summaries", async () => {
    const { response, state } = createResponse();
    await handler(request("POST", { clientEmail: "bad" }, "198.51.100.11"), response);
    expect(state.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("emails a valid reviewed summary", async () => {
    const { response, state } = createResponse();
    await handler(request("POST", validSummary, "198.51.100.12"), response);
    expect(state.status).toBe(200);
    expect(state.body).toEqual({ ok: true });
    expect(sendMail).toHaveBeenCalledOnce();
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        replyTo: validSummary.clientEmail,
        subject: expect.stringContaining(validSummary.clientName),
      }),
    );
  });
});
