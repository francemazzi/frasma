import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { renderChatMarkdown } from "./markdown";

describe("renderChatMarkdown", () => {
  it("renders bold text without asterisks", () => {
    const html = renderToStaticMarkup(
      renderChatMarkdown("- **Nome**: Francesco\n- **Email**: test@example.com"),
    );

    expect(html).toContain("<strong");
    expect(html).toContain("Nome");
    expect(html).not.toContain("**");
  });

  it("renders bullet lists", () => {
    const html = renderToStaticMarkup(
      renderChatMarkdown("- Primo punto\n- Secondo punto"),
    );

    expect(html).toContain("<ul");
    expect(html).toContain("<li");
    expect(html).toContain("Primo punto");
  });

  it("renders paragraphs with line breaks collapsed into one block", () => {
    const html = renderToStaticMarkup(
      renderChatMarkdown("Prima riga\nseconda riga"),
    );

    expect(html).toContain("<p");
    expect(html).toContain("Prima riga");
    expect(html).toContain("seconda riga");
  });
});
