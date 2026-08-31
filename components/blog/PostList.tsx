import type { BlogPostSummary } from "../../lib/blog/types";
import PostCard from "./PostCard";

type PostListProps = {
  posts: BlogPostSummary[];
};

export default function PostList({ posts }: PostListProps) {
  if (!posts.length) {
    return null;
  }

  const [featured, ...rest] = posts;

  return (
    <div>
      <PostCard post={featured} variant="featured" />
      {rest.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} variant="grid" />
          ))}
        </div>
      ) : null}
    </div>
  );
}
