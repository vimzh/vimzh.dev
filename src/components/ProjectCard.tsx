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
    <div className="group/card flex flex-col rounded-lg border border-transparent p-4 transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:border-border-subtle hover:bg-background hover:shadow-md">
      {/* Preview area */}
      <div
        className={cn(
          "relative flex h-44 items-center justify-center overflow-hidden rounded-md border border-border-subtle",
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
          <div
            className="absolute inset-0 transition-transform duration-[3s] ease-[var(--ease-out)] group-hover/card:scale-105"
            style={{
              background: `linear-gradient(145deg, ${project.gradient[0]}, ${project.gradient[1]})`,
            }}
          >
            <svg
              className="absolute inset-0 h-full w-full opacity-[0.04]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id={`grid-${project.name}`}
                  width="32"
                  height="32"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 32 0 L 0 0 0 32"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${project.name})`} />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[72px] font-extralight tracking-tighter text-white/[0.06] transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover/card:text-white/[0.1] group-hover/card:tracking-normal select-none">
                {project.name}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 flex items-start justify-between gap-2">
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

      <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
        {project.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
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
