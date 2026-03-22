"use client";

import { useState } from "react";

import { ProjectCard } from "@/components/ProjectCard";
import { cn } from "@/lib/utils";

import type { Project, ProjectCategory } from "@/lib/content";

const filters: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "fullstack", label: "Web" },
  { key: "ai", label: "AI" },
  { key: "apps", label: "Apps" },
  { key: "frontend", label: "Landing Pages" },
];

const ProjectsGrid = ({ projects }: { projects: Project[] }) => {
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Filter tabs */}
      <div className="mt-8 flex items-center gap-1 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={cn(
              "rounded-md px-2.5 py-1 font-mono text-xs transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]",
              active === key
                ? "bg-foreground text-foreground-inverse"
                : "text-foreground-tertiary hover:text-foreground-secondary hover:bg-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-foreground-tertiary">
          No projects in this category yet.
        </p>
      )}
    </>
  );
};

export { ProjectsGrid };
