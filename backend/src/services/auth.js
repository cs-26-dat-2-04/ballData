import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { prisma } from "../lib/prisma.js";

export async function signup({ name, email, password }) {
  const existingCoach = await prisma.coach.findUnique({ where: { email } });
  if (existingCoach) {
    const error = new Error("En bruger med denne email findes allerede");
    error.status = 409;
    throw error;
  }

  const password_hash = await bcrypt.hash(password, 12);
  await prisma.coach.create({
    data: { name, email, password_hash },
  });
}

export async function login({ email, password }) {
  const coach = await prisma.coach.findUnique({ where: { email } });

  if (!coach) {
    const error = new Error("Forkert email eller adgangskode");
    error.status = 401;
    throw error;
  }

  const passwordMatch = await bcrypt.compare(password, coach.password_hash);
  if (!passwordMatch) {
    const error = new Error("Forkert email eller adgangskode");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: coach.id, email: coach.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return {
    token,
    coach: { id: coach.id, email: coach.email, name: coach.name },
  };
}

export async function getMe(coachId) {
  const coach = await prisma.coach.findUnique({
    where: { id: coachId },
    select: {
      id: true,
      email: true,
      name: true,
      team: {
        select: { id: true, name: true },
      },
    },
  });

  if (!coach) {
    const error = new Error("Coach ikke fundet");
    error.status = 404;
    throw error;
  }

  return coach;
}
