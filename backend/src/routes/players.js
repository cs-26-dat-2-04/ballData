import { Router } from "express";
import * as playersController from "../controllers/players.js";

const router = Router({ mergeParams: true });

router.get("/", playersController.getPlayers);
router.post("/", playersController.createPlayer);
router.delete("/:playerId", playersController.deletePlayer);


export default router;
