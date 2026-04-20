import { prisma } from "../lib/prisma.js";

export const createTeam = async (coachId, name) => {
  const existingTeam = await prisma.team.findUnique({
    where: { coach_id: coachId },
  });

  if (existingTeam) {
    const error = new Error("Coachen har allerede et hold");
    error.status = 409;
    throw error;
  }

  const team = await prisma.team.create({
    data: {
      coach_id: coachId,
      name,
    },
  });

  return team;
};

export const getTeamById = async (teamId, coachId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      players: {
        orderBy: { jersey_number: "asc" },
      },
    },
  });

  if (!team) {
    const error = new Error("Hold kunne ikke findes");
    error.status = 404;
    throw error;
  }

  if (team.coach_id !== coachId) {
    const error = new Error("Du har ikke adgang til dette hold");
    error.status = 403;
    throw error;
  }

  return team;
};
