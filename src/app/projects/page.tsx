import { ProjectsGrid } from "@/components/ProjectsGrid";
import { projects } from "@/lib/content";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by vimzh. Full-stack apps, landing pages, developer tools, and open source work.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pt-16 pb-16 md:w-[60%] md:px-4 md:pt-24">
      <h1 className="font-mono text-sm font-medium text-foreground-secondary">
        Projects
      </h1>
      <p className="mt-2 text-sm text-foreground-tertiary">
        Things I&apos;ve built, shipped, or am still hacking on.
      </p>

      <ProjectsGrid projects={projects} />
    </section>
  );
}
