import { describe, expect, it } from "vitest";
import { markdownToHtml } from "./markdown";

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
