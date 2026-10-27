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

vi.mock("../chat/persistence", async () => {
  const actual = await vi.importActual<typeof import("../chat/persistence")>(
    "../chat/persistence",
  );
  return {
    ...actual,
    logConversionEvent,
  };
});

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
        sector: "Manufacturing",
        role: "Operations",
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
    // The brief's role is a job title: it must never overwrite the sector a
    // returning chat visitor already gave.
    expect(upsertVisitor).toHaveBeenCalledWith({
      email: "ada@example.com",
      name: "Ada Lovelace",
      company: "Analytical Engines",
      sector: "unspecified",
      role: "Operations",
    });
    expect(insertOne).toHaveBeenCalledOnce();
    expect(insertOne).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "user-1",
        source: "chat",
        conversationId: "550e8400-e29b-41d4-a716-446655440000",
        clientEmail: "ada@example.com",
        role: "Operations",
        createdAt: expect.any(Date),
        expiresAt: expect.any(Date),
      }),
    );
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

describe("submitProjectBrief attribution", () => {
  const chatgptBrief = {
    ...brief,
    landingPath: "/ddt",
    utmSource: "chatgpt",
    utmMedium: "ads",
    utmCampaign: "ddt-2026",
    utmContent: "variant-a",
  };
  const visitor = {
    id: "user-4",
    email: "ada@example.com",
    name: "Ada Lovelace",
    company: "Analytical Engines",
    sector: "unspecified",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    deliverNotificationEmail.mockClear();
    upsertVisitor.mockReset();
    logConversionEvent.mockReset();
    getMongoDb.mockReset();
    createRicercaClientiLead.mockClear();
    isMongoConfigured.mockReturnValue(false);
  });

  it("stores the channel and attribution on the lead and conversion event", async () => {
    isMongoConfigured.mockReturnValue(true);
    upsertVisitor.mockResolvedValue({ visitor, created: true });
    const insertOne = vi.fn<
      (document: Record<string, unknown>) => Promise<{ acknowledged: boolean }>
    >(async () => ({ acknowledged: true }));
    getMongoDb.mockResolvedValue({ collection: () => ({ insertOne }) });

    await submitProjectBrief(chatgptBrief, "form");

    const attribution = {
      landingPath: "/ddt",
      utmSource: "chatgpt",
      utmMedium: "ads",
      utmCampaign: "ddt-2026",
      utmContent: "variant-a",
    };
    expect(insertOne).toHaveBeenCalledWith(
      expect.objectContaining({
        source: "form",
        channel: "chatgpt_ads",
        ...attribution,
      }),
    );
    expect(logConversionEvent).toHaveBeenCalledWith(
      undefined,
      "project_brief_submitted",
      expect.objectContaining({
        source: "form",
        channel: "chatgpt_ads",
        landingPath: "/ddt",
        utmSource: "chatgpt",
        utmCampaign: "ddt-2026",
        utmContent: "variant-a",
      }),
      expect.objectContaining({ userId: "user-4" }),
    );
    expect(createRicercaClientiLead).toHaveBeenCalledWith(
      expect.objectContaining({
        source: "form",
        channel: "chatgpt_ads",
        ...attribution,
      }),
    );
    expect(deliverNotificationEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: expect.stringContaining("(annuncio ChatGPT)"),
      }),
    );
  });

  it("omits absent attribution keys and derives the channel from the source", async () => {
    isMongoConfigured.mockReturnValue(true);
    upsertVisitor.mockResolvedValue({ visitor, created: false });
    const insertOne = vi.fn<
      (document: Record<string, unknown>) => Promise<{ acknowledged: boolean }>
    >(async () => ({ acknowledged: true }));
    getMongoDb.mockResolvedValue({ collection: () => ({ insertOne }) });

    await submitProjectBrief(brief, "chat");

    const stored = insertOne.mock.calls[0]?.[0] ?? {};
    expect(stored.channel).toBe("chat");
    for (const key of [
      "landingPath",
      "utmSource",
      "utmMedium",
      "utmCampaign",
      "utmContent",
    ]) {
      expect(stored).not.toHaveProperty(key);
    }
    expect(logConversionEvent).toHaveBeenCalledWith(
      undefined,
      "project_brief_submitted",
      expect.not.objectContaining({ landingPath: expect.anything() }),
      expect.objectContaining({ userId: "user-4" }),
    );
    expect(createRicercaClientiLead).toHaveBeenCalledWith(
      expect.objectContaining({ source: "chat", channel: "chat" }),
    );
  });

  it("passes the channel to Notion even without MongoDB", async () => {
    await submitProjectBrief(
      { ...brief, utmSource: "linkedin", utmMedium: "cpc" },
      "form",
    );

    expect(createRicercaClientiLead).toHaveBeenCalledWith(
      expect.objectContaining({ channel: "paid_other", leadId: undefined }),
    );
  });
});
