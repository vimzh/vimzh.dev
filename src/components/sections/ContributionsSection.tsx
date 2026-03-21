import { GitHubContributions } from "@/components/GitHubContributions";

import type { Activity } from "@/components/kibo-ui/contribution-graph";

type ContributionsSectionProps = {
  activities: Activity[];
  totalContributions: number;
};

export const ContributionsSection = ({
  activities,
  totalContributions,
}: ContributionsSectionProps) => (
  <section className="relative mx-auto w-[60%] max-w-7xl px-4 pb-24">
    {/* Background mask — fades out the dot grid behind the graph */}
    <div
      className="pointer-events-none absolute -inset-x-8 -inset-y-4 -z-1 rounded-2xl"
      style={{
        background:
          "radial-gradient(ellipse 100% 100% at center, var(--background) 50%, transparent 100%)",
      }}
    />
    <h2 className="font-mono text-sm font-medium text-foreground-secondary">
      Contributions
    </h2>
    <div className="mt-3">
      <GitHubContributions
        activities={activities}
        totalContributions={totalContributions}
      />
    </div>
  </section>
);
