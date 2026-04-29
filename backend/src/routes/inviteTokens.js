import { Router } from "express";
import * as inviteTokensController from "../controllers/inviteTokens.js";
import auth from "../middleware/auth.js";

export const inviteRouter = Router({ mergeParams: true });
inviteRouter.post("/", auth, inviteTokensController.generateToken);

export const publicInviteRouter = Router();
publicInviteRouter.get("/:token", inviteTokensController.validateToken);
