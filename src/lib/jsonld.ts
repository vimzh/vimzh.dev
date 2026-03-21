import { site } from "@/lib/content";

import type { BlogPostMeta } from "@/lib/blog";

export const personJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: [site.siteName, "vimzh.dev"],
  url: site.url,
  email: site.email,
  jobTitle: site.roles[0],
  description: site.description,
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "AI",
    "LLMs",
    "Open Source",
    "Full-stack Development",
  ],
  sameAs: site.socials
    .filter((s) => s.href !== "https://discord.com")
    .map((s) => s.href),
  image: `${site.url}${site.profileImage}`,
});

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.siteName,
  alternateName: site.name,
  url: site.url,
  description: site.description,
  author: {
    "@type": "Person",
    name: site.name,
    url: site.url,
  },
});

export const blogPostJsonLd = (post: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  datePublished: post.date,
  author: {
    "@type": "Person",
    name: site.name,
    url: site.url,
  },
  url: `${site.url}/blog/${post.slug}`,
  keywords: post.tags?.join(", "),
  publisher: {
    "@type": "Person",
    name: site.name,
  },
});

export const blogListJsonLd = (posts: BlogPostMeta[]) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${site.name}'s Blog`,
  url: `${site.url}/blog`,
  author: {
    "@type": "Person",
    name: site.name,
    url: site.url,
  },
  blogPost: posts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${site.url}/blog/${post.slug}`,
  })),
});
