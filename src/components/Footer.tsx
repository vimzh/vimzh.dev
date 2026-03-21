"use client";

import { site } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { useContactDialog } from "@/stores/contactDialog";

export const Footer = () => {
  const { open } = useContactDialog();

  return (
    <footer className="relative z-10 pb-20 pt-8">
      <div className="mx-auto w-full max-w-7xl px-5 md:w-[60%] md:px-4">
        <div className="border-t border-border-subtle pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-foreground-tertiary">
                {site.footer}
              </span>
              <span className="h-3 w-px bg-border-subtle" />
              <button
                onClick={open}
                className="rounded-full border border-border-subtle bg-surface px-3 py-1 font-mono text-xs text-foreground-secondary transition-colors hover:border-border hover:text-foreground"
              >
                let&apos;s talk
              </button>
            </div>

            <div className="flex items-center gap-1">
              {site.socials.map((social) => {
                const Icon = getIcon(social.icon);
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-tertiary transition-colors hover:text-foreground"
                    aria-label={social.label}
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
