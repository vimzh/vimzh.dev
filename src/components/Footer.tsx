"use client";

import { socials } from "@/data/site";
import { useContactDialog } from "@/stores/contactDialog";

export const Footer = () => {
  const { open } = useContactDialog();

  return (
    <footer className="relative z-10 pb-20 pt-8">
      <div className="mx-auto w-[60%] max-w-7xl px-4">
        <div className="border-t border-border-subtle pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-foreground-tertiary">
                built with love by vimzh
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
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-tertiary transition-colors hover:text-foreground"
                  aria-label={social.label}
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
