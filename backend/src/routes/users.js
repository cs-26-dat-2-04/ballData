import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post("/", async (req, res) => {
  const { email, name } = req.body;
  const user = await prisma.user.create({ data: { email, name } });
  res.status(201).json(user);
});

export default router;
