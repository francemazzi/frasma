export type BlogPostStatus = "draft" | "published";

export type BlogPostFrontmatter = {
  slug: string;
  title: string;
  excerpt: string;
  seoTitle?: string;
  seoDescription?: string;
  coverImage?: string;
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
  status?: BlogPostStatus;
};

export type BlogPostSummary = BlogPostFrontmatter & {
  slug: string;
};

export type BlogPost = BlogPostSummary & {
  content: string;
  htmlContent: string;
};
