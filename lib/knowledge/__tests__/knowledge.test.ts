import { describe, expect, it } from "vitest";

import {
  canonicalPath,
  caseStudies,
  faqsForEntry,
  getDiagnosticFramework,
  getFrasmaProfile,
  getKnowledgeEntry,
  knowledgeCatalog,
  KnowledgeCatalogSchema,
  markdownForPath,
  operationalServices,
  searchKnowledge,
  sectors,
  VIBEUP_SERVICE_ID,
} from "../index";

describe("knowledge catalog", () => {
  it("is valid and contains the required real-world cases", () => {
    expect(() => KnowledgeCatalogSchema.parse(knowledgeCatalog)).not.toThrow();

    const cases = knowledgeCatalog.entries.filter(
      (entry) => entry.category === "case-study",
    );

    expect(cases).toHaveLength(4);
    expect(cases.map((entry) => entry.id)).toEqual([
      "food-quality-case",
      "manufacturing-erp-case",
      "industrial-maintenance-case",
      "agri-food-operations-case",
    ]);
  });

  it("contains every required service and sector", () => {
    const ids = new Set(knowledgeCatalog.entries.map((entry) => entry.id));

    expect([
      "delivery-notes-to-erp",
      "workflow-procedures",
      "field-service-ticketing",
      "custom-management-software",
      "ai-datasets-benchmarks",
      "company-wiki-brain",
      "local-ai-enterprise",
      "ai-presence",
      "vibeup-deploy-service",
      "manufacturing",
      "food-quality",
      "agronomy-agri-food",
      "field-service",
    ].every((id) => ids.has(id))).toBe(true);
  });

  it("maps manufacturing and VibeUp to the correct page paths", () => {
    const manufacturing = knowledgeCatalog.entries.find(
      (entry) => entry.id === "manufacturing",
    );
    const vibeup = knowledgeCatalog.entries.find(
      (entry) => entry.id === "vibeup-deploy-service",
    );
    const method = knowledgeCatalog.entries.find(
      (entry) => entry.id === "diagnostic-method",
    );

    expect(manufacturing?.pagePaths).toContain("/manifattura");
    expect(canonicalPath(manufacturing!)).toBe("/manifattura");
    expect(vibeup?.pagePaths).toEqual(["/vibeup"]);
    expect(method?.pagePaths).not.toContain("/studio");
    expect(method?.pagePaths).toContain("/for-agents");
  });

  it("gives operational services, cases, and sectors indexable canonical URLs", () => {
    for (const service of operationalServices()) {
      expect(canonicalPath(service).startsWith("/servizi/")).toBe(true);
      expect(service.pagePaths[0]).toBe(canonicalPath(service));
    }

    const vibeup = knowledgeCatalog.entries.find(
      (entry) => entry.id === VIBEUP_SERVICE_ID,
    );
    expect(vibeup?.pagePaths).toEqual(["/vibeup"]);

    for (const study of caseStudies()) {
      expect(canonicalPath(study).startsWith("/casi/")).toBe(true);
      expect(study.pagePaths).toContain("/#casi-studio");
    }

    const sectorPaths = Object.fromEntries(
      sectors().map((sector) => [sector.id, canonicalPath(sector)]),
    );
    expect(sectorPaths).toEqual({
      manufacturing: "/manifattura",
      "food-quality": "/alimentare",
      "agronomy-agri-food": "/agronomia",
      "field-service": "/manutenzione",
    });
  });

  it("rejects references to unknown entries", () => {
    const invalidCatalog = {
      ...knowledgeCatalog,
      entries: knowledgeCatalog.entries.map((entry, index) =>
        index === 0
          ? { ...entry, relatedIds: ["missing-entry"] }
          : entry,
      ),
    };

    expect(() => KnowledgeCatalogSchema.parse(invalidCatalog)).toThrow();
  });
});

