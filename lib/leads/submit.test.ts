import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  deliverNotificationEmail,
  upsertVisitor,
  logConversionEvent,
  getMongoDb,
  isMongoConfigured,
  createRicercaClientiLead,
} = vi.hoisted(() => ({
  deliverNotificationEmail: vi.fn(async () => undefined),
  upsertVisitor: vi.fn(),
  logConversionEvent: vi.fn(async () => undefined),
  getMongoDb: vi.fn(),
  isMongoConfigured: vi.fn(() => false),
  createRicercaClientiLead: vi.fn(async () => undefined),
}));

vi.mock("../email/deliver", () => ({
  deliverNotificationEmail,
  getNotificationRecipient: () => "francemazzi@gmail.com",
  buildNotificationFromAddress: () => "Frasma <onboarding@resend.dev>",
}));

vi.mock("../chat/visitors", () => ({
  upsertVisitor,
  normalizeVisitorEmail: (email: string) => email.trim().toLowerCase(),
}));

vi.mock("../chat/persistence", () => ({
  logConversionEvent,
}));

vi.mock("../mongodb/client", () => ({
  getMongoDb,
  isMongoConfigured,
}));

vi.mock("../mongodb/indexes", () => ({
  ensureChatIndexes: vi.fn(async () => undefined),
}));

vi.mock("./notion", () => ({
  createRicercaClientiLead,
}));

import { inferLeadSource, submitProjectBrief } from "./submit";
import { ProcessAssessmentSchema } from "../processAssessment";

const brief = ProcessAssessmentSchema.parse({
  name: "Ada Lovelace",
  clientEmail: "ada@example.com",
  company: "Analytical Engines",
  role: "Operations",
  process:
    "Orders arrive as PDF attachments and are copied manually into the ERP.",
  systems: "Outlook, ERP",
  volume: "80 per week",
});

describe("submitProjectBrief", () => {
  beforeEach(() => {
    deliverNotificationEmail.mockClear();
    upsertVisitor.mockReset();
    logConversionEvent.mockReset();
    getMongoDb.mockReset();
    createRicercaClientiLead.mockClear();
    isMongoConfigured.mockReturnValue(false);
  });

  it("infers chat source from a valid conversation id", () => {
    expect(
      inferLeadSource("550e8400-e29b-41d4-a716-446655440000"),
    ).toBe("chat");
    expect(inferLeadSource(undefined)).toBe("form");
    expect(inferLeadSource("not-a-uuid")).toBe("form");
    expect(inferLeadSource("")).toBe("form");
  });

  it("sends email even when MongoDB is not configured", async () => {
    const result = await submitProjectBrief(brief, "form");

    expect(deliverNotificationEmail).toHaveBeenCalledOnce();
    expect(createRicercaClientiLead).toHaveBeenCalledWith(
      expect.objectContaining({
        clientEmail: "ada@example.com",
        source: "form",
        leadId: undefined,
      }),
    );
    expect(result.leadId).toBeUndefined();
    expect(upsertVisitor).not.toHaveBeenCalled();
  });

  it("uses unspecified sector when the brief has no role", async () => {
    isMongoConfigured.mockReturnValue(true);
    upsertVisitor.mockResolvedValue({
      visitor: {
        id: "user-2",
        email: "ada@example.com",
        name: "Ada Lovelace",
        company: "",
        sector: "unspecified",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      created: true,
    });
    const insertOne = vi.fn(async () => ({ acknowledged: true }));
    getMongoDb.mockResolvedValue({
      collection: () => ({ insertOne }),
    });

    const { role: _role, company: _company, ...withoutRole } = brief;
    await submitProjectBrief(withoutRole, "form");

    expect(upsertVisitor).toHaveBeenCalledWith({
      email: "ada@example.com",
      name: "Ada Lovelace",
      company: "",
      sector: "unspecified",
    });
    expect(logConversionEvent).toHaveBeenCalledWith(
      undefined,
      "project_brief_submitted",
      expect.objectContaining({ source: "form" }),
      expect.objectContaining({ userId: "user-2" }),
    );
  });

  it("does not persist when email delivery fails", async () => {
    isMongoConfigured.mockReturnValue(true);
    deliverNotificationEmail.mockRejectedValueOnce(new Error("SMTP down"));

    await expect(submitProjectBrief(brief, "form")).rejects.toThrow("SMTP down");
    expect(upsertVisitor).not.toHaveBeenCalled();
    expect(logConversionEvent).not.toHaveBeenCalled();
    expect(createRicercaClientiLead).not.toHaveBeenCalled();
  });

  it("still returns after persist errors once email is sent", async () => {
    isMongoConfigured.mockReturnValue(true);
    upsertVisitor.mockRejectedValue(new Error("mongo unavailable"));

    const result = await submitProjectBrief(brief, "form");

    expect(deliverNotificationEmail).toHaveBeenCalledOnce();
    expect(result.leadId).toBeUndefined();
    expect(logConversionEvent).not.toHaveBeenCalled();
  });

  it("does not attach an invalid conversation id to the lead", async () => {
    isMongoConfigured.mockReturnValue(true);
    upsertVisitor.mockResolvedValue({
      visitor: {
        id: "user-3",
        email: "ada@example.com",
        name: "Ada Lovelace",
        company: "Analytical Engines",
        sector: "Operations",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      created: false,
    });
    const insertOne = vi.fn(async () => ({ acknowledged: true }));
    getMongoDb.mockResolvedValue({
      collection: () => ({ insertOne }),
    });

    await submitProjectBrief(
      { ...brief, conversationId: "not-a-uuid" },
      "form",
    );

    expect(insertOne).toHaveBeenCalledWith(
      expect.not.objectContaining({ conversationId: "not-a-uuid" }),
    );
    expect(logConversionEvent).toHaveBeenCalledWith(
      undefined,
      "project_brief_submitted",
      expect.objectContaining({ source: "form" }),
      expect.objectContaining({ userId: "user-3" }),
    );
  });

  it("upserts a visitor and stores a lead when MongoDB is configured", async () => {
    isMongoConfigured.mockReturnValue(true);
    upsertVisitor.mockResolvedValue({
      visitor: {
        id: "user-1",
        email: "ada@example.com",
        name: "Ada Lovelace",
        company: "Analytical Engines",
        sector: "Operations",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      created: true,
    });
    const insertOne = vi.fn(async () => ({ acknowledged: true }));
    getMongoDb.mockResolvedValue({
      collection: () => ({ insertOne }),
    });

    const result = await submitProjectBrief(
      {
        ...brief,
        conversationId: "550e8400-e29b-41d4-a716-446655440000",
      },
      "chat",
    );

    expect(deliverNotificationEmail).toHaveBeenCalledOnce();
    expect(upsertVisitor).toHaveBeenCalledWith({
      email: "ada@example.com",
      name: "Ada Lovelace",
      company: "Analytical Engines",
      sector: "Operations",
    });
    expect(insertOne).toHaveBeenCalledOnce();
    expect(logConversionEvent).toHaveBeenCalledWith(
      "550e8400-e29b-41d4-a716-446655440000",
      "project_brief_submitted",
      expect.objectContaining({ source: "chat" }),
      expect.objectContaining({ userId: "user-1" }),
    );
    expect(result.leadId).toEqual(expect.any(String));
    expect(createRicercaClientiLead).toHaveBeenCalledWith(
      expect.objectContaining({
        source: "chat",
        leadId: result.leadId,
      }),
    );
  });
});
