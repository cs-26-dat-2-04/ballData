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

export const getMatchStatsByPlayerId = async (playerId, coachId) => {
  const player = await prisma.player.findUnique({
    where: { id: playerId },
    include: { team: true },
  });

  if (!player) {
    const error = new Error("Spiller ikke fundet");
    error.status = 404;
    throw error;
  }

  if (player.team.coach_id !== coachId) {
    const error = new Error("Du har ikke adgang til denne spiller");
    error.status = 403;
    throw error;
  }

  const stats = await prisma.matchStats.findMany({
    where: { player_id: playerId },
    include: { match: true },
    orderBy: { match: { match_date: "desc" } },
  });

  return stats.map((s) => ({
    matchId:       s.match_id,
    opponent:      s.match.opponent,
    matchDate:     s.match.match_date,
    scoreHome:     s.match.score_home,
    scoreAway:     s.match.score_away,
    goals:         s.goals,
    assists:       s.assists,
    shots:         s.shots_on_goal + s.shots_off_goal,
    suspension:    s.yellow_cards * 2,
    redCards:      s.red_cards,
    minutesPlayed: s.minutes_played,
  }));
};