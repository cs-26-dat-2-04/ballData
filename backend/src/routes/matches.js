import { Router } from "express";
import * as matchStatsController from "../controllers/matches.js";

const router = Router();

router.get("/:matchId/stats", matchStatsController.getMatchStats);
router.post("/:matchId/stats", matchStatsController.upsertStats);

export default router;
