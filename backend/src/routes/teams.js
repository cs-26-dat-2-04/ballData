import { Router } from "express";
import * as teamsController from "../controllers/teams.js";
import * as matchController from "../controllers/matches.js";

const router = Router({ mergeParams: true });

router.post("/", teamsController.createTeam);
router.get("/:id", teamsController.getTeam);

router.get("/:teamId/matches", matchController.getMatches);
router.post("/:teamId/matches", matchController.createMatch);

export default router;
