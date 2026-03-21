import { GitMerge, GitPullRequest, CircleDot, Star } from "lucide-react";
import Link from "next/link";

import { openSourceContributions } from "@/lib/content";

import type { OpenSourceContribution } from "@/lib/content";

const statusStyles: Record<OpenSourceContribution["status"], string> = {
  merged: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  open: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  closed: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const statusLabels: Record<OpenSourceContribution["status"], string> = {
  merged: "Merged",
  open: "Open",
  closed: "Closed",
};

const TypeIcon = ({ type }: { type: OpenSourceContribution["type"] }) => {
  switch (type) {
    case "pr":
      return <GitPullRequest size={14} className="shrink-0" />;
    case "issue":
      return <CircleDot size={14} className="shrink-0" />;
    case "maintainer":
      return <GitMerge size={14} className="shrink-0" />;
  }
};

export const OpenSourceSection = () => {
  if (openSourceContributions.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-[60%] max-w-7xl px-4 pb-16">
      <h2 className="font-mono text-sm font-medium text-foreground-secondary">
        Open Source
      </h2>
      <div className="mt-3 flex flex-col gap-3">
        {openSourceContributions.map((contrib) => (
          <div
            key={contrib.url}
            className="flex items-start justify-between gap-4 px-3 py-2.5 -mx-3"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <div
                className={`mt-0.5 ${contrib.status === "merged" ? "text-purple-600 dark:text-purple-400" : "text-foreground-tertiary"}`}
              >
                <TypeIcon type={contrib.type} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-foreground-tertiary">
                    {contrib.owner}/
                  </span>
                  {contrib.npm ? (
                    <Link
                      href={contrib.npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground underline decoration-border-subtle underline-offset-2 transition-colors hover:decoration-foreground-tertiary"
                    >
                      {contrib.repo}
                    </Link>
                  ) : (
                    <span className="text-sm font-medium text-foreground">
                      {contrib.repo}
                    </span>
                  )}
                  {contrib.stars && (
                    <span className="inline-flex items-center gap-0.5 text-xs text-foreground-secondary">
                      <Star
                        size={11}
                        className="fill-foreground-tertiary text-foreground-tertiary"
                      />
                      {contrib.stars}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-foreground-secondary truncate">
                  {contrib.description}
                </p>
              </div>
            </div>

            <span
              className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyles[contrib.status]}`}
            >
              {statusLabels[contrib.status]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
