"use client";

import { useCallback, useState } from "react";

import { Check, Copy, FileText } from "lucide-react";
import Image from "next/image";
import { WordRotate } from "@/components/magicui/word-rotate";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { site } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { useResumeDialog } from "@/stores/resumeDialog";

export const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { open: openResume } = useResumeDialog();

  const onImgLoad = useCallback(() => setImgLoaded(true), []);

  const copyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="flex flex-col items-start gap-6 py-16 mx-auto w-full max-w-7xl px-5 md:flex-row md:items-center md:gap-8 md:py-24 md:w-[60%] md:px-4">
      <div className="shrink-0">
        <Image
          src={site.profileImage}
          alt={`${site.name}, ${site.roles[0]}`}
          width={120}
          height={120}
          className={`h-20 w-20 rounded-full ring-1 ring-border-subtle ring-offset-4 ring-offset-background transition-opacity duration-500 ease-out md:h-[120px] md:w-[120px] ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          unoptimized
          onLoad={onImgLoad}
        />
      </div>
      <div>
        <p className="font-mono text-[10px] tracking-wide text-foreground-tertiary/70 mb-2 select-none">
          <span className="dark:hidden">#f7f4f0 #1a1612 #5c5549</span>
          <span className="hidden dark:inline">#111010 #ede9e4 #a8a19a</span>
        </p>
        <h1 className="font-mono text-2xl font-semibold tracking-tight leading-none md:text-3xl">
          Hey, I&apos;m <span className="text-primary">{site.name}</span>
        </h1>
        <WordRotate
          words={site.roles}
          className="text-sm text-foreground-secondary mt-1.5"
          duration={2500}
        />
        <span className="sr-only">
          {site.roles.join(", ")}
        </span>
        <div className="mt-2 flex items-center gap-1.5">
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-foreground-secondary transition-colors hover:text-foreground"
          >
            {site.displayEmail}
          </a>
          <button
            onClick={copyEmail}
            className="inline-flex h-6 w-6 items-center justify-center rounded-md text-foreground-tertiary transition-colors hover:text-foreground hover:bg-muted"
            aria-label="Copy email"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        <div className="mt-3 flex items-center gap-1">
          <button
            onClick={openResume}
            className="mr-1 inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground-secondary transition-colors hover:border-border hover:text-foreground"
          >
            <FileText size={12} />
            Resume
          </button>
          <span className="mr-1 h-3.5 w-px bg-border-subtle" />
          {site.socials.map((social) => {
            const Icon = getIcon(social.icon);
            return (
              <Tooltip key={social.label}>
                <TooltipTrigger
                  render={
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-tertiary transition-colors hover:text-foreground"
                      aria-label={social.label}
                    />
                  }
                >
                  <Icon size={15} />
                </TooltipTrigger>
                <TooltipContent side="bottom">{social.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-foreground-secondary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          {site.status}
        </div>
      </div>
    </section>
  );
};
