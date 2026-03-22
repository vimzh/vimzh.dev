import type { Activity } from "@/components/kibo-ui/contribution-graph";

const GITHUB_USERNAME = "vimzh";

type GitHubContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
};

type GitHubContributionWeek = {
  contributionDays: GitHubContributionDay[];
};

type GitHubResponse = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: GitHubContributionWeek[];
        };
      };
    };
  };
};

const levelMap: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export const fetchGitHubContributions = async (): Promise<{
  activities: Activity[];
  totalContributions: number;
}> => {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return { activities: [], totalContributions: 0 };
  }

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return { activities: [], totalContributions: 0 };
  }

  const json = (await res.json()) as GitHubResponse;
  const calendar = json.data.user.contributionsCollection.contributionCalendar;

  const allActivities: Activity[] = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: levelMap[day.contributionLevel] ?? 0,
    })),
  );

  // For mobile-friendly display, show only the last ~8 months (32 weeks)
  // instead of the full year to prevent the graph from being too small
  const WEEKS_TO_SHOW = 32; // ~8 months instead of ~12 months (52 weeks)
  const activities = allActivities.slice(-WEEKS_TO_SHOW * 7);

  // Recalculate total contributions for the visible period
  const visibleTotalContributions = activities.reduce(
    (sum, activity) => sum + activity.count,
    0,
  );

  return {
    activities,
    totalContributions: visibleTotalContributions,
  };
};
