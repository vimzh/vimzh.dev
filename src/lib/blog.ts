import fs from "node:fs";
import path from "node:path";

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

const computeReadingTime = (content: string): string => {
  const body = content.replace(
    /export\s+const\s+meta\s*=\s*\{[\s\S]*?\};\s*/m,
    "",
  );
  const words = body.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

const formatDate = (iso: string): string => {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getAllPosts = async (): Promise<BlogPostMeta[]> => {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts: BlogPostMeta[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const mod = await import(`@/content/blog/${slug}.mdx`);
    const meta = mod.meta;

    posts.push({
      slug,
      title: meta.title,
      excerpt: meta.excerpt,
      date: formatDate(meta.date),
      readingTime: computeReadingTime(raw),
      tags: meta.tags,
    });
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
};

export const getPostSlugs = (): string[] => {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
};
