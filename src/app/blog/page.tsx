import Link from "next/link";

import { Badge } from "@/components/ui/badge";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
};

const posts: BlogPost[] = [
  {
    slug: "building-a-contenteditable-from-scratch",
    title: "Building a contentEditable from scratch",
    excerpt:
      "How I replaced a native textarea with a contentEditable div to support inline ghost text, custom caret positioning, and autocomplete overlays without fighting the browser.",
    date: "Mar 12, 2026",
    readingTime: "8 min read",
    tags: ["DOM", "TypeScript", "Browser APIs"],
  },
  {
    slug: "why-i-switched-to-base-ui",
    title: "Why I switched to Base UI",
    excerpt:
      "Radix served me well for years, but the render prop composition model in Base UI finally gave me the control I wanted over styling and behavior without wrapper component bloat.",
    date: "Feb 24, 2026",
    readingTime: "5 min read",
    tags: ["React", "Base UI"],
  },
  {
    slug: "streaming-html-parsing-with-web-streams-api",
    title: "Streaming HTML parsing with Web Streams API",
    excerpt:
      "Piping a fetch() response directly into htmlparser2 using WritableStream — what I learned contributing the WebWritableStream adapter upstream.",
    date: "Feb 8, 2026",
    readingTime: "11 min read",
    tags: ["Web Streams", "Open Source", "Node.js"],
  },
  {
    slug: "my-open-source-contribution-workflow",
    title: "My open source contribution workflow",
    excerpt:
      "The system I use to find meaningful issues, understand unfamiliar codebases quickly, and write PRs that actually get merged — without burning out.",
    date: "Jan 19, 2026",
    readingTime: "6 min read",
    tags: ["Open Source", "Workflow"],
  },
];

export default function BlogPage() {
  return (
    <section className="mx-auto w-[60%] max-w-7xl px-4 pt-24 pb-16">
      <h1 className="font-mono text-sm font-medium text-foreground-secondary">
        Blog
      </h1>

      <div className="mt-6 flex flex-col">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`group block rounded-lg px-3 py-4 -mx-3 transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:bg-background hover:shadow-md hover:border-border-subtle border border-transparent ${
              i !== posts.length - 1
                ? "border-b-border-subtle"
                : ""
            }`}
          >
            <div className="flex items-baseline justify-between gap-4">
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
