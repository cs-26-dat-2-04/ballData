import { Router } from "express";
import * as teamsController from "../controllers/teams.js";

const router = Router();

router.post("/", teamsController.createTeam);
router.get("/:id", teamsController.getTeam);


export default router;