describe("localized APIs", () => {
  it("returns a localized Frasma profile", () => {
    const italian = getFrasmaProfile("it");
    const english = getFrasmaProfile("en");

    expect(italian.name).toBe("Frasma");
    expect(italian.description).toContain("lavoro manuale");
    expect(english.description).toContain("manual work");
    expect(italian.commercialLimits.join(" ")).toContain("non promette");
    expect(english.commercialLimits.join(" ")).toContain("does not promise");
  });

  it("returns the diagnostic method, fit criteria, and commercial limits", () => {
    const framework = getDiagnosticFramework("en");

    expect(framework.steps.map((step) => step.id)).toEqual([
      "observe",
      "baseline",
      "prototype",
      "evaluate",
    ]);
    expect(framework.fitCriteria.length).toBeGreaterThan(0);
    expect(framework.poorFitCriteria.length).toBeGreaterThan(0);
    expect(framework.commercialLimits.join(" ")).toContain("No savings");
  });
});

describe("searchKnowledge", () => {
  it("ranks exact service keywords deterministically", () => {
    const input = { query: "Mago Zucchetti ERP", locale: "it" as const };
    const firstRun = searchKnowledge(input);
    const secondRun = searchKnowledge(input);

    expect(firstRun).toEqual(secondRun);
    expect(firstRun[0]?.id).toBe("delivery-notes-to-erp");
  });

  it("returns localized results and no more than five items", () => {
    const results = searchKnowledge({
      query: "documents workflow ERP",
      locale: "en",
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(5);
    expect(results.every((result) => result.score > 0)).toBe(true);
    expect(results.some((result) => result.title.includes("Delivery"))).toBe(
      true,
    );
  });

  it("uses page context only as a deterministic relevance boost", () => {
    const withoutContext = searchKnowledge({
      query: "manutenzione",
      locale: "it",
    });
    const withContext = searchKnowledge({
      query: "manutenzione",
      locale: "it",
      pagePath: "/#casi-studio",
    });
    const baseCase = withoutContext.find(
      (result) => result.id === "industrial-maintenance-case",
    );
    const contextualCase = withContext.find(
      (result) => result.id === "industrial-maintenance-case",
    );

    expect(contextualCase?.score).toBeGreaterThan(baseCase?.score ?? 0);
  });

  it("returns no results for unknown or punctuation-only queries", () => {
    expect(
      searchKnowledge({ query: "xylophone-nebula", locale: "en" }),
    ).toEqual([]);
    expect(searchKnowledge({ query: "?!", locale: "it" })).toEqual([]);
  });
});

describe("markdownForPath", () => {
  it("returns Frasma markdown for home and the DDT service spoke", () => {
    const home = markdownForPath("/");
    const ddt = markdownForPath("/servizi/ddt-erp");
    const missing = markdownForPath("/does-not-exist");

    expect(home).toContain("# Frasma");
    expect(home).toContain("/servizi/ddt-erp");
    expect(home).toContain("https://smithery.ai/servers/francemazzi/frasma");
    expect(ddt).toContain("https://www.frasma.org/servizi/ddt-erp");
    expect(ddt).toContain("youtu.be/22K6TJAXmmE");
    expect(ddt).toContain("Delegate the form, verify the facts");
    expect(missing).toBeNull();
  });
});

describe("faqsForEntry extras", () => {
  it("puts method and problem FAQs ahead of generic defaults", () => {
    const ddt = faqsForEntry(getKnowledgeEntry("delivery-notes-to-erp")!, "it");
    const procedures = faqsForEntry(
      getKnowledgeEntry("workflow-procedures")!,
      "it",
    );
    const wiki = faqsForEntry(getKnowledgeEntry("company-wiki-brain")!, "it");

    expect(ddt[0]?.question).toContain("Delega la forma, verifica i fatti");
    expect(procedures.some((faq) => faq.question.includes("HACCP"))).toBe(true);
    expect(wiki.some((faq) => faq.question.includes("PDF sparsi"))).toBe(true);
    expect(
      procedures.some((faq) => faq.answer.toLowerCase().includes("listino")),
    ).toBe(true);
  });
});
