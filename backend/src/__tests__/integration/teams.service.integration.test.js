import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import { createTeam, getTeamById } from "../../services/teams.js";
import { seedCoach, seedCoachAndTeam, cleanDb } from "../helpers/db-seed.js";

beforeAll(async () => cleanDb());
beforeEach(async () => cleanDb());

describe("createTeam", () => {
  it("Successfully creates a team for a coach with no existing team", async () => {
    const coach = await seedCoach();
    const result = await createTeam(coach.id, "New Club");

    expect(result).toMatchObject({
      coach_id: coach.id,
      name: "New Club",
    });
  });
});

describe("getTeamById", () => {
  it("Successfully returns a team with its players", async () => {
    const { coach, team } = await seedCoachAndTeam();
    const result = await getTeamById(team.id, coach.id);

    expect(result).toMatchObject({
      id: team.id,
      coach_id: coach.id,
      name: team.name,
      players: expect.any(Array),
    });
  });

  it("Throws 404 if the team does not exist", async () => {
    const coach = await seedCoach();

    // getTeamById skal bruge et valid UUID for at fungere - dette uuid er valid men eksisterer ikke
    await expect(
      getTeamById("22bc5651-b62c-4b7e-93bc-6be204ba1925", coach.id),
    ).rejects.toMatchObject({
      status: 404,
    });
  });

  it("Throws 403 if the coach does not own the team", async () => {
    const { team } = await seedCoachAndTeam();
    const otherCoach = await seedCoach({ email: "othercoach@test.com" });

    await expect(getTeamById(team.id, otherCoach.id)).rejects.toMatchObject({
      status: 403,
    });
  });
});
