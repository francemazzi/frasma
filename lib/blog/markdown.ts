import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { BlogContentBlock } from "./types";

const DEMO_LINE = /^:::demo\s+([a-z0-9-]+)\s*$/;

export type MarkdownSegment =
  | { type: "markdown"; value: string }
  | { type: "demo"; id: string };

function wrapTablesForScroll(html: string): string {
  return html.replace(/<table[\s\S]*?<\/table>/g, (table) => {
    return `<div class="blog-table-scroll">${table}</div>`;
  });
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  return wrapTablesForScroll(result.toString());
}

export function splitMarkdownWithDemos(markdown: string): MarkdownSegment[] {
  const lines = markdown.split("\n");
  const segments: MarkdownSegment[] = [];
  let buffer: string[] = [];

  const flush = () => {
    const value = bufToMarkdown(buffer);
    buffer = [];
    if (value.length > 0) {
      segments.push({ type: "markdown", value });
    }
  };

  for (const line of lines) {
    const match = line.match(DEMO_LINE);
    if (match) {
      flush();
      segments.push({ type: "demo", id: match[1] });
      continue;
    }
    buffer.push(line);
  }

  flush();
  return segments;
}

function bufToMarkdown(buffer: string[]): string {
  return buffer.join("\n").trim();
}

export async function markdownToContentBlocks(
  markdown: string,
): Promise<BlogContentBlock[]> {
  const segments = splitMarkdownWithDemos(markdown);
  const blocks: BlogContentBlock[] = [];

  for (const segment of segments) {
    if (segment.type === "demo") {
      blocks.push({ type: "demo", id: segment.id });
      continue;
    }

    blocks.push({ type: "html", html: await markdownToHtml(segment.value) });
  }

  return blocks;
}

export function htmlFromContentBlocks(blocks: BlogContentBlock[]): string {
  return blocks
    .filter((block): block is { type: "html"; html: string } => block.type === "html")
    .map((block) => block.html)
    .join("\n");
}
