import { create } from "zustand";

import { getNextTheme, getTheme, themeIds } from "@/lib/themes";

import type { ThemeDefinition } from "@/lib/themes";

const STORAGE_KEY = "portfolio-theme";

interface ThemeState {
  themeId: string;
  theme: ThemeDefinition;
  cycle: () => void;
  setTheme: (id: string) => void;
  hydrate: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  themeId: "stone",
  theme: getTheme("stone"),

  cycle: () =>
    set((state) => {
      const next = getNextTheme(state.themeId);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, next.id);
      }
      return { themeId: next.id, theme: next };
    }),

  setTheme: (id: string) => {
    const theme = getTheme(id);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, theme.id);
    }
    set({ themeId: theme.id, theme });
  },

  hydrate: () => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEY);

    // Clean stale next-themes values
    if (stored === "light" || stored === "dark" || stored === "system") {
      localStorage.removeItem(STORAGE_KEY);
    }

    const current = localStorage.getItem(STORAGE_KEY);
    let id: string;

    if (current && themeIds.includes(current)) {
      id = current;
    } else {
      id = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "obsidian"
        : "stone";
      localStorage.setItem(STORAGE_KEY, id);
    }

    set({ themeId: id, theme: getTheme(id) });
  },
}));
