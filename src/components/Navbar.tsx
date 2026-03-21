"use client";

import { Github, Search } from "lucide-react";
import Link from "next/link";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useCommandMenu } from "@/stores/commandMenu";

const navLinks = [
  { label: "Projects", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Blog", href: "/blog" },
];

export const Navbar = () => {
  const { open } = useCommandMenu();

  return (
    <div className="pointer-events-none sticky top-0 z-50 w-full">
      {/* Gradient overlay — solid at top, fades to transparent */}
      <div
        className="absolute inset-x-0 top-0 h-20"
        style={{
          background:
            "linear-gradient(to bottom, var(--background) 0%, var(--background) 40%, transparent 100%)",
        }}
      />

      <header className="pointer-events-auto relative z-10">
        <div className="mx-auto flex h-11 w-[60%] max-w-7xl items-center justify-between px-4">
          <Link
            href="/"
            className="font-mono text-[13px] font-semibold text-foreground"
          >
            vimzh.dev
          </Link>

          <div className="flex items-center gap-0.5">
            <nav className="flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2 py-1 text-[13px] font-medium text-foreground-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mx-0.5 h-3.5 w-px bg-border-subtle" />

            <button
              onClick={open}
              className="flex h-7 items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-2.5 text-[13px] text-foreground-tertiary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:border-border hover:text-foreground-secondary"
            >
              <Search size={14} className="shrink-0" />
              <kbd className="pointer-events-none flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-foreground-tertiary">
                <span className="text-xs">&#8984;</span>K
              </kbd>
            </button>

            <a
              href="https://github.com/vimzh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-foreground-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:text-foreground hover:bg-muted"
              aria-label="GitHub"
            >
              <Github size={16} className="shrink-0" />
            </a>

            <ThemeSwitcher />
          </div>
        </div>
      </header>
    </div>
  );
};
