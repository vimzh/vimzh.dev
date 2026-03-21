"use client";

import { site } from "@/lib/content";
import { useContactDialog } from "@/stores/contactDialog";

export const AboutSection = () => {
  const { open } = useContactDialog();

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-16 md:w-[60%] md:px-4">
      <h2 className="font-mono text-sm font-medium text-foreground-secondary">
        About
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
        {site.about}{" "}
        <button
          onClick={open}
          className="inline appearance-none border-none bg-transparent p-0 text-foreground underline decoration-border-subtle underline-offset-2 transition-colors hover:decoration-foreground-tertiary cursor-pointer"
        >
          let&apos;s talk
        </button>
        .
      </p>
    </section>
  );
};
