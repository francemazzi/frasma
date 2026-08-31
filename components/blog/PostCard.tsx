import Image from "next/image";
import Link from "next/link";
import { formatItalianDate } from "../../lib/blog/format";
import { formatTagLabel } from "../../lib/blog/tags";
import type { BlogPostSummary } from "../../lib/blog/types";

type PostCardVariant = "featured" | "grid";

type PostCardProps = {
  post: BlogPostSummary;
  variant?: PostCardVariant;
};

export default function PostCard({ post, variant = "grid" }: PostCardProps) {
  const isFeatured = variant === "featured";
  const hasCover = Boolean(post.coverImage);

  return (
    <article
      className={
        isFeatured
          ? hasCover
            ? "overflow-hidden rounded-3xl border border-farm-border bg-farm-surface transition-colors hover:border-accent/30 md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            : "rounded-3xl border border-farm-border bg-farm-surface p-8 sm:p-10 transition-colors hover:border-accent/30"
          : "flex h-full flex-col overflow-hidden rounded-3xl border border-farm-border bg-farm-surface transition-colors hover:border-accent/30"
      }
    >
      {hasCover && post.coverImage ? (
        <div
          className={
            isFeatured
              ? "relative aspect-[4/3] md:aspect-auto md:h-full"
              : "relative aspect-video"
          }
        >
          <Image
            src={post.coverImage}
            alt=""
            fill
            className="object-cover"
            sizes={
              isFeatured
                ? "(max-width: 768px) 100vw, 40vw"
                : "(max-width: 768px) 100vw, 50vw"
            }
          />
        </div>
      ) : null}

      <div
        className={
          isFeatured
            ? hasCover
              ? "flex flex-col p-8 sm:p-10"
              : ""
            : "flex flex-1 flex-col p-5 sm:p-6"
        }
      >
        <time className="text-sm text-farm-secondary">
          {formatItalianDate(post.publishedAt)}
        </time>
        <h2
          className={
            isFeatured
              ? "mt-2 mb-3 text-3xl font-medium text-farm-text"
              : "mt-2 mb-3 text-xl font-medium text-farm-text"
          }
        >
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-sage-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        <p
          className={
            isFeatured
              ? "text-farm-secondary leading-relaxed"
              : "text-farm-secondary leading-relaxed line-clamp-3"
          }
        >
          {post.excerpt}
        </p>
        {post.tags && post.tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/blog/tag/${tag}`}
                  className="inline-block rounded-full border border-farm-border bg-paper px-3 py-1 text-xs text-farm-secondary transition-colors hover:text-sage-600"
                >
                  {formatTagLabel(tag)}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <Link
          href={`/blog/${post.slug}`}
          className={
            isFeatured
              ? "mt-4 inline-block font-medium text-sage-600 transition-colors hover:text-sage-500"
              : "mt-auto inline-block pt-4 font-medium text-sage-600 transition-colors hover:text-sage-500"
          }
        >
          Leggi di più →
        </Link>
      </div>
    </article>
  );
}
