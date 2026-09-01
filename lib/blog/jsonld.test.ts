import { describe, expect, it } from "vitest";

import {
  DDT_TUTORIAL_SLUG,
  ERP_AI_THESIS_SLUG,
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
});
