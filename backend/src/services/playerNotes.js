import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { prisma } from "../lib/prisma.js";

export const getNotesByPlayer = async (playerId, coachId) => {
  // Check at spilleren faktisk tilhører holdet
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

  const notes = await prisma.playerNote.findMany({
    where: { player_id: playerId, coach_id: coachId },
    orderBy: { created_at: "desc" },
  });

  return notes;
};

export const createNote = async (playerId, coachId, content) => {
  // Check at spilleren faktisk tilhører holdet
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

  const note = await prisma.playerNote.create({
    data: {
      player_id: playerId,
      coach_id: coachId,
      content,
    },
  });

  return note;
};

export const deleteNote = async (noteId, coachId) => {
  const note = await prisma.playerNote.findUnique({
    where: { id: noteId },
  });

  if (!note) {
    const error = new Error("Note ikke fundet");
    error.status = 404;
    throw error;
  }

  if (note.coach_id !== coachId) {
    const error = new Error("Du kan kun slette dine egne noter");
    error.status = 403;
    throw error;
  }

  await prisma.playerNote.delete({ where: { id: noteId } });
};
