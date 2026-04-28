import { Router } from "express";
import * as matchController from "../controllers/matches.js";

const router = Router({ mergeParams: true });

router.get("/:matchId/stats", matchController.getMatchStats);
router.post("/:matchId/stats", matchController.upsertStats);
router.get("/:matchId", matchController.getMatch);

export default router;
