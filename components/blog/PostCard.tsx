import Link from "next/link";
import { formatItalianDate } from "../../lib/blog/format";
import { formatTagLabel } from "../../lib/blog/tags";
import type { BlogPostSummary } from "../../lib/blog/types";

type PostCardProps = {
  post: BlogPostSummary;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-farm-surface rounded-2xl border border-farm-border p-8 hover:shadow-md transition-shadow">
      <time className="text-sm text-farm-secondary">
        {formatItalianDate(post.publishedAt)}
      </time>
      <h2 className="text-2xl font-semibold text-farm-text mt-2 mb-3">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:text-sage-600 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      <p className="text-farm-secondary leading-relaxed">{post.excerpt}</p>
      {post.tags && post.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/blog/tag/${tag}`}
                className="inline-block rounded-full bg-paper border border-farm-border px-3 py-1 text-xs text-farm-secondary hover:text-sage-600 transition-colors"
              >
                {formatTagLabel(tag)}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link
        href={`/blog/${post.slug}`}
        className="inline-block mt-4 text-sage-600 font-medium hover:text-sage-500 transition-colors"
      >
        Leggi di più →
      </Link>
    </article>
  );
}
