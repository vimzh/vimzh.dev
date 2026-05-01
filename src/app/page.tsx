import { Suspense } from "react";

import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { OpenSourceSection } from "@/components/sections/OpenSourceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

import { ContributionsLoader } from "@/components/sections/ContributionsLoader";
import { personJsonLd, websiteJsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd()),
        }}
      />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <Suspense
        fallback={
          <section className="mx-auto w-full max-w-7xl px-5 pb-24 md:w-[60%] md:px-4">
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
