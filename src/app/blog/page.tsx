import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/blog";
import { blogListJsonLd } from "@/lib/jsonld";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles by vimzh about full-stack development, AI, open source, and building for the web.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pt-16 pb-16 md:w-[60%] md:px-4 md:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogListJsonLd(posts)),
        }}
      />
      <h1 className="font-mono text-sm font-medium text-foreground-secondary">
        Blog
      </h1>

      <div className="mt-6 flex flex-col">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`group block rounded-lg px-3 py-4 -mx-3 transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:bg-background hover:shadow-md hover:border-border-subtle border border-transparent ${
              i !== posts.length - 1 ? "border-b-border-subtle" : ""
            }`}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h2 className="text-sm font-medium text-foreground group-hover:text-foreground transition-colors">
                {post.title}
              </h2>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs text-foreground-tertiary">
                  {post.readingTime}
                </span>
                <span className="text-xs text-foreground-tertiary">
                  {post.date}
                </span>
              </div>
            </div>

            <p className="mt-1.5 text-sm text-foreground-secondary line-clamp-2">
              {post.excerpt}
            </p>

            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="h-[18px] rounded-sm px-1.5 text-[10px] font-normal text-foreground-tertiary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
