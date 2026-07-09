import type { GetStaticPaths, GetStaticProps } from "next";
import Seo from "../../components/Seo";
import BlogPostLayout from "../../components/blog/BlogPostLayout";
import { FEED_URL } from "../../lib/blog/feed";
import type { BlogPost, BlogPostSummary } from "../../lib/blog/types";
import { absoluteUrl, breadcrumbJsonLd, SITE_URL } from "../../lib/seo";

type BlogPostPageProps = {
  post: BlogPost;
  relatedPosts: BlogPostSummary[];
  breadcrumbLabel: string;
};

export default function BlogPostPage({
  post,
  relatedPosts,
  breadcrumbLabel,
}: BlogPostPageProps) {
  const title = post.seoTitle ?? `${post.title} | Frasma`;
  const description = post.seoDescription ?? post.excerpt;
  const path = `/blog/${post.slug}`;
  const modifiedTime = post.updatedAt ?? post.publishedAt;

  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        image={post.coverImage}
        type="article"
        publishedTime={post.publishedAt}
        modifiedTime={modifiedTime}
        tags={post.tags}
        feedUrl={FEED_URL}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: breadcrumbLabel, path },
          ]),
          {
            "@type": "BlogPosting",
            "@id": `${SITE_URL}${path}#article`,
            headline: post.title,
            description,
            datePublished: post.publishedAt,
            dateModified: modifiedTime,
            author: {
              "@id": `${SITE_URL}/#person`,
            },
            publisher: {
              "@id": `${SITE_URL}/#business`,
            },
            mainEntityOfPage: absoluteUrl(path),
            ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
          },
        ]}
      />

      <BlogPostLayout post={post} relatedPosts={relatedPosts} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllPostSlugs } = await import("../../lib/blog/posts");
  const slugs = getAllPostSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params,
}) => {
  const { getPostBySlug, getRelatedPosts } = await import("../../lib/blog/posts");
  const slug = params?.slug as string;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { notFound: true };
  }

  const relatedPosts = getRelatedPosts(post);

  const breadcrumbLabel =
    slug === "seminai"
      ? "SeminAI"
      : slug === "freelancedev"
        ? "FreelanceDEV"
        : post.title;

  return {
    props: {
      post,
      relatedPosts,
      breadcrumbLabel,
    },
  };
};
