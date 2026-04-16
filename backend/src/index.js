import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

// Cors setup - tillader kun requests fra localhost:3000 (vores frontend)
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Health endpoint - til at tjekke om serveren kører
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
