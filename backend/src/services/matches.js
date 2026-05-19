import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { prisma } from "../lib/prisma.js";

export const getMatchesByTeam = async (teamId, coachId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
  });

  if (!team) {
    const error = new Error("Hold ikke fundet");
    error.status = 404;
    throw error;
  }

  if (team.coach_id !== coachId) {
    const error = new Error("Du har ikke adgang til dette hold");
    error.status = 403;
    throw error;
  }

  const matches = await prisma.match.findMany({
    where: { team_id: teamId },
    orderBy: { match_date: "desc" },
  });
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false 
  });
  
  for (let m of matches) {
    m.match_date = formatter.format(m.match_date);
  }
  return matches;
};

export const createMatch = async (teamId, coachId, data) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
  });

  if (!team) {
    const error = new Error("Hold ikke fundet");
    error.status = 404;
    throw error;
  }

  if (team.coach_id !== coachId) {
    const error = new Error("Du har ikke adgang til dette hold");
    error.status = 403;
    throw error;
  }

  const match = await prisma.match.create({
    data: {
      team_id: teamId,
      ...data,
    },
  });

  return match;
};

export const getMatchById = async (matchId, coachId) => {
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: {
      team: true,
      matchStats: {
        include: {
          player: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              jersey_number: true,
            },
          },
        },
        orderBy: { player: { jersey_number: "asc" } },
      },
    },
  });

  if (!match) {
    const error = new Error("Kamp ikke fundet");
    error.status = 404;
    throw error;
  }

  if (match.team.coach_id !== coachId) {
    const error = new Error("Du har ikke adgang til denne kamp");
    error.status = 403;
    throw error;
  }

  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false 
  });
  

  match.match_date = formatter.format(match.match_date);

  return match;
};

export const getStatsByMatch = async (matchId, coachId) => {
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: { team: true },
  });

  if (!match) {
    const error = new Error("Match ikke fundet");
    error.status = 404;
    throw error;
  }

  if (match.team.coach_id !== coachId) {
    const error = new Error("Du har ikke adgang til dette match");
    error.status = 403;
    throw error;
  }

  const matchStats = await prisma.matchStats.findMany({
    where: { match_id: matchId },
    include: {
      player: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          jersey_number: true,
        },
      },
    },
    orderBy: { player: { jersey_number: "asc" } },
  });

  return matchStats;
};

export const upsertStats = async (matchId, coachId, playerId, data) => {
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: { team: true },
  });

  if (!match) {
    const error = new Error("Du har ikke adgang til denne kamp");
    error.status = 403;
    throw error;
  }

  const player = await prisma.player.findUnique({
    where: { id: playerId },
  });

  if (!player) {
    const error = new Error("Spiller ikke fundet");
    error.status = 404;
    throw error;
  }

  if (player.team_id !== match.team_id) {
    const error = new Error("Spilleren er ikke på dette hold");
    error.status = 400;
    throw error;
  }

  const stats = await prisma.matchStats.upsert({
    where: {
      match_id_player_id: {
        match_id: matchId,
        player_id: playerId,
      },
    },
    update: data,
    create: {
      match_id: matchId,
      player_id: playerId,
      ...data,
    },
    include: {
      player: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          jersey_number: true,
        },
      },
    },
  });

  return stats;
};
