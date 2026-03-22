"use client";

import { Github, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { site } from "@/lib/content";
import { useCommandMenu } from "@/stores/commandMenu";

export const Navbar = () => {
  const { open, isOpen } = useCommandMenu();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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

      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        return;
      }

      const link = site.navLinks.find((l) => l.key === e.key.toLowerCase());
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
  }, [router, isOpen, mobileMenuOpen]);

  return (
    <>
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
          <div className="mx-auto flex h-11 w-full max-w-7xl items-center justify-between px-5 md:w-[60%] md:px-4">
            <Link
              href="/"
              className="font-mono text-[13px] font-semibold text-foreground"
            >
              {site.siteName}
            </Link>

            <div className="flex items-center gap-0.5">
              {/* Desktop nav */}
              <nav className="hidden items-center gap-0.5 md:flex">
                {site.navLinks.map((link) => (
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

              <div className="mx-0.5 hidden h-3.5 w-px bg-border-subtle md:block" />

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
                href={site.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-md text-foreground-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:text-foreground hover:bg-muted md:flex"
                aria-label="GitHub"
              >
                <Github size={16} className="shrink-0" />
              </a>

              <span className="hidden md:block">
                <ThemeSwitcher />
              </span>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-secondary transition-colors hover:text-foreground hover:bg-muted md:hidden"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X size={16} className="shrink-0" />
                ) : (
                  <Menu size={16} className="shrink-0" />
                )}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 top-11 animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="mx-5 overflow-hidden rounded-lg border border-border-subtle bg-background/95 backdrop-blur-xl shadow-lg">
              <nav className="flex flex-col p-2">
                {site.navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-medium text-foreground-secondary transition-colors active:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center justify-between border-t border-border-subtle px-3 py-2.5">
                <div className="flex items-center gap-1">
                  <a
                    href={site.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-secondary transition-colors hover:text-foreground"
                    aria-label="GitHub"
                  >
                    <Github size={16} />
                  </a>
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
