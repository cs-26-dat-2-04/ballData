import { describe, it, expect, beforeEach } from "vitest";
import "../helpers/prisma-mock.js";
import { prismaMock } from "../helpers/prisma-mock.js";
import {
  createNote,
  getNotesByPlayer,
  deleteNote,
} from "../../services/playerNotes.js";

const mockPlayer = {
  id: "player-1",
  first_name: "Peter",
  last_name: "Griffin",
  jersey_number: 69,
  team_id: "team-1",
  team: { id: "team-1", coach_id: "coach-1" },
};

const mockNote = {
  id: "note-1",
  player_id: "player-1",
  coach_id: "coach-1",
  content: "Test note hehe",
};

beforeEach(() => vi.clearAllMocks());

describe("createNote", () => {
  it("Creates a note and connects it to the proper coach and player", async () => {
    prismaMock.player.findUnique.mockResolvedValue(mockPlayer);
    prismaMock.playerNote.create.mockResolvedValue(mockNote);

    const result = await createNote("player-1", "coach-1", "Test note hehe");

    expect(prismaMock.playerNote.create).toHaveBeenCalledWith({
      data: {
        player_id: "player-1",
        coach_id: "coach-1",
        content: "Test note hehe",
      },
    });
    expect(result).toMatchObject({
      player_id: "player-1",
      coach_id: "coach-1",
      content: "Test note hehe",
    });
  });

  it("Fails when creating a note if the player has no relation to coach", async () => {
    prismaMock.player.findUnique.mockResolvedValue({
      ...mockPlayer,
      team: { ...mockPlayer.team, coach_id: "coach-other" },
    });

    await expect(
      createNote("player-1", "coach-1", "Test note hehe"),
    ).rejects.toMatchObject({
      message: "Du har ikke adgang til denne spiller",
      status: 403,
    });

    expect(prismaMock.playerNote.create).not.toHaveBeenCalled();
  });
});

describe("getNotesByPlayer", () => {
  it("Strictly returns the notes belonging to the coach", async () => {
    prismaMock.player.findUnique.mockResolvedValue(mockPlayer);

    const coachNotes = [
      {
        id: "note-1",
        player_id: "player-1",
        coach_id: "coach-1",
        content: "Note 1",
      },
      {
        id: "note-2",
        player_id: "player-1",
        coach_id: "coach-1",
        content: "Note 2",
      },
    ];

    prismaMock.playerNote.findMany.mockResolvedValue(coachNotes);
    const result = await getNotesByPlayer("player-1", "coach-1");

    expect(prismaMock.playerNote.findMany).toHaveBeenCalledWith({
      where: { player_id: "player-1", coach_id: "coach-1" },
      orderBy: { created_at: "desc" },
    });
    expect(result).toHaveLength(2);
    expect(result.every((n) => n.coach_id === "coach-1")).toBe(true);
  });
});

describe("deleteNote", () => {
  it("Successfully deletes a note if coach owns it", async () => {
    prismaMock.playerNote.findUnique.mockResolvedValue(mockNote);
    prismaMock.playerNote.delete.mockResolvedValue(mockNote);

    await expect(deleteNote("note-1", "coach-1")).resolves.not.toThrow();

    expect(prismaMock.playerNote.delete).toHaveBeenCalledWith({
      where: { id: "note-1" },
    });
  });

  it("Throws an 403 error if the coach doesn't own the note", async () => {
    prismaMock.playerNote.findUnique.mockResolvedValue({
      ...mockNote,
      coach_id: "coach-other",
    });

    await expect(deleteNote("note-1", "coach-1")).rejects.toMatchObject({
      message: "Du kan kun slette dine egne noter",
      status: 403,
    });

    expect(prismaMock.playerNote.delete).not.toHaveBeenCalled();
  });
});
