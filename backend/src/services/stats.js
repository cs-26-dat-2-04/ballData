import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { prisma } from "../lib/prisma.js";

export const getSeasonStatsByTeamId = async ({ teamId }) => {
  const stats = await prisma.matchStats.aggregate({
    _sum: {
      goals: true,
      shots_on_goal: true,
      shots_off_goal: true,
      saves: true,
      yellow_cards: true,
      //two_min_penalties: true,
      red_cards: true,
    },
    where: {
      match: {
        id: teamId,
      },
    },
  });

  return {
    goals: stats._sum.goals ?? 0,
    shotsOnGoal: stats._sum.shots_on_goal ?? 0,
    shotsOffGoal: stats._sum.shots_off_goal ?? 0,
    saves: stats._sum.saves ?? 0,
    fouls: stats._sum.fouls ?? 0,
    twoMin: stats._sum.two_min_penalties ?? 0,
    redCards: stats._sum.red_cards ?? 0,
  };
};
