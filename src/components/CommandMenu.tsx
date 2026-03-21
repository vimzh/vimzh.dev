"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { site } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { useCommandMenu } from "@/stores/commandMenu";

interface CommandItem {
  id: string;
  label: string;
  section: string;
  href: string;
  icon: React.ReactNode;
  keywords?: string[];
}

const navigationItems: CommandItem[] = site.commandMenu.navigation.map(
  (item) => ({
    id: item.id,
    label: item.label,
    section: "Navigation",
    href: item.href,
    icon: (() => {
      const Icon = getIcon(item.icon);
      return <Icon size={16} />;
    })(),
    keywords: item.keywords,
  }),
);

const sectionItems: CommandItem[] = site.commandMenu.sections.map((item) => ({
  id: item.id,
  label: item.label,
  section: "Sections",
  href: item.href,
  icon: (() => {
    const Icon = getIcon(item.icon);
    return <Icon size={16} />;
  })(),
  keywords: item.keywords,
}));

const allItems = [...navigationItems, ...sectionItems];

export const CommandMenu = () => {
  const { isOpen, close } = useCommandMenu();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filtered =
    query.length === 0
      ? allItems
      : allItems.filter((item) => {
          const q = query.toLowerCase();
          return (
            item.label.toLowerCase().includes(q) ||
            item.section.toLowerCase().includes(q) ||
            item.keywords?.some((k) => k.includes(q))
          );
        });

  const sections = filtered.reduce<Record<string, CommandItem[]>>(
    (acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    },
    {},
  );

  const navigate = useCallback(
    (item: CommandItem) => {
      close();
      router.push(item.href);
    },
    [close, router],
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        useCommandMenu.getState().toggle();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((i) => (i + 1) % filtered.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
          break;
        case "Enter":
          e.preventDefault();
          if (filtered[activeIndex]) {
            navigate(filtered[activeIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, activeIndex, navigate, close]);

  useEffect(() => {
    const activeEl = listRef.current?.querySelector("[data-active='true']");
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!isOpen) return null;

  let flatIndex = -1;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={close}
        aria-hidden="true"
      />

      <div className="absolute left-1/2 top-[20%] w-full max-w-[480px] -translate-x-1/2 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="overflow-hidden rounded-lg border border-border-subtle bg-background backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-2 border-b border-border-subtle px-3">
            <Search size={16} className="shrink-0 text-foreground-tertiary" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent py-2.5 text-[13px] text-foreground outline-none placeholder:text-foreground-tertiary"
            />
            <kbd className="pointer-events-none flex items-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-foreground-tertiary">
              ESC
            </kbd>
          </div>

          <div
            ref={listRef}
            className="max-h-[280px] overflow-y-auto overscroll-contain p-1.5"
          >
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-sm text-foreground-tertiary">
                No results found.
              </div>
            ) : (
              Object.entries(sections).map(([section, items]) => (
                <div key={section}>
                  <div className="px-2 pb-1 pt-1.5 text-[11px] font-medium text-foreground-tertiary">
                    {section}
                  </div>
                  {items.map((item) => {
                    flatIndex++;
                    const isActive = flatIndex === activeIndex;
                    const currentIndex = flatIndex;
                    return (
                      <button
                        key={item.id}
                        data-active={isActive}
                        onClick={() => navigate(item)}
                        onMouseEnter={() => setActiveIndex(currentIndex)}
                        className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-[13px] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] ${
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-foreground-secondary hover:text-foreground"
                        }`}
                      >
                        <span
                          className={`shrink-0 ${isActive ? "text-foreground" : "text-foreground-tertiary"}`}
                        >
                          {item.icon}
                        </span>
                        <span className="flex-1">{item.label}</span>
                        {isActive && (
                          <span className="text-xs text-foreground-tertiary">
                            &#8629;
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          <div className="flex items-center gap-3 border-t border-border-subtle px-3 py-1.5">
            <div className="flex items-center gap-1.5 text-xs text-foreground-tertiary">
              <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">
                &#8593;
              </kbd>
              <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">
                &#8595;
              </kbd>
              <span>navigate</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-foreground-tertiary">
              <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">
                &#8629;
              </kbd>
              <span>select</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-foreground-tertiary">
              <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">
                esc
              </kbd>
              <span>close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
