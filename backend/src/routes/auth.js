import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Navn, email og adgangskode påkrævet" });
  }

  try {
    const existingCoach = await prisma.coach.findUnique({ where: { email } });
    if (existingCoach) {
      return res
        .status(409)
        .json({ error: "En bruger med denne email findes allerede" });
    }

    const password_hash = await bcrypt.hash(password, 12);
    await prisma.coach.create({
      data: { name, email, password_hash },
    });

    res.status(201).json({ message: "Coach oprettet" });
  } catch (err) {
    console.error("Signup fejl:", err);
    res.status(500).json({ error: "Intern serverfejl" });
  }
});

// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email og adgangskode er påkrævet" });
  }

  try {
    const coach = await prisma.coach.findUnique({ where: { email } });

    if (!coach) {
      return res.status(401).json({ error: "Forkert email eller adgangskode" });
    }

    const passwordMatch = await bcrypt.compare(password, coach.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Forkert email eller adgangskode" });
    }

    const token = jwt.sign(
      { id: coach.id, email: coach.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      token,
      coach: {
        id: coach.id,
        email: coach.email,
        name: coach.name,
      },
    });
  } catch (err) {
    console.error("Login fejl:", err);
    res.status(500).json({ error: "Intern serverfejl" });
  }
});

export default router;
