"use client";

import { useContactDialog } from "@/stores/contactDialog";

export const AboutSection = () => {
  const { open } = useContactDialog();

  return (
    <section className="mx-auto w-[60%] max-w-7xl px-4 pb-16">
      <h2 className="font-mono text-sm font-medium text-foreground-secondary">
        About
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
        I&apos;m a full-stack developer obsessed with AI and clean, minimal
        interfaces. I love building things from scratch, figuring out hard
        problems and shipping fast. Most of my time goes into writing code,
        contributing to open source and exploring what&apos;s possible with LLMs.
        Always open to interesting projects and collaborations, if you&apos;re
        working on something cool{" "}
        <button
          onClick={open}
          className="inline text-foreground underline decoration-border-subtle underline-offset-2 transition-colors hover:decoration-foreground-tertiary"
        >
          let&apos;s talk
        </button>
        .
      </p>
    </section>
  );
};
