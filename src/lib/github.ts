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

  const activities: Activity[] = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: levelMap[day.contributionLevel] ?? 0,
    })),
  );

  return {
    activities,
    totalContributions: calendar.totalContributions,
  };
};
