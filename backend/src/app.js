import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import teamsRouter from "./routes/teams.js";
import playerRouter from "./routes/players.js";
import auth from "./middleware/auth.js";
import playerNotesRouter, { noteRouter } from "./routes/playerNotes.js";
import matchRouter from "./routes/matches.js";
import { inviteRouter, publicInviteRouter } from "./routes/inviteTokens.js";
import cookieParser from "cookie-parser";
import seasonRouter from "./routes/stats.js";

dotenv.config();

export const app = express();
export const PORT = process.env.PORT ?? 3001;

// Cookie parser
app.use(cookieParser());

// Cors setup - tillader kun requests fra localhost:3000 (vores frontend)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

// Health endpoint - til at tjekke om serveren kører
app.get("/health", async (_req, res) => res.json({ status: "ok" }));

// Til at teste auth
app.get("/health_auth", auth, async (_req, res) => res.json({ status: "ok" }));

// Auth routes
app.use("/auth", authRouter);

// Teams routes
app.use("/teams", auth, teamsRouter);

// Player routes
app.use("/teams/:teamId/players", auth, playerRouter);
app.use("/players", auth, playerRouter); // er ikke nødvendig men er nemmere at bruge til deletePlayer

// Notes
app.use("/players/:playerId/notes", auth, playerNotesRouter);
app.use("/notes", auth, noteRouter);

// Stats
app.use("/stats", auth, seasonRouter);
app.use("/players/:playerId/stats", auth, seasonRouter);

// Matches
app.use("/matches", auth, matchRouter);

// Invite tokens - Der er auth under route filen
app.use("/matches/:matchId/invite", inviteRouter);
app.use("/invite", publicInviteRouter);
