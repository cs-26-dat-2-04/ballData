import { Router } from "express";
import { getSeasonStats, getPlayerStats } from "../controllers/stats.js";
import auth from "../middleware/auth.js";

const router = Router({ mergeParams: true });

router.get("/season/:teamId", getSeasonStats);
router.get("/", getPlayerStats);
export default router;
