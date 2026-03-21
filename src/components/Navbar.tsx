"use client";

import { Github, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useCommandMenu } from "@/stores/commandMenu";

const navLinks = [
  { label: "Projects", href: "/", key: "p" },
  { label: "Components", href: "/components", key: "c" },
  { label: "Blog", href: "/blog", key: "b" },
];

export const Navbar = () => {
  const { open, isOpen } = useCommandMenu();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        isOpen ||
        (e.target as HTMLElement).tagName === "INPUT" ||
        (e.target as HTMLElement).tagName === "TEXTAREA" ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      const link = navLinks.find((l) => l.key === e.key.toLowerCase());
      if (link) {
        e.preventDefault();
        router.push(link.href);
        return;
      }

      if (e.key.toLowerCase() === "h") {
        e.preventDefault();
        router.push("/");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router, isOpen]);

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
                  className="group/nav flex items-center gap-1 px-2 py-1 text-[13px] font-medium text-foreground-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:text-foreground"
                >
                  {link.label}
                  <kbd className="rounded border border-border bg-muted px-1 py-px font-mono text-[9px] text-foreground-tertiary opacity-0 transition-opacity group-hover/nav:opacity-100">
                    {link.key.toUpperCase()}
                  </kbd>
                </Link>
              ))}
            </nav>

            <div className="mx-0.5 h-3.5 w-px bg-border-subtle" />

            <button
              onClick={open}
              className="flex h-7 items-center gap-2 rounded-full border border-border-subtle bg-surface pl-2.5 pr-1.5 text-foreground-tertiary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:border-border hover:text-foreground-secondary"
            >
              <Search size={13} className="shrink-0" />
              <span className="pointer-events-none flex items-center gap-px">
                <kbd className="flex h-[18px] min-w-[18px] items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[10px] font-medium text-foreground-tertiary">
                  &#8984;
                </kbd>
                <kbd className="flex h-[18px] min-w-[18px] items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[10px] font-medium text-foreground-tertiary">
                  K
                </kbd>
              </span>
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
