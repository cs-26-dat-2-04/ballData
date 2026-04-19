import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

const router = Router();

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
