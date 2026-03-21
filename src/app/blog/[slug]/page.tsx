import { notFound } from "next/navigation";

import { getPostSlugs } from "@/lib/blog";
import { site } from "@/lib/content";
import { blogPostJsonLd } from "@/lib/jsonld";

import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = await import(`@/content/blog/${slug}.mdx`);
    return {
      title: meta.title,
      description: meta.excerpt,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: meta.title,
        description: meta.excerpt,
        type: "article",
        publishedTime: meta.date,
        url: `${site.url}/blog/${slug}`,
        authors: [site.name],
        tags: meta.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.excerpt,
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const { default: Post, meta } = await import(`@/content/blog/${slug}.mdx`);

    return (
      <article className="mx-auto w-[60%] max-w-7xl px-4 pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              blogPostJsonLd({
                title: meta.title,
                excerpt: meta.excerpt,
                date: meta.date,
                slug,
                tags: meta.tags,
              }),
            ),
          }}
        />
        <header className="mb-8">
          <h1 className="font-mono text-2xl font-semibold tracking-tight text-foreground">
            {meta.title}
          </h1>
          <p className="mt-2 text-sm text-foreground-tertiary">
            {new Date(meta.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </header>
        <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none [&>h2]:font-mono [&>h2]:text-base [&>h2]:font-medium [&>h2]:mt-8 [&>h2]:mb-3 [&>h3]:font-mono [&>h3]:text-sm [&>h3]:font-medium [&>p]:text-sm [&>p]:leading-relaxed [&>p]:text-foreground-secondary [&>ul]:text-sm [&>ul]:text-foreground-secondary [&>ol]:text-sm [&>ol]:text-foreground-secondary [&>blockquote]:border-border-subtle [&>blockquote]:text-foreground-secondary [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border-subtle [&_a]:underline-offset-2 hover:[&_a]:decoration-foreground-tertiary [&_strong]:text-foreground prose-pre:bg-transparent prose-pre:border-0 prose-pre:p-0 prose-pre:m-0 prose-code:before:content-none prose-code:after:content-none">
          <Post />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
