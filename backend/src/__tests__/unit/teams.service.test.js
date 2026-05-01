import { describe, it, expect, vi, beforeEach } from "vitest";
import "../helpers/prisma-mock";
import { prismaMock } from "../helpers/prisma-mock";
import { createTeam, getTeamById } from "../../services/teams.js";

beforeEach(() => vi.clearAllMocks());

describe("createTeam", () => {
  it("Creates a team successfully for a coach without a team", async () => {
    prismaMock.team.findUnique.mockResolvedValue(null);

    const createdTeam = {
      id: "team-1",
      coach_id: "coach-1",
      name: "Test Club",
    };
    prismaMock.team.create.mockResolvedValue(createdTeam);

    const result = await createTeam("coach-1", "Test Club");

    expect(prismaMock.team.findUnique).toHaveBeenCalledWith({
      where: { coach_id: "coach-1" },
    });
    expect(prismaMock.team.create).toHaveBeenCalledWith({
      data: { coach_id: "coach-1", name: "Test Club" },
    });
    expect(result).toEqual(createdTeam);
  });

  it("Fails when creating a team if a coach already has a team", async () => {
    prismaMock.team.findUnique.mockResolvedValue({
      id: "team-1",
      coach_id: "coach-1",
      name: "Cool Club",
    });

    await expect(createTeam("coach-1", "New Club")).rejects.toMatchObject({
      message: "Coachen har allerede et hold",
      status: 409,
    });

    expect(prismaMock.team.create).not.toHaveBeenCalled();
  });
});

describe("getTeamById", () => {
  const mockTeam = {
    id: "team-1",
    coach_id: "coach-1",
    name: "Cool club",
    players: [
      {
        id: "player-1",
        first_name: "Palle",
        last_name: "Pallesen",
        jersey_number: 6,
      },
      {
        id: "player-2",
        first_name: "Polle",
        last_name: "Pollesen",
        jersey_number: 7,
      },
    ],
  };

  it("Successfully gets a team in the correct format", async () => {
    prismaMock.team.findUnique.mockResolvedValue(mockTeam);

    const result = await getTeamById("team-1", "coach-1");

    expect(prismaMock.team.findUnique).toHaveBeenCalledWith({
      where: { id: "team-1" },
      include: {
        players: {
          orderBy: { jersey_number: "asc" },
        },
      },
    });

    expect(result).toMatchObject({
      id: "team-1",
      coach_id: "coach-1",
      name: "Cool club",
      players: expect.arrayContaining([
        expect.objectContaining({ jersey_number: 6 }),
        expect.objectContaining({ jersey_number: 7 }),
      ]),
    });
  });

  it("Returns an 403 error if a coach doesn't belong to a team", async () => {
    prismaMock.team.findUnique.mockResolvedValue({
      ...mockTeam,
      coach_id: "other coach",
    });

    await expect(getTeamById("team-1", "coach-1")).rejects.toMatchObject({
      message: "Du har ikke adgang til dette hold",
      status: 403,
    });
  });

  it("Returns an 404 error if a team doesn't exist", async () => {
    prismaMock.team.findUnique.mockResolvedValue(null);

    await expect(getTeamById("team-6969", "coach-67")).rejects.toMatchObject({
      message: "Hold kunne ikke findes",
      status: 404,
    });
  });
});
