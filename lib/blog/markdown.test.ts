import { describe, expect, it } from "vitest";
import {
  htmlFromContentBlocks,
  markdownToContentBlocks,
  markdownToHtml,
  splitMarkdownWithDemos,
} from "./markdown";

describe("markdownToHtml", () => {
  it("renders GFM tables as scrollable HTML tables", async () => {
    const html = await markdownToHtml(`| Voce | Importo |
| --- | --- |
| Tecnologia | € 7.000 |
| **Totale** | **€ 14.000** |`);

    expect(html).toContain('class="blog-table-scroll"');
    expect(html).toContain("<table>");
    expect(html).toContain("<th>Voce</th>");
    expect(html).toContain("<td>Tecnologia</td>");
    expect(html).not.toContain("<p>| Voce");
  });
});

describe("splitMarkdownWithDemos", () => {
  it("keeps plain markdown as a single segment", () => {
    const segments = splitMarkdownWithDemos("## Titolo\n\nParagrafo.");

    expect(segments).toEqual([{ type: "markdown", value: "## Titolo\n\nParagrafo." }]);
  });

  it("splits demo markers from surrounding copy", () => {
    const segments = splitMarkdownWithDemos(`Prima.

:::demo officina

Dopo.

:::demo attrezzi

Fine.`);

    expect(segments).toEqual([
      { type: "markdown", value: "Prima." },
      { type: "demo", id: "officina" },
      { type: "markdown", value: "Dopo." },
      { type: "demo", id: "attrezzi" },
      { type: "markdown", value: "Fine." },
    ]);
  });
});

describe("markdownToContentBlocks", () => {
  it("renders html islands around demo ids", async () => {
    const blocks = await markdownToContentBlocks(
      "Un **DDT**.\n\n:::demo memoria\n\nAltro testo.",
    );

    expect(blocks).toHaveLength(3);
    expect(blocks[0]).toMatchObject({ type: "html" });
    expect((blocks[0] as { html: string }).html).toContain("<strong>DDT</strong>");
    expect(blocks[1]).toEqual({ type: "demo", id: "memoria" });
    expect(blocks[2]).toMatchObject({ type: "html" });
    expect(htmlFromContentBlocks(blocks)).not.toContain(":::demo");
  });
});
