import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import teamsRouter from "./routes/teams.js";
import auth from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

// Cors setup - tillader kun requests fra localhost:3000 (vores frontend)
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Health endpoint - til at tjekke om serveren kører
app.get("/health", async (_req, res) => res.json({ status: "ok" }));

// Til at teste auth
app.get("/health_auth", auth, async (_req, res) => res.json({ status: "ok" }));

// Auth routes
app.use("/auth", authRouter);

// Teams routes
app.use("/teams", auth, teamsRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
