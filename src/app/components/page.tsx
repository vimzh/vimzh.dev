import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { components } from "@/lib/content";

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
    <section className="mx-auto w-[60%] max-w-7xl px-4 pt-24 pb-16">
      <h1 className="font-mono text-sm font-medium text-foreground-secondary">
        Components
      </h1>
      <p className="mt-2 text-sm text-foreground-tertiary">
        Reusable UI primitives built with React, Tailwind, and Base UI.
      </p>

      <div className="mt-10 flex flex-col">
        {components.map((component, i) => (
          <Link
            key={component.name}
            href={component.href}
            className="group/row relative flex items-start justify-between gap-6 border-t border-border-subtle py-5 -mx-3 px-3 rounded-lg transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:bg-background hover:border-transparent hover:shadow-md"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tabular-nums text-foreground-tertiary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {component.name}
                </span>
              </div>
              <p className="mt-1.5 pl-8 text-sm leading-relaxed text-foreground-secondary">
                {component.description}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5 pl-8">
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

            <div className="shrink-0 pt-0.5 text-foreground-tertiary opacity-0 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-out)] group-hover/row:opacity-100">
              <ArrowUpRight size={14} />
            </div>
          </Link>
        ))}
        <div className="border-t border-border-subtle" />
      </div>
    </section>
  );
}
