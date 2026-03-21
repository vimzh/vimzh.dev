"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import type { Project } from "@/lib/content";

const ProjectCard = ({ project }: { project: Project }) => {
  const hasPreview = !!project.preview;

  return (
    <div className="group/card flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] hover:border-border-strong hover:shadow-lg">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-border-subtle bg-surface-sunken/50 px-3.5 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="block h-[7px] w-[7px] rounded-full bg-foreground-tertiary/30" />
          <span className="block h-[7px] w-[7px] rounded-full bg-foreground-tertiary/30" />
          <span className="block h-[7px] w-[7px] rounded-full bg-foreground-tertiary/30" />
        </div>
        {project.url && (
          <span className="ml-1.5 truncate font-mono text-[10px] text-foreground-tertiary/60 transition-colors duration-[var(--duration-fast)] group-hover/card:text-foreground-tertiary">
            {project.url.replace(/^https?:\/\//, "")}
          </span>
        )}
      </div>

      {/* Preview area */}
      <div className="relative aspect-[16/10] overflow-hidden">
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
            {/* Grid pattern overlay */}
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

            {/* Project initial */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[72px] font-extralight tracking-tighter text-white/[0.06] transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover/card:text-white/[0.1] group-hover/card:tracking-normal select-none">
                {project.name}
              </span>
            </div>

            {/* Subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }} />
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
        <div className="flex items-start justify-between gap-2">
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
                onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={13} />
              </Link>
            )}
          </div>
        </div>

        <p className="mt-1.5 text-[13px] leading-relaxed text-foreground-secondary">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
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
    </div>
  );
};

export { ProjectCard };
