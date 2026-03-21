import { AboutSection } from "@/components/sections/AboutSection";
import { ContributionsSection } from "@/components/sections/ContributionsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { OpenSourceSection } from "@/components/sections/OpenSourceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { fetchGitHubContributions } from "@/lib/github";

export default async function Home() {
  const { activities, totalContributions } = await fetchGitHubContributions();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ContributionsSection
        activities={activities}
        totalContributions={totalContributions}
      />
      <OpenSourceSection />
      <ProjectsSection />
    </>
  );
}
