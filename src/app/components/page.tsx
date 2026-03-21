import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { components } from "@/lib/content";
import { cn } from "@/lib/utils";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Reusable UI components by vimzh, built with React, Tailwind, and Base UI.",
  alternates: {
    canonical: "/components",
  },
};

export default function ComponentsPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pt-16 pb-16 md:w-[60%] md:px-4 md:pt-24">
      <h1 className="font-mono text-sm font-medium text-foreground-secondary">
        Components
      </h1>
      <p className="mt-2 text-sm text-foreground-tertiary">
        Reusable UI primitives built with React, Tailwind, and Base UI.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {components.map((component) => (
          <div
            key={component.name}
            className="group/card flex flex-col rounded-lg border border-transparent p-4 transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:border-border-subtle hover:bg-background hover:shadow-md"
          >
            <div
              className={cn(
                "flex h-28 items-center justify-center rounded-md border border-border-subtle",
                component.previewBg,
              )}
            >
              <span className="text-xs text-foreground-tertiary select-none">
                {component.name}
              </span>
            </div>

            <div className="mt-3 flex items-start justify-between gap-2">
              <span className="text-sm font-medium text-foreground">
                {component.name}
              </span>
              <Link
                href={component.href}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-foreground-tertiary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:text-foreground"
                aria-label={`View ${component.name}`}
              >
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
              {component.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {component.tags.map((tag) => (
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
        ))}
      </div>
    </section>
  );
}
