import { describe, it, expect, beforeEach, afterEach, beforeAll } from "vitest";
import {
  createPlayer,
  deletePlayer,
  getPlayersByTeamId,
  updatePlayer,
} from "../../services/players.js";
import {
  seedCoachAndTeam,
  seedPlayer,
  seedCoach,
  cleanDb,
} from "../helpers/db-seed.js";

beforeAll(async () => cleanDb());
beforeEach(async () => cleanDb());

describe("getPlayersByTeamId", () => {
  it("Successfully returns all players for a team", async () => {
    const { coach, team } = await seedCoachAndTeam("testcoach@mail.com");

    console.log(team.id);
    await seedPlayer(team.id, { first_name: "Jørgen", jersey_number: 21 });
    await seedPlayer(team.id, { first_name: "Jens", jersey_number: 23 });
  });

  it("Throws 403 if the coach does not own the team", async () => {
    const { team } = await seedCoachAndTeam();
    const otherCoach = await seedCoach({
      email: `other-coach@test.com`,
    });

    await expect(
      getPlayersByTeamId(team.id, otherCoach.id),
    ).rejects.toMatchObject({
      status: 403,
    });
  });
});

describe("createPlayer", () => {
  it("Successfully creates a player on the team", async () => {
    const { coach, team } = await seedCoachAndTeam();
    const result = await createPlayer(team.id, coach.id, "Ole", "Larsen", 9);

    expect(result).toMatchObject({
      first_name: "Ole",
      last_name: "Larsen",
      jersey_number: 9,
      team_id: team.id,
    });
  });

  it("Throws 409 if jersey number is already taken", async () => {
    const { coach, team } = await seedCoachAndTeam();
    await seedPlayer(team.id, { jersey_number: 9 });

    await expect(
      createPlayer(team.id, coach.id, "Ole", "Larsen", 9),
    ).rejects.toMatchObject({ status: 409 });
  });

  it("Throws 403 if the coach does not own the team", async () => {
    const { team } = await seedCoachAndTeam();
    const otherCoach = await seedCoach({ email: "other@test.com " });

    await expect(
      createPlayer(team.id, otherCoach.id, "Ole", "Larsen", 9),
    ).rejects.toMatchObject({ status: 403 });
  });
});

describe("deletePlayer", () => {
  it("Successfully deletes a player", async () => {
    const { coach, team } = await seedCoachAndTeam();
    const player = await seedPlayer(team.id);

    await expect(deletePlayer(coach.id, player.id)).resolves.not.toThrow();
  });

  it("Throws 404 if the player does not exist", async () => {
    const coach = await seedCoach();

    await expect(
      deletePlayer(coach.id, "22bc5651-b62c-4b7e-93bc-6be204ba1925"),
    ).rejects.toMatchObject({ status: 404 });
  });

  it("Throws 403 if the coach does not own the player", async () => {
    const { team } = await seedCoachAndTeam();
    const otherCoach = await seedCoach({ email: "other@test.dk" });
    const player = await seedPlayer(team.id);

    await expect(deletePlayer(otherCoach.id, player.id)).rejects.toMatchObject({
      status: 403,
    });
  });
});

describe("updatePlayer", () => {
  it("Successfully updates a players details", async () => {
    const { coach, team } = await seedCoachAndTeam();
    const player = await seedPlayer(team.id, { jersey_number: 10 });

    const result = await updatePlayer(
      coach.id,
      player.id,
      "Updated",
      "Name",
      3,
    );

    expect(result).toMatchObject({
      first_name: "Updated",
      last_name: "Name",
      jersey_number: 3,
    });
  });

  it("Throws 409 if the new jersey number is already taken by another player", async () => {
    const { coach, team } = await seedCoachAndTeam();
    await seedPlayer(team.id, { jersey_number: 7 });
    const player = await seedPlayer(team.id, { jersey_number: 10 });

    await expect(
      updatePlayer(coach.id, player.id, "Søren", "Jensen", 7),
    ).rejects.toMatchObject({ status: 409 });
  });

  it("Throws 404 if the player does not exist", async () => {
    const coach = await seedCoach();

    await expect(
      updatePlayer(
        coach.id,
        "22bc5651-b62c-4b7e-93bc-6be204ba1925",
        "Lars",
        "Larsen",
        10,
      ),
    ).rejects.toMatchObject({ status: 404 });
  });
});
