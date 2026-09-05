import type { ReactNode } from "react";
import { createElement, Fragment } from "react";

type InlineSegment = { type: "text" | "bold"; value: string };

function parseInline(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const re = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    segments.push({ type: "bold", value: match[1] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", value: text.slice(lastIndex) });
  }

  return segments.length > 0 ? segments : [{ type: "text", value: text }];
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return parseInline(text).map((segment, index) => {
    const key = `${keyPrefix}-inline-${index}`;
    if (segment.type === "bold") {
      return createElement("strong", { key, className: "font-semibold" }, segment.value);
    }
    return createElement(Fragment, { key }, segment.value);
  });
}

function isBulletLine(line: string): boolean {
  return /^[-*]\s+/.test(line.trimStart());
}

function stripBulletPrefix(line: string): string {
  return line.trimStart().replace(/^[-*]\s+/, "");
}

/**
 * Renders a restricted subset of Markdown for assistant chat messages:
 * bold (**text**), bullet lists (- item), and paragraphs.
 * No raw HTML — safe for model-generated content.
 */
export function renderChatMarkdown(content: string): ReactNode {
  const normalized = content.replace(/\r\n/g, "\n").trim();
  if (!normalized) return null;

  const lines = normalized.split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;
  let blockIndex = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.trim() === "") {
      index += 1;
      continue;
    }

    if (isBulletLine(line)) {
      const items: ReactNode[] = [];
      while (index < lines.length && isBulletLine(lines[index])) {
        const itemText = stripBulletPrefix(lines[index]);
        items.push(
          createElement(
            "li",
            { key: `li-${blockIndex}-${items.length}` },
            ...renderInline(itemText, `li-${blockIndex}-${items.length}`),
          ),
        );
        index += 1;
      }
      blocks.push(
        createElement(
          "ul",
          {
            key: `ul-${blockIndex}`,
            className: "my-1 list-disc space-y-1 pl-5",
          },
          ...items,
        ),
      );
      blockIndex += 1;
      continue;
    }

    const paragraphLines: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() !== "" &&
      !isBulletLine(lines[index])
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }

    const paragraphText = paragraphLines.join("\n");
    blocks.push(
      createElement(
        "p",
        {
          key: `p-${blockIndex}`,
          className: blockIndex === 0 ? undefined : "mt-2",
        },
        ...renderInline(paragraphText, `p-${blockIndex}`),
      ),
    );
    blockIndex += 1;
  }

  return createElement(Fragment, null, ...blocks);
}
