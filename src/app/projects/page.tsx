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
    <section className="mx-auto w-[60%] max-w-7xl px-4 pt-24 pb-16">
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
