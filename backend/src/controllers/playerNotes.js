import * as playerNotesService from "../services/playerNotes.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await playerNotesService.getNotesByPlayer(
      req.params.playerId,
      req.coach.id,
    );
    res.json(notes);
  } catch (err) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
};

export const createNote = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Mangler indhold" }); // TODO: Måske skrive en bedre err message?
  }

  try {
    const note = await playerNotesService.createNote(
      req.params.playerId,
      req.coach.id,
      content,
    );
    res.status(201).json(notes);
  } catch (err) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await playerNotesService.deleteNote(req.params.noteId, req.coach.id);
    res.status(204).send();
  } catch (err) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
};
