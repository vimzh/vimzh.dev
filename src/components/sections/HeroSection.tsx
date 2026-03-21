"use client";

import { useState } from "react";

import { Check, Copy } from "lucide-react";
import Image from "next/image";
import { WordRotate } from "@/components/magicui/word-rotate";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EMAIL, socials } from "@/data/site";

export const HeroSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="flex items-center gap-8 py-24 mx-auto w-[60%] max-w-7xl px-4">
      <div className="shrink-0">
        <Image
          src="/pfp.gif"
          alt="Profile picture"
          width={120}
          height={120}
          className="rounded-full ring-1 ring-border-subtle ring-offset-4 ring-offset-background"
          unoptimized
        />
      </div>
      <div>
        <div className="flex items-center gap-3">
          <h1 className="font-mono text-3xl font-semibold tracking-tight leading-none">
            Hey, I&apos;m <span className="text-primary">vimzh</span>
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-2.5 py-1 text-[11px] text-foreground-secondary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Open to freelance
          </span>
        </div>
        <WordRotate
          words={["Fullstack Engineer", "AI Engineer", "Opensource Contributor"]}
          className="text-sm text-foreground-secondary mt-1.5"
          duration={2500}
        />
        <div className="mt-2 flex items-center gap-1.5">
          <a
            href={`mailto:${EMAIL}`}
            className="text-sm text-foreground-secondary transition-colors hover:text-foreground"
          >
            hi@vimzh.dev
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
          {socials.map((social) => (
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
                <social.icon size={15} />
              </TooltipTrigger>
              <TooltipContent side="bottom">{social.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </section>
  );
};
