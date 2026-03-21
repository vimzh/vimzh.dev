"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    audioRef.current = new Audio("/sounds/switch.mp3");
    audioRef.current.volume = 0.5;
  }, []);

  const handleToggle = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  if (!mounted) {
    return (
      <button
        className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-secondary"
        aria-label="Toggle theme"
      >
        <span className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-foreground-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:text-foreground hover:bg-muted"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun size={16} className="shrink-0" /> : <Moon size={16} className="shrink-0" />}
    </button>
  );
};
