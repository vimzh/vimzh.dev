"use client";

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/kibo-ui/contribution-graph";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { Activity } from "@/components/kibo-ui/contribution-graph";

type GitHubContributionsProps = {
  activities: Activity[];
  totalContributions: number;
};

export const GitHubContributions = ({
  activities,
  totalContributions,
}: GitHubContributionsProps) => {
  if (activities.length === 0) {
    return null;
  }

  return (
    <TooltipProvider>
      <ContributionGraph
        data={activities}
        totalCount={totalContributions}
        blockSize={11}
        blockMargin={3}
        blockRadius={2}
        fontSize={12}
        mobileWeeks={32} // Show only last ~8 months on mobile
        className="w-full [&_svg]:w-full [&_svg]:h-auto"
      >
        <ContributionGraphCalendar>
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger render={<g className="cursor-pointer" />}>
                <ContributionGraphBlock
                  activity={activity}
                  dayIndex={dayIndex}
                  weekIndex={weekIndex}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-semibold">{activity.date}</p>
                <p>
                  {activity.count} contribution
                  {activity.count !== 1 ? "s" : ""}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>
        <ContributionGraphFooter>
          <ContributionGraphTotalCount />
          <ContributionGraphLegend />
        </ContributionGraphFooter>
      </ContributionGraph>
    </TooltipProvider>
  );
};
