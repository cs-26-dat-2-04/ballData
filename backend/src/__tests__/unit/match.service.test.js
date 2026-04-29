import { describe, it, expect, vi, beforeEach } from "vitest";
import "../helpers/prisma-mock";
import { prismaMock } from "../helpers/prisma-mock";
import { getMatchById } from "../../services/matches.js";
import { Location } from "@prisma/client";

const mockMatch = {
  id: "match-uuid-1",
  team_id: "team-uuid-1",
  opponent: "Rival FC",
  match_date: new Date("2024-05-01"),
  location: Location.HOME,
  score_home: 2,
  score_away: 1,
  team: {
    coach_id: "coach",
  },
  matchStats: [],
};

beforeEach(() => vi.clearAllMocks());

describe("getMatchById", () => {
  it("returns a match with stats when found", async () => {
    prismaMock.match.findUnique.mockResolvedValue(mockMatch);

    const result = await getMatchById("match-uuid-1", "coach");

    expect(result).toEqual(mockMatch);
    expect(prismaMock.match.findUnique).toHaveBeenCalledWith({
      where: { id: "match-uuid-1" },
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
  });

  it("throws an error when match does not exist", async () => {
    prismaMock.match.findUnique.mockResolvedValue(null);

    await expect(getMatchById("nonexistent", "coach")).rejects.toMatchObject({
      message: "Kamp ikke fundet",
      status: 404,
    });
  });
});
