"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type { Project } from "@/lib/content";

const ProjectCard = ({ project }: { project: Project }) => {
  const hasPreview = !!project.preview;

  return (
    <div className="group/card flex flex-col rounded-lg border border-border-subtle bg-surface pt-2.5 px-2.5 pb-4 transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] hover:border-border-strong hover:shadow-md">
      {/* Preview area */}
      <div
        className={cn(
          "relative flex h-48 items-center justify-center overflow-hidden rounded-md border border-border-subtle",
          !hasPreview && project.previewBg,
        )}
      >
        {hasPreview ? (
          <Image
            src={project.preview!}
            alt={`${project.name} preview`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-[4s] ease-[var(--ease-out)] group-hover/card:translate-y-[-20%]"
          />
        ) : (
          <span className="text-xs text-foreground-tertiary select-none">
            {project.name}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 flex items-start justify-between gap-2 px-1.5">
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
        <div className="flex shrink-0 items-center gap-0.5">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-6 w-6 items-center justify-center rounded-md text-foreground-tertiary transition-colors hover:text-foreground hover:bg-muted"
              aria-label={`${project.name} on GitHub`}
            >
              <Github size={13} />
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
              <ExternalLink size={13} />
            </Link>
          )}
        </div>
      </div>

      <p className="mt-1 px-1.5 text-sm leading-relaxed text-foreground-secondary">
        {project.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5 px-1.5">
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
  );
};

export { ProjectCard };
