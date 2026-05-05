import { Router } from "express";
import { getSeasonStats } from "../controllers/stats.js";
import auth from "../middleware/auth.js";

const router = Router({ mergeParams: true });

router.get("/season/:teamId", getSeasonStats);

export default router;
