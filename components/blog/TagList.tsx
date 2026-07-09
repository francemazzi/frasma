import Link from "next/link";
import { formatTagLabel } from "../../lib/blog/tags";

type TagListProps = {
  tags: string[];
};

export default function TagList({ tags }: TagListProps) {
  if (!tags.length) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2 mb-8">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/blog/tag/${tag}`}
            className="inline-block rounded-full bg-farm-surface border border-farm-border px-3 py-1 text-sm text-farm-secondary hover:text-sage-600 transition-colors"
          >
            {formatTagLabel(tag)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
