import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

function wrapTablesForScroll(html: string): string {
  return html.replace(/<table[\s\S]*?<\/table>/g, (table) => {
    return `<div class="blog-table-scroll">${table}</div>`;
  });
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  return wrapTablesForScroll(result.toString());
}
