import { prisma } from "../lib/prisma.js";
import crypto from "crypto";

export const generateInviteToken = async (matchId, coachId) => {
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: { team: true },
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

  // En aktiv token ad gangen
  await prisma.inviteToken.deleteMany({
    where: { match_id: matchId, coach_id: coachId },
  });

  const token = crypto.randomBytes(32).toString("hex");
  const expires_at = new Date(Date.now() + 1000 * 60 * 60 * 2); // 2 timer

  const inviteToken = await prisma.inviteToken.create({
    data: {
      match_id: matchId,
      coach_id: coachId,
      token,
      expires_at,
    },
  });

  return inviteToken;
};

export const validateInviteToken = async (token) => {
  const inviteToken = await prisma.inviteToken.findFirst({
    where: { token },
    include: {
      match: {
        include: {
          team: {
            include: {
              players: {
                orderBy: { jersey_number: "asc" },
              },
            },
          },
          matchStats: true,
        },
      },
    },
  });

  if (!inviteToken) {
    const error = new Error("Ugyldigt invite link");
    error.status = 404;
    throw error;
  }

  if (new Date() > inviteToken.expires_at) {
    const error = new Error("Invite link er udløbet");
    error.status = 410;
    throw error;
  }

  return inviteToken.match;
};
