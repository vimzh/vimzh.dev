"use client";

import Link from "next/link";

import { Icons } from "@/components/Icons";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useCommandMenu } from "@/stores/commandMenu";

const navLinks = [
  { label: "Portfolio", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Blog", href: "/blog" },
];

export const Navbar = () => {
  const { open } = useCommandMenu();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-background/80 backdrop-blur-sm">
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
                className="rounded-md px-2 py-1 text-[13px] font-medium text-foreground-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:text-foreground hover:bg-muted"
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
            <Icons.search className="shrink-0" />
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
            <Icons.github className="shrink-0" />
          </a>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};
