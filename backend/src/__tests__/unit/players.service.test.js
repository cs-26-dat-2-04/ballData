import { describe, it, expect, vi, beforeEach } from "vitest";
import "../helpers/prisma-mock";
import { prismaMock } from "../helpers/prisma-mock";
import {
  getPlayersByTeamId,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from "../../services/players.js";
import { Location } from "@prisma/client";
import { seedCoach, seedTeam, seedPlayer } from "../helpers/db-seed.js";
import { prisma } from "../../lib/prisma.js";

beforeEach(() => vi.clearAllMocks());

describe("createPlayer", () => {
  it("Creates player with correct data", async () => {
    prismaMock.team.findUnique.mockResolvedValue({
      id: "team1",
      coach_id: "coach1",
      name: "Team A",
    });

    prismaMock.player.findFirst.mockResolvedValue(null);

    const result = await createPlayer("team1", "coach1", "test", "testman", 11);
    expect(prismaMock.player.create).toHaveBeenCalledWith({
      data: {
        team: {
          connect: { id: "team1" },
        },
        first_name: "test",
        last_name: "testman",
        jersey_number: 11,
      },
    });
  });

  it("Does not create player when duplicate jersey number", async () => {
    prismaMock.team.findUnique.mockResolvedValue({
      id: "team1",
      coach_id: "coach1",
      name: "Team A",
    });

    prismaMock.player.findFirst.mockResolvedValue({
      id: "12345",
      first_name: "john",
      last_name: "dumb",
      jersey_number: 11,
    });

    const result = createPlayer("team1", "coach1", "test", "testman", 11);
    await expect(result).rejects.toMatchObject({
      message: "Der findes allerede en spiller med dette trøjenummer",
      status: 409,
    });
  });
  it("Allows creation without jersey number", async () => {
    prismaMock.team.findUnique.mockResolvedValue({
      id: "team1",
      coach_id: "coach1",
      name: "Team A",
    });

    prismaMock.player.create.mockResolvedValue(seedPlayer({ id: "123" }));

    prismaMock.player.findFirst.mockResolvedValue(null);

    const result = await createPlayer("team1", "coach1", "test", "testman");
    expect(prismaMock.player.create).toHaveBeenCalledWith({
      data: {
        team: {
          connect: { id: "team1" },
        },
        first_name: "test",
        last_name: "testman",
      },
    });
  });

  it("allows creation of multiple players with no jersey number", async () => {
    prismaMock.team.findUnique.mockResolvedValue({
      id: "team1",
      coach_id: "coach1",
      name: "Team A",
    });

    const playerNoJersey = {
      id: "1234",
      first_name: "no",
      last_name: "Jersey",
      jersey_number: undefined,
    };

    prismaMock.player.create.mockResolvedValue({
      id: "123",
      first_name: "jersey",
      last_name: "not",
    });
    prismaMock.player.findFirst.mockResolvedValue(playerNoJersey);

    const result = createPlayer("team1", "coach1", "test", "testman");
    await expect(result).resolves.toMatchObject({
      id: "123",
      first_name: "jersey",
      last_name: "not",
    });
  });
  it.each([
    { firstName: undefined, lastName: undefined },
    { firstName: "testman", lastName: undefined },
    { firstName: undefined, lastName: "testman" },
  ])(
    "Does not allow creation of player when not given proper first and last name",
    async (firstName, lastName) => {
      prismaMock.team.findUnique.mockResolvedValue({
        id: "team1",
        coach_id: "coach1",
        name: "Team A",
      });

      const result = createPlayer("team1", "coach1", firstName, lastName);
      await expect(result).rejects.toMatchObject({
        message: "Navn er påkrævet",
      });
    },
  );
});

describe("getPlayers", () => {
  it("Does not get players when you are not their coach", async () => {
    prismaMock.team.findUnique.mockResolvedValue({
      id: "team1",
      coach_id: "coach1",
      name: "Team A",
    });

    const result = getPlayersByTeamId("team1", "coach2");
    await expect(result).rejects.toMatchObject({
      message: "Du har ikke adgang til dette hold",
      status: 403,
    });
  });

  it("Gets players if it is the players' coach", async () => {
    prismaMock.team.findUnique.mockResolvedValue({
      id: "team1",
      coach_id: "coach1",
      name: "Team A",
    });

    prismaMock.player.findMany.mockResolvedValue(
      {
        id: "12345",
        first_name: "john",
        last_name: "dumb",
        jersey_number: 11,
      },
      {
        id: "123456",
        first_name: "john",
        last_name: "smart",
        jersey_number: 12,
      },
    );

    const result = getPlayersByTeamId("team1", "coach1");
    await expect(result).resolves.toMatchObject(
      {
        id: "12345",
        first_name: "john",
        last_name: "dumb",
        jersey_number: 11,
      },
      {
        id: "123456",
        first_name: "john",
        last_name: "smart",
        jersey_number: 12,
      },
    );
  });
});

describe("updatePlayers", () => {
  it.each([
    { firstName: undefined, lastName: undefined, jersey_number: 15 },
    {
      firstName: undefined,
      lastName: "testman the 2nd",
      jersey_number: undefined,
    },
    { firstName: "test2", lastName: undefined, jersey_number: undefined },
    {
      firstName: "test2",
      lastName: "testman the 2nd",
      jersey_number: undefined,
    },
    { firstName: "test2", lastName: undefined, jersey_number: 15 },
    { firstName: undefined, lastName: "testman the 2nd", jersey_number: 15 },
    { firstName: "test2", lastName: "testman the 2nd", jersey_number: 15 },
  ])(
    "udates Player with any amount of used fields",
    async (firstName, lastName, jerseyNumber) => {
      const player = {
        id: "123",
        team_id: "team1",
        first_name: "test",
        last_name: "testman",
        jersey_number: 11,
        team: {
          coach_id: "coach1",
        },
      };

      prismaMock.player.findUnique.mockResolvedValue(player);
      prismaMock.player.findFirst.mockResolvedValue(null);

      prismaMock.player.update.mockResolvedValue({
        id: "123",
        first_name: firstName ?? "test",
        last_name: lastName ?? "testman",
        jersey_number: jerseyNumber ?? 11,
      });

      const result = updatePlayer(
        "coach1",
        "123",
        firstName,
        lastName,
        jerseyNumber,
      );
      await expect(result).resolves.toMatchObject({
        id: "123",
        first_name: firstName ?? "test",
        last_name: lastName ?? "testman",
        jersey_number: jerseyNumber ?? 11,
      });
      expect(prismaMock.player.update).toHaveBeenCalledWith({
        where: { id: "123" },
        data: {
          first_name: firstName ?? "test",
          last_name: lastName ?? "testman",
          jersey_number: jerseyNumber ?? 11,
        },
      });
    },
  );

  it("Does not update players when you are not their coach", async () => {
    const player = {
      id: "123",
      team_id: "team1",
      first_name: "test",
      last_name: "testman",
      jersey_number: 11,
      team: {
        coach_id: "coach1",
      },
    };

    prismaMock.player.findUnique.mockResolvedValue(player);
    prismaMock.player.findFirst.mockResolvedValue(null);

    prismaMock.player.update.mockResolvedValue({
      id: "123",
      first_name: "test",
      last_name: "testman",
      jersey_number: 11,
    });

    const result = updatePlayer("coach2", "123", undefined, undefined, 15);
    await expect(result).rejects.toMatchObject({
      message: "Du har ikke adgang til dette hold",
      status: 403,
    });
  });

  it("does not let you update jerseyNumbber when someone else on the players team has the same number", async () => {
    const player = {
      id: "123",
      team_id: "team1",
      first_name: "test",
      last_name: "testman",
      jersey_number: 11,
      team: {
        coach_id: "coach1",
      },
    };

    prismaMock.player.findUnique.mockResolvedValue(player);
    prismaMock.player.findFirst.mockResolvedValue({ id: "1234" });

    const result = updatePlayer("coach1", "123", undefined, undefined, 15);
    await expect(result).rejects.toMatchObject({
      message: "Der findes allerede en spiller med dette trøjenummer",
      status: 409,
    });
  });
});

describe("deletePlayer", () => {
  it("Succesfully deletes player", async () => {
    const player = {
      id: "123",
      team_id: "team1",
      first_name: "test",
      last_name: "testman",
      jersey_number: 11,
      team: {
        coach_id: "coach1",
      },
    };

    prismaMock.player.findUnique.mockResolvedValue(player);
    prismaMock.player.delete.mockResolvedValue({ where: { id: "123" } });

    await deletePlayer("coach1", "123");
    expect(prismaMock.player.delete).toHaveBeenCalledWith({
      where: { id: "123" },
    });
  });
  it("Cant delete player when not their coach", async () => {
    const player = {
      id: "123",
      team_id: "team1",
      first_name: "test",
      last_name: "testman",
      jersey_number: 11,
      team: {
        coach_id: "coach1",
      },
    };

    prismaMock.player.findUnique.mockResolvedValue(player);
    prismaMock.player.delete.mockResolvedValue({ where: { id: "123" } });

    const result = deletePlayer("coach2", "123");
    await expect(result).rejects.toMatchObject({
      message: "Du må kun slette dine egne spillere",
      status: 403,
    });
  });
  it("Doesnt delete anything when called with not real player", async () => {
    prismaMock.player.findUnique.mockResolvedValue(null);
    const result = deletePlayer("coach1", "123");
    await expect(result).rejects.toMatchObject({
      message: "Spiller ikke fundet",
      status: 404,
    });
  });
});
