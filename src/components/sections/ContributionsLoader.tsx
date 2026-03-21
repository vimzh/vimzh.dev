import { fetchGitHubContributions } from "@/lib/github";
import { ContributionsSection } from "./ContributionsSection";

export const ContributionsLoader = async () => {
  const { activities, totalContributions } = await fetchGitHubContributions();

  return (
    <ContributionsSection
      activities={activities}
      totalContributions={totalContributions}
    />
  );
};
