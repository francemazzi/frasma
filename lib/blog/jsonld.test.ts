import { describe, expect, it } from "vitest";

import {
  AUTOCAD_BOM_SLUG,
  DDT_READING_SLUG,
  DDT_TUTORIAL_SLUG,
  ERP_AI_THESIS_SLUG,
  HARNESS_OFFICINA_SLUG,
  MACHINING_QUOTES_SLUG,
  AGENTS_FOR_COMPANIES_SLUG,
  WAREHOUSE_EXCEL_SLUG,
  extraJsonLdForBlogPost,
} from "./jsonld";

describe("extraJsonLdForBlogPost", () => {
  it("adds HowTo and Service schema only on the DDT tutorial", () => {
    const extras = extraJsonLdForBlogPost(DDT_TUTORIAL_SLUG);
    const empty = extraJsonLdForBlogPost(
      "ai-in-azienda-delega-la-forma-verifica-i-fatti",
    );

    expect(empty).toEqual([]);
    expect(extras).toHaveLength(2);
    const howTo = extras[0] as { "@type": string; step: unknown[] };

    expect(howTo["@type"]).toBe("HowTo");
    expect(howTo.step).toHaveLength(5);
    expect(extras[1]).toMatchObject({
      "@type": "Service",
      url: "https://www.frasma.org/servizi/ddt-erp",
    });
  });

  it("adds FAQPage and Service schema on the ERP AI thesis article", () => {
    const extras = extraJsonLdForBlogPost(ERP_AI_THESIS_SLUG);

    expect(extras).toHaveLength(2);
    const faqPage = extras[0] as {
      "@type": string;
      mainEntity: Array<{ name: string }>;
    };

    expect(faqPage["@type"]).toBe("FAQPage");
    expect(faqPage.mainEntity).toHaveLength(5);
    expect(faqPage.mainEntity[0]?.name).toContain("ChatGPT");
    expect(extras[1]).toMatchObject({
      "@type": "Service",
      url: "https://www.frasma.org/servizi/ddt-erp",
    });
    expect(extraJsonLdForBlogPost(ERP_AI_THESIS_SLUG)[0]).not.toMatchObject({
      "@type": "HowTo",
    });
  });

  it("adds FAQPage and Service schema on the DDT reading guide", () => {
    const extras = extraJsonLdForBlogPost(DDT_READING_SLUG);

    expect(extras).toHaveLength(2);
    const faqPage = extras[0] as {
      "@type": string;
      mainEntity: Array<{ name: string }>;
    };

    expect(faqPage["@type"]).toBe("FAQPage");
    expect(faqPage.mainEntity).toHaveLength(5);
    expect(faqPage.mainEntity[0]?.name).toContain("lettura automatica dei DDT");
    expect(extras[1]).toMatchObject({
      "@type": "Service",
      url: "https://www.frasma.org/servizi/ddt-erp",
    });
  });

  it("adds FAQPage schema on the AutoCAD BOM guide", () => {
    const extras = extraJsonLdForBlogPost(AUTOCAD_BOM_SLUG);

    expect(extras).toHaveLength(1);
    const faqPage = extras[0] as {
      "@type": string;
      mainEntity: Array<{ name: string }>;
    };

    expect(faqPage["@type"]).toBe("FAQPage");
    expect(faqPage.mainEntity).toHaveLength(5);
    expect(faqPage.mainEntity[0]?.name).toContain("DATAEXTRACTION");
    expect(extras[0]).not.toMatchObject({
      "@type": "Service",
    });
  });

  it("adds FAQPage schema on the machining quotes guide", () => {
    const extras = extraJsonLdForBlogPost(MACHINING_QUOTES_SLUG);

    expect(extras).toHaveLength(1);
    const faqPage = extras[0] as {
      "@type": string;
      mainEntity: Array<{ name: string }>;
    };

    expect(faqPage["@type"]).toBe("FAQPage");
    expect(faqPage.mainEntity).toHaveLength(5);
    expect(faqPage.mainEntity[0]?.name).toContain("software di preventivi");
    expect(extras[0]).not.toMatchObject({
      "@type": "HowTo",
    });
  });

  it("adds FAQPage schema on the warehouse Excel guide", () => {
    const extras = extraJsonLdForBlogPost(WAREHOUSE_EXCEL_SLUG);

    expect(extras).toHaveLength(1);
    const faqPage = extras[0] as {
      "@type": string;
      mainEntity: Array<{ name: string }>;
    };

    expect(faqPage["@type"]).toBe("FAQPage");
    expect(faqPage.mainEntity).toHaveLength(5);
    expect(faqPage.mainEntity[0]?.name).toContain("gestionale di magazzino");
    expect(extras[0]).not.toMatchObject({
      "@type": "HowTo",
    });
  });

  it("adds FAQPage schema on the AI agents for companies guide", () => {
    const extras = extraJsonLdForBlogPost(AGENTS_FOR_COMPANIES_SLUG);

    expect(extras).toHaveLength(1);
    const faqPage = extras[0] as {
      "@type": string;
      mainEntity: Array<{ name: string }>;
    };

    expect(faqPage["@type"]).toBe("FAQPage");
    expect(faqPage.mainEntity).toHaveLength(5);
    expect(faqPage.mainEntity[0]?.name).toContain("accettazione o preventivi");
    expect(extras[0]).not.toMatchObject({
      "@type": "HowTo",
    });
  });

  it("adds FAQPage and Service schema on the harness officina article", () => {
    const extras = extraJsonLdForBlogPost(HARNESS_OFFICINA_SLUG);

    expect(extras).toHaveLength(2);
    const faqPage = extras[0] as {
      "@type": string;
      mainEntity: Array<{ name: string }>;
    };

    expect(faqPage["@type"]).toBe("FAQPage");
    expect(faqPage.mainEntity).toHaveLength(5);
    expect(faqPage.mainEntity[0]?.name).toContain("officina intorno");
    expect(extras[1]).toMatchObject({
      "@type": "Service",
      url: "https://www.frasma.org/servizi/ddt-erp",
    });
  });
});
