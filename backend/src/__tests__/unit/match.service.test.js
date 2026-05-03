import { describe, it, expect, beforeEach } from "vitest";
import "../helpers/prisma-mock.js";
import { prismaMock } from "../helpers/prisma-mock.js";
import {
  getMatchById,
  getStatsByMatch,
  createMatch,
  getMatchesByTeam,
} from "../../services/matches.js";

const mockTeam = { id: "team-1", coach_id: "coach-1", name: "Cool club" };

const mockMatch = {
  id: "match-1",
  team_id: "team-1",
  opponent: "Rival FC",
  team: mockTeam,
  matchStats: [
    {
      id: "stat-1",
      goals: 1,
      assists: 0,
      minutes_played: 90,
      player: {
        id: "player-1",
        first_name: "Peter",
        last_name: "Griffin",
        jersey_number: 67,
      },
    },
    {
      id: "stat-2",
      goals: 0,
      assists: 2,
      minutes_played: 80,
      player: {
        id: "player-2",
        first_name: "Brian",
        last_name: "Family Guy",
        jersey_number: 4,
      },
    },
  ],
};

beforeEach(() => vi.clearAllMocks());

describe("getMatchById", () => {
  it("Successfully retrieves a match with team and matchStats", async () => {
    prismaMock.match.findUnique.mockResolvedValue(mockMatch);

    const result = await getMatchById("match-1", "coach-1");

    expect(prismaMock.match.findUnique).toHaveBeenCalledWith({
      where: { id: "match-1" },
      include: {
        team: true,
        matchStats: {
          include: {
            player: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                jersey_number: true,
              },
            },
          },
          orderBy: { player: { jersey_number: "asc" } },
        },
      },
    });

    expect(result).toMatchObject({
      id: "match-1",
      team: expect.objectContaining({ id: "team-1" }),
      matchStats: expect.arrayContaining([
        expect.objectContaining({
          player: expect.objectContaining({ jersey_number: 67 }),
        }),
        expect.objectContaining({
          player: expect.objectContaining({ jersey_number: 4 }),
        }),
      ]),
    });
  });

  it("Throws an 403 error if the coach doesn't have access to the match", async () => {
    prismaMock.match.findUnique.mockResolvedValue({
      ...mockMatch,
      team: { ...mockTeam, coach_id: "coach-other" },
    });

    await expect(getMatchById("match-1", "coach-1")).rejects.toMatchObject({
      message: "Du har ikke adgang til denne kamp",
      status: 403,
    });
  });

  it("Throws an 404 error if the match doesn't exist", async () => {
    prismaMock.match.findUnique.mockResolvedValue(null);

    await expect(getMatchById("match-6969", "coach-1")).rejects.toMatchObject({
      message: "Kamp ikke fundet",
      status: 404,
    });
  });
});

describe("getStatsByMatch", () => {
  it("Returns sorted MatchStats by jersey number", async () => {
    prismaMock.match.findUnique.mockResolvedValue({
      ...mockMatch,
      team: mockTeam,
    });

    const sortedStats = [
      {
        id: "stat-1",
        player: {
          id: "player-1",
          first_name: "Peter",
          last_name: "Parker",
          jersey_number: 4,
        },
      },
      {
        id: "stat-2",
        player: {
          id: "player-2",
          first_name: "Billy",
          last_name: "Flowers",
          jersey_number: 5,
        },
      },
    ];
    prismaMock.matchStats.findMany.mockResolvedValue(sortedStats);

    const result = await getStatsByMatch("match-1", "coach-1");

    expect(prismaMock.matchStats.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: { player: { jersey_number: "asc" } },
      }),
    );

    const jerseyNumbers = result.map((s) => s.player.jersey_number);
    expect(jerseyNumbers).toEqual([...jerseyNumbers].sort((a, b) => a - b));
  });
});

describe("createMatch", () => {
  it("Creates a match and connects to the correct team", async () => {
    prismaMock.team.findUnique.mockResolvedValue(mockTeam);

    const newMatch = {
      id: "match-2",
      team_id: "team-1",
      opponent: "New cool club",
      location: "HOME",
    };

    prismaMock.match.create.mockResolvedValue(newMatch);

    const matchData = { opponent: "New cool club", location: "HOME" };
    const result = await createMatch("team-1", "coach-1", matchData);

    expect(prismaMock.match.create).toHaveBeenCalledWith({
      data: { team_id: "team-1", ...matchData },
    });
    expect(result).toMatchObject({
      team_id: "team-1",
      opponent: "New cool club",
    });
  });
});

describe("getMatchesByTeam", () => {
  it("Deletes a match successfully", async () => {
    prismaMock.team.findUnique.mockResolvedValue(mockTeam);

    prismaMock.match.findMany.mockResolvedValue([]);

    const result = await getMatchesByTeam("team-1", "coach-1");

    expect(result).toEqual([]);
  });
});
