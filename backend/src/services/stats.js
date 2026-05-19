import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { prisma } from "../lib/prisma.js";

export const getSeasonStatsByTeamId = async ({ teamId }) => {
  const [statsAgg, matchAgg] = await Promise.all([
    prisma.matchStats.aggregate({
      _sum: {
        goals: true,
        shots_on_goal: true,
        shots_off_goal: true,
        saves: true,
        //fouls: true,
        //two_min_penalties: true,
        red_cards: true,
      },
      where: {
        match: {
          team_id: teamId,
        },
      },
    }),

    prisma.match.aggregate({
      _sum: {
        score_away: true,
      },
      where: {
        team_id: teamId,
      },
    }),
  ]);

  const goals = statsAgg._sum.goals ?? 0;
  const shotsOnGoal = statsAgg._sum.shots_on_goal ?? 0;
  const shotsOffGoal = statsAgg._sum.shots_off_goal ?? 0;
  const saves = statsAgg._sum.saves ?? 0;
  const fouls = statsAgg._sum.fouls ?? 0;
  const twoMin = statsAgg._sum.two_min_penalties ?? 0;
  const redCards = statsAgg._sum.red_cards ?? 0;

  const goalsConceded = matchAgg._sum.score_away ?? 0;

  const totalShotsAgainst = saves + goalsConceded;

  const savePercentage =
    totalShotsAgainst === 0 ? 0 : (saves / totalShotsAgainst) * 100;

  return {
    goals,
    shotsOnGoal,
    shotsOffGoal,
    saves,
    fouls,
    twoMin,
    redCards,
    savePercentage: Number(savePercentage.toFixed(1)),
  };
};
