import { Suspense } from "react";

import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { OpenSourceSection } from "@/components/sections/OpenSourceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

import { ContributionsLoader } from "@/components/sections/ContributionsLoader";
import { personJsonLd, websiteJsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personJsonLd(), websiteJsonLd()]),
        }}
      />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <Suspense
        fallback={
          <section className="mx-auto w-[60%] max-w-7xl px-4 pb-24">
            <h2 className="font-mono text-sm font-medium text-foreground-secondary">
              Contributions
            </h2>
            <div className="mt-3 h-[140px] animate-pulse rounded-lg bg-muted" />
          </section>
        }
      >
        <ContributionsLoader />
      </Suspense>
      <OpenSourceSection />
      <ProjectsSection />
    </>
  );
}
