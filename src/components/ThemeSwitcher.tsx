"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/switch.mp3");
    audioRef.current.volume = 0.5;
  }, []);

  const handleToggle = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

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
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {resolvedTheme === "dark" ? (
        <Sun size={16} className="shrink-0" />
      ) : (
        <Moon size={16} className="shrink-0" />
      )}
    </button>
  );
};
