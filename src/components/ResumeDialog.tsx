"use client";

import { Download } from "lucide-react";
import { useEffect } from "react";

import { site } from "@/lib/content";
import { useResumeDialog } from "@/stores/resumeDialog";

export const ResumeDialog = () => {
  const { isOpen, close } = useResumeDialog();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={close}
        aria-hidden="true"
      />

      <div className="absolute inset-x-4 top-[5%] mx-auto max-w-[560px] animate-in fade-in slide-in-from-top-2 duration-200 sm:inset-x-auto sm:left-1/2 sm:top-[8%] sm:w-full sm:-translate-x-1/2">
        <div className="overflow-hidden rounded-lg border border-border-subtle bg-background/60 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between border-b border-border-subtle px-3 py-2.5">
            <span className="text-sm font-medium text-foreground sm:text-[13px]">
              Resume
            </span>
            <button
              onClick={close}
              className="flex items-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-foreground-tertiary sm:pointer-events-none"
            >
              ESC
            </button>
          </div>

          {/* PDF preview — hidden on mobile where iframes render poorly */}
          <div className="hidden p-3 sm:block">
            <div className="overflow-hidden rounded-md border border-border-subtle bg-surface">
              <iframe
                src={`${site.resumePath}#toolbar=0&navpanes=0&scrollbar=0`}
                className="h-[65vh] w-full"
                title="Resume preview"
              />
            </div>
          </div>

          {/* Mobile: simplified view with download prompt */}
          <div className="flex flex-col items-center gap-4 p-6 sm:hidden">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border-subtle bg-surface">
              <Download size={24} className="text-foreground-tertiary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Resume PDF</p>
              <p className="mt-1 text-xs text-foreground-tertiary">
                Tap below to download or view
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border-subtle px-3 py-2.5 sm:py-2">
            <span className="hidden text-xs text-foreground-tertiary sm:inline">
              PDF preview
            </span>
            <a
              href={site.resumePath}
              download
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-foreground px-4 py-2.5 text-[13px] font-medium text-foreground-inverse transition-opacity hover:opacity-80 sm:w-auto sm:px-3 sm:py-1.5 sm:text-[12px]"
            >
              <Download size={12} />
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
