import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { experiences } from "@/lib/content";

export const ExperienceSection = () => (
  <section className="mx-auto w-full max-w-7xl px-5 pb-16 md:w-[60%] md:px-4">
    <Link
      href="/experience"
      className="group inline-flex w-fit items-center gap-1.5 transition-colors"
    >
      <h2 className="font-mono text-sm font-medium text-foreground-secondary group-hover:text-foreground transition-colors">
        Shipping at
      </h2>
      <ArrowRight
        size={14}
        className="text-foreground-tertiary opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-foreground"
      />
    </Link>
    <div className="mt-3 flex flex-col gap-4">
      {experiences.map((exp) => (
        <div key={exp.company} className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <p
              className={`text-sm font-medium text-foreground ${exp.blurred ? "blur-[5px] select-none pointer-events-none" : ""}`}
              aria-hidden={exp.blurred || undefined}
            >
              {exp.company}
            </p>
            <p className="mt-0.5 text-sm text-foreground-secondary">
              {exp.role}
            </p>
            {exp.tags && exp.tags.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="h-[18px] rounded-sm px-1.5 text-[10px] font-normal text-foreground-tertiary"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="shrink-0 sm:text-right">
            <p className="text-xs text-foreground-secondary">{exp.period}</p>
            <p className="mt-0.5 text-xs text-foreground-tertiary">
              {exp.location}
            </p>
          </div>
        </div>
      ))}
    </div>

    <Link
      href="/experience"
      className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs text-foreground-tertiary transition-colors hover:text-foreground-secondary"
    >
      Details
      <ArrowRight size={12} />
    </Link>
  </section>
);
