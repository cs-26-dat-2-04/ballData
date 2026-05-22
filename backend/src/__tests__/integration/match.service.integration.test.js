import { describe, it, expect, beforeEach, afterEach, beforeAll } from "vitest";
import {
  createMatch,
  getMatchById,
  getMatchesByTeam,
} from "../../services/matches.js";
import {
  seedCoach,
  seedCoachAndTeam,
  seedPlayer,
  seedMatch,
  seedMatchStats,
  cleanDb,
} from "../helpers/db-seed.js";
import { Location } from "@prisma/client";

beforeAll(async () => cleanDb());
beforeEach(async () => cleanDb());

describe("createMatch", () => {
  it("Successfully creates a match for a team", async () => {
    const { coach, team } = await seedCoachAndTeam();
    const matchData = {
      opponent: "Rival Club",
      location: Location.HOME,
      score_home: 2,
      score_away: 1,
      result: "WIN",
    };

    const result = await createMatch(team.id, coach.id, matchData);

    expect(result).toMatchObject({
      team_id: team.id,
      opponent: "Rival Club",
      location: Location.HOME,
      score_home: 2,
      score_away: 1,
      result: "WIN",
    });
  });

  it("Throws 403 if the coach does not own the team", async () => {
    const { team } = await seedCoachAndTeam();
    const otherCoach = await seedCoach({ email: "other@test.dk" });

    await expect(
      createMatch(team.id, otherCoach.id, {
        opponent: "Rival Club",
        location: Location.HOME,
      }),
    ).rejects.toMatchObject({ status: 403 });
  });

  it("Throws 404 if the team does not exist", async () => {
    const coach = await seedCoach();

    await expect(
      createMatch("22bc5651-b62c-4b7e-93bc-6be204ba1925", coach.id, {
        opponent: "Rival FC",
        location: Location.HOME,
      }),
    ).rejects.toMatchObject({ status: 404 });
  });
});

describe("getMatchesByTeam", () => {
  it("Successfully returns all matches for a team", async () => {
    const { coach, team } = await seedCoachAndTeam();
    await seedMatch(team.id, { opponent: "Club A" });
    await seedMatch(team.id, { opponent: "Club B" });

    const result = await getMatchesByTeam(team.id, coach.id);

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ opponent: "Club A" }),
        expect.objectContaining({ opponent: "Club B" }),
      ]),
    );
  });

  it("Throws 403 if the coach does not own the team", async () => {
    const { team } = await seedCoachAndTeam();
    const otherCoach = await seedCoach({ email: "other@test.com" });

    await expect(
      getMatchesByTeam(team.id, otherCoach.id),
    ).rejects.toMatchObject({ status: 403 });
  });
});

describe("getMatchById", () => {
  it("Successfully returns a match with its stats", async () => {
    const { coach, team } = await seedCoachAndTeam();
    const player = await seedPlayer(team.id);
    const match = await seedMatch(team.id);
    await seedMatchStats(match.id, player.id, { goals: 2 });

    const result = await getMatchById(match.id, coach.id);

    expect(result).toMatchObject({
      id: match.id,
      team_id: team.id,
      matchStats: expect.arrayContaining([
        expect.objectContaining({ goals: 2 }),
      ]),
    });
  });

  it("Throws 404 if the match does not exist", async () => {
    const coach = await seedCoach();

    await expect(
      getMatchById("22bc5651-b62c-4b7e-93bc-6be204ba1925", coach.id),
    ).rejects.toMatchObject({ status: 404 });
  });

  it("Throws 403 if the coach does not own the match", async () => {
    const { team } = await seedCoachAndTeam();
    const otherCoach = await seedCoach({ email: "other@test.dk" });
    const match = await seedMatch(team.id);

    await expect(getMatchById(match.id, otherCoach.id)).rejects.toMatchObject({
      status: 403,
    });
  });
});
