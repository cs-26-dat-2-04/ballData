import { Router } from "express";
import * as playerNotesController from "../controllers/playerNotes.js";

const router = Router({ mergeParams: true }); // mergeParams gør at man kan få :playerId fra routeren

router.get("/", playerNotesController.getNotes);
router.post("/", playerNotesController.createNote);

export default router;

// Denne router er til /notes
export const noteRouter = Router();
noteRouter.delete("/:noteId", playerNotesController.deleteNote);
