import { afterEach, describe, expect, it, vi } from "vitest";
import { ProcessAssessmentSchema } from "../processAssessment";
import {
  RICERCA_CLIENTI_DATABASE_ID,
  buildRicercaClientiDescription,
  buildRicercaClientiProperties,
  buildRicercaClientiTitle,
  createRicercaClientiLead,
  isNotionConfigured,
} from "./notion";

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

describe("ricerca_clienti Notion mapping", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.NOTION_TOKEN;
    delete process.env.NOTION_LEADS_DATABASE_ID;
  });

  it("uses the company as the row title", () => {
    expect(buildRicercaClientiTitle({ ...brief, source: "form" })).toBe(
      "Analytical Engines",
    );
  });

  it("falls back to the person name when company is missing", () => {
    const { company: _company, ...withoutCompany } = brief;
    expect(
      buildRicercaClientiTitle({ ...withoutCompany, source: "form" }),
    ).toBe("Ada Lovelace");
  });

  it("maps inbound site leads onto existing ricerca_clienti fields", () => {
    const properties = buildRicercaClientiProperties({
      ...brief,
      source: "form",
      leadId: "lead-1",
    });

    expect(properties.Status).toEqual({ status: { name: "[1] contattati" } });
    expect(properties["Call fissata"]).toEqual({ select: { name: "no" } });
    expect(properties["Modalità primo contatto"]).toEqual({
      multi_select: [{ name: "email dal sito" }],
    });
    expect(properties.email).toEqual({ email: "ada@example.com" });
    expect(properties["Lead ID"]).toEqual({
      rich_text: [{ type: "text", text: { content: "lead-1" } }],
    });
    expect(properties["Problema potenziale"]).toEqual({
      rich_text: [
        {
          type: "text",
          text: { content: brief.process },
        },
      ],
    });
    expect(properties["Data primo contatto"]).toEqual({
      date: { start: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/) },
    });
    expect(buildRicercaClientiDescription({ ...brief, source: "chat" })).toContain(
      "Fonte: Chat",
    );
    expect(
      buildRicercaClientiDescription({
        ...brief,
        source: "form",
        leadId: "lead-1",
      }),
    ).toContain("Lead ID: lead-1");
  });

  it("is not configured without a token", () => {
    expect(isNotionConfigured()).toBe(false);
  });

  it("creates a ricerca_clienti page when Notion is configured", async () => {
    process.env.NOTION_TOKEN = "ntn_test";
    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify({
          id: "page-1",
          url: "https://www.notion.so/page-1",
        }),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const created = await createRicercaClientiLead({
      ...brief,
      source: "form",
      leadId: "lead-1",
    });

    expect(created).toEqual({
      pageId: "page-1",
      url: "https://www.notion.so/page-1",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.notion.com/v1/pages",
      expect.objectContaining({
        method: "POST",
      }),
    );
    const body = JSON.parse(
      (fetchMock.mock.calls[0]?.[1] as RequestInit).body as string,
    );
    expect(body.parent).toEqual({
      database_id: RICERCA_CLIENTI_DATABASE_ID,
    });
  });

  it("does not throw when Notion rejects the page", async () => {
    process.env.NOTION_TOKEN = "ntn_test";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("object_not_found", { status: 404 })),
    );

    await expect(
      createRicercaClientiLead({ ...brief, source: "form" }),
    ).resolves.toBeUndefined();
  });
});
