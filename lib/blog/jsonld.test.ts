import { describe, expect, it } from "vitest";

import { DDT_TUTORIAL_SLUG, extraJsonLdForBlogPost } from "./jsonld";

describe("extraJsonLdForBlogPost", () => {
  it("adds HowTo and Service schema only on the DDT tutorial", () => {
    const extras = extraJsonLdForBlogPost(DDT_TUTORIAL_SLUG);
    const empty = extraJsonLdForBlogPost("ai-in-azienda-delega-la-forma-verifica-i-fatti");

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
});
