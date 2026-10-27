import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import DdtLanding from "../../components/organism/ddt-landing/DdtLanding";
import { LanguageProvider } from "../i18n/context";
import {
  articlesForExtras,
  extrasForEntry,
  faqsForEntry,
  getKnowledgeEntry,
} from "../knowledge";
import { DDT_LANDING } from "./index";

describe("DdtLanding server render", () => {
  const entry = getKnowledgeEntry("delivery-notes-to-erp")!;
  const extras = extrasForEntry(entry.id);
  const html = renderToStaticMarkup(
    <LanguageProvider>
      <DdtLanding
        entry={entry}
        landing={DDT_LANDING}
        extras={extras}
        articles={articlesForExtras(extras)}
        faqs={faqsForEntry(entry, "it")}
        related={[
          {
            href: "/casi/documenti-erp-manifattura",
            title: "Caso",
            summary: "Riassunto",
          },
        ]}
        lang="it"
      />
    </LanguageProvider>,
  );

  it("keeps a single H1 with the service title", () => {
    expect(html.match(/<h1/g)?.length).toBe(1);
    expect(html).toContain("Automatizzare i DDT verso Mago e TeamSystem");
  });

  it("renders the inline lead form in the server HTML", () => {
    expect(html).toContain('id="richiesta"');
    expect(html).toContain("<form");
    expect(html).toContain('name="website"');
    expect(html).toContain('type="email"');
    expect(html).toContain('name="process"');
  });

  it("shows the demo, the next steps and the WhatsApp alternative", () => {
    expect(html).toContain("DDT · Mago / TeamSystem");
    expect(html).toContain("Cosa succede dopo il contatto");
    expect(html).toContain("wa.me/");
    // The video is a click-to-load facade: only the poster is in the SSR HTML.
    expect(html).toContain("i.ytimg.com/vi/22K6TJAXmmE/");
    expect(html).not.toContain("<iframe");
    expect(html).toContain('href="#richiesta"');
  });

  it("does not print prices in the commercial sections", () => {
    const start = html.indexOf('id="dopo-il-contatto"');
    const end = html.indexOf('id="faq"');
    expect(start).toBeGreaterThan(-1);
    expect(end).toBeGreaterThan(start);
    expect(html.slice(start, end)).not.toMatch(/€|\d+\s*%/);
  });
});
