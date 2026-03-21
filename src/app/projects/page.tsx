import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/site";

export default function ProjectsPage() {
  return (
    <section className="mx-auto w-[60%] max-w-7xl px-4 pt-24 pb-16">
      <h1 className="font-mono text-sm font-medium text-foreground-secondary">
        Projects
      </h1>
      <p className="mt-2 text-sm text-foreground-tertiary">
        Things I&apos;ve built, shipped, or am still hacking on.
      </p>

      <div className="mt-6 flex flex-col gap-1">
        {projects.map((project) => (
          <div
            key={project.name}
            className="group/card relative flex items-start justify-between gap-4 rounded-lg border border-transparent px-3 py-3 -mx-3 transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:border-border-subtle hover:bg-background hover:shadow-md"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {project.name}
                </span>
                {project.wip && (
                  <span className="rounded-full bg-warning/10 px-1.5 py-px text-[10px] font-medium text-warning">
                    WIP
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
                {project.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="h-[18px] rounded-sm px-1.5 text-[10px] font-normal text-foreground-tertiary"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1 pt-0.5">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-6 w-6 items-center justify-center rounded-md text-foreground-tertiary transition-colors hover:text-foreground hover:bg-muted"
                  aria-label={`${project.name} on GitHub`}
                >
                  <Github size={14} />
                </Link>
              )}
              {project.url && (
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-6 w-6 items-center justify-center rounded-md text-foreground-tertiary transition-colors hover:text-foreground hover:bg-muted"
                  aria-label={`Visit ${project.name}`}
                >
                  <ExternalLink size={14} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
