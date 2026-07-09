import Link from "next/link";
import type { BlogPostSummary } from "../../lib/blog/types";

type RelatedPostsProps = {
  posts: BlogPostSummary[];
};

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className="mt-16 pt-10 border-t border-farm-border">
      <h2 className="text-2xl font-semibold text-farm-text mb-6">
        Articoli correlati
      </h2>
      <ul className="space-y-4">
        {posts.map((relatedPost) => (
          <li key={relatedPost.slug}>
            <Link
              href={`/blog/${relatedPost.slug}`}
              className="block rounded-xl border border-farm-border bg-farm-surface p-5 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-farm-text hover:text-sage-600 transition-colors">
                {relatedPost.title}
              </h3>
              <p className="text-sm text-farm-secondary mt-2">
                {relatedPost.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
