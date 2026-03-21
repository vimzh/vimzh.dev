import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/content";

export const ProjectsSection = () => (
  <section className="mx-auto w-[60%] max-w-7xl px-4 pb-16">
    <Link
      href="/projects"
      className="group inline-flex items-center gap-1.5 transition-colors"
    >
      <h2 className="font-mono text-sm font-medium text-foreground-secondary group-hover:text-foreground transition-colors">
        Projects
      </h2>
      <ArrowRight
        size={14}
        className="text-foreground-tertiary opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-foreground"
      />
    </Link>

    <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {projects.slice(0, 4).map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>

    <Link
      href="/projects"
      className="mt-6 inline-flex items-center gap-1.5 text-xs text-foreground-tertiary transition-colors hover:text-foreground-secondary"
    >
      View all projects
      <ArrowRight size={12} />
    </Link>
  </section>
);
