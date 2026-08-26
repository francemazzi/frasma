import { describe, expect, it } from "vitest";

import { canonicalPath, knowledgeCatalog } from "./knowledge";
import {
  caseStudyJsonLd,
  faqPageJsonLd,
  howToJsonLd,
  personJsonLd,
  professionalServiceJsonLd,
  serviceJsonLd,
  serviceOfferCatalogJsonLd,
  SHARE_IMAGE,
  SHARE_IMAGE_HEIGHT,
  SHARE_IMAGE_WIDTH,
  SMITHERY_SERVER_URL,
  YOUTUBE_URL,
} from "./seo";
import { catalogSitemapEntries } from "./sitemap";

describe("SEO helpers", () => {
  it("sets areaServed to Italy, Lombardy, and Mantova", () => {
    const names = (professionalServiceJsonLd.areaServed as Array<{ name: string }>).map(
      (area) => area.name,
    );

    expect(names).toEqual(["Italia", "Lombardia", "Mantova"]);
    expect(names).not.toContain("Emilia-Romagna");
  });

  it("shares YouTube on Person and ProfessionalService sameAs, with Mantova on Person", () => {
    expect(personJsonLd.sameAs).toContain(YOUTUBE_URL);
    expect(professionalServiceJsonLd.sameAs).toContain(YOUTUBE_URL);
    expect(personJsonLd.sameAs).toContain(SMITHERY_SERVER_URL);
    expect(professionalServiceJsonLd.sameAs).toContain(SMITHERY_SERVER_URL);
    expect(personJsonLd.address).toMatchObject({
      addressLocality: "Mantova",
      addressRegion: "Lombardia",
      addressCountry: "IT",
    });
  });

  it("builds HowTo JSON-LD with ordered steps", () => {
    const howTo = howToJsonLd({
      name: "DDT da email",
      description: "Whitelist, PDF, Excel",
      url: "https://www.frasma.org/blog/automatizzare-ddt-email-intelligenza-artificiale",
      steps: [
        { name: "Whitelist", text: "Mittenti autorizzati" },
        { name: "PDF", text: "Trova i DDT" },
      ],
    });

    expect(howTo["@type"]).toBe("HowTo");
    expect(howTo.step).toHaveLength(2);
    expect(howTo.step[0]).toMatchObject({
      "@type": "HowToStep",
      position: 1,
      name: "Whitelist",
    });
  });

  it("points homepage service offers at canonical service URLs", () => {
    const catalog = serviceOfferCatalogJsonLd("it", ["delivery-notes-to-erp"]);
    const offer = catalog.itemListElement[0];

    expect(offer.itemOffered.url).toBe("https://www.frasma.org/servizi/ddt-erp");
  });

  it("builds FAQ, Service, and case-study JSON-LD", () => {
    const faq = faqPageJsonLd([
      { question: "Serve un listino?", answer: "No, serve una discovery." },
    ]);
    const service = serviceJsonLd({
      id: "delivery-notes-to-erp",
      name: "DDT",
      description: "Documenti verso ERP",
      path: "/servizi/ddt-erp",
    });
    const study = caseStudyJsonLd({
      id: "food-quality-case",
      name: "HACCP",
      description: "Procedure alimentari",
      path: "/casi/procedure-alimentari",
    });

    expect(faq["@type"]).toBe("FAQPage");
    expect(service.url).toContain("/servizi/ddt-erp");
    expect(study["@type"]).toBe("Article");
  });
});

describe("sitemap catalog entries", () => {
  it("includes hubs and canonical catalog paths", () => {
    const entries = catalogSitemapEntries("2026-08-25");
    const locs = entries.map((entry) => entry.loc);

    expect(locs).toContain("https://www.frasma.org/servizi");
    expect(locs).toContain("https://www.frasma.org/servizi/ddt-erp");
    expect(locs).toContain("https://www.frasma.org/casi");
    expect(locs).toContain("https://www.frasma.org/alimentare");
    expect(locs).toContain("https://www.frasma.org/llms-it.txt");
    expect(entries.every((entry) => entry.lastmod === "2026-08-25")).toBe(true);
  });

  it("uses canonicalPath for every operational service", () => {
    const ddt = knowledgeCatalog.entries.find(
      (entry) => entry.id === "delivery-notes-to-erp",
    );

    expect(canonicalPath(ddt!)).toBe("/servizi/ddt-erp");
  });

  it("uses a compact share image so WhatsApp shows a thumbnail, not a large card", () => {
    expect(SHARE_IMAGE).toBe("https://www.frasma.org/og-share.png");
    expect(SHARE_IMAGE_WIDTH).toBeGreaterThanOrEqual(100);
    expect(SHARE_IMAGE_WIDTH).toBeLessThan(300);
    expect(SHARE_IMAGE_HEIGHT).toBe(SHARE_IMAGE_WIDTH);
  });
});
