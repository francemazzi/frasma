import { describe, expect, it } from "vitest";
import { getPostBySlug, getRelatedPosts } from "./posts";

describe("getRelatedPosts", () => {
  it("uses the related slugs on the local AI hardware guide", async () => {
    const post = await getPostBySlug(
      "computer-per-intelligenza-artificiale-in-locale"
    );

    expect(post).not.toBeNull();
    expect(getRelatedPosts(post!).map((item) => item.slug)).toEqual([
      "ai-in-azienda-delega-la-forma-verifica-i-fatti",
      "ai-manifattura-officina-intorno-al-modello",
    ]);
  });

  it("falls back to shared tags when related is absent", async () => {
    const post = await getPostBySlug("iperammortamento-2026");

    expect(post?.related).toBeUndefined();
    expect(getRelatedPosts(post!)).toHaveLength(2);
  });
});
