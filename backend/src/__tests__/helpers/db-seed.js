import { prisma } from "../../lib/prisma";
import { Location } from "@prisma/client";

const FAKE_HASH = "$2b$10$faKehashXXXXXXXXXXXXXXXXXXXXXblaXXXXXXXXXXXXXXXX";

export async function seedCoach(overrides = {}) {
  return prisma.coach.create({
    data: {
      email: "coach@test.com",
      password_hash: FAKE_HASH,
      name: "Test Coach",
      ...overrides,
    },
  });
}

export async function seedTeam(coachId, overrides = {}) {
  return prisma.team.create({
    data: {
      name: "Test FC",
      coach: { connect: { id: coachId } },
      ...overrides,
    },
  });
}

export async function seedCoachAndTeam() {
  const coach = await seedCoach();
  const team = await seedTeam(coach.id);
  return { coach, team };
}

export async function seedPlayer(teamId, overrides = {}) {
  return prisma.player.create({
    data: {
      first_name: "John",
      last_name: "Doe",
      jersey_number: 10,
      team: { connect: { id: teamId } },
      ...overrides,
    },
  });
}

export async function seedMatch(teamId, overrides = {}) {
  return prisma.match.create({
    data: {
      opponent: "Rival FC",
      location: Location.HOME,
      score_home: 2,
      score_away: 1,
      team: { connect: { id: teamId } },
      ...overrides,
    },
  });
}

export async function seedMatchStats(matchId, playerId, overrides = {}) {
  return prisma.matchStats.create({
    data: {
      match: { connect: { id: matchId } },
      player: { connect: { id: playerId } },
      goals: 0,
      assists: 0,
      minutes_played: 90,
      ...overrides,
    },
  });
}

export async function seedPlayerNote(coachId, playerId, overrides = {}) {
  return prisma.playerNote.create({
    data: {
      coach: { connect: { id: coachId } },
      player: { connect: { id: playerId } },
      content: "Test note",
      ...overrides,
    },
  });
}

export async function seedInviteToken(coachId, matchId, overrides = {}) {
  return prisma.inviteToken.create({
    data: {
      coach: { connect: { id: coachId } },
      match: { connect: { id: matchId } },
      token: "test-token-abc123",
      expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000),
      ...overrides,
    },
  });
}

export async function cleanDb() {
  await prisma.inviteToken.deleteMany();
  await prisma.playerNote.deleteMany();
  await prisma.matchStats.deleteMany();
  await prisma.match.deleteMany();
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();
  await prisma.coach.deleteMany();
}
