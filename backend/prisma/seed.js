import { PrismaClient, Location } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Delete all data before seeding
  await prisma.coach.deleteMany();
  await prisma.team.deleteMany();
  await prisma.player.deleteMany();
  await prisma.match.deleteMany();
  await prisma.matchStats.deleteMany();
  await prisma.playerNote.deleteMany();
  await prisma.inviteToken.deleteMany();

  // Create a test coach
  const hash = await bcrypt.hash("123passwordhash321", 10);
  const coach = await prisma.coach.create({
    data: {
      email: "coachmail@mail.com",
      password_hash: hash,
      name: "coolcoach123",
    },
  });

  // Create a test team and link with coach
  const team = await prisma.team.create({
    data: {
      name: "cool team",
      coach: {
        connect: { id: coach.id },
      },
    },
  });

  // Create player seed
  const player1 = await prisma.player.create({
    data: {
      first_name: "pelle",
      last_name: "pedel",
      team: {
        connect: { id: team.id },
      },
      jersey_number: 69,
    },
  });
  const player2 = await prisma.player.create({
    data: {
      first_name: "søren",
      last_name: "larsen",
      team: {
        connect: { id: team.id },
      },
      jersey_number: 67,
    },
  });

  // Create match seed
  const match = await prisma.match.create({
    data: {
      opponent: "De seje rejer",
      location: Location.AWAY,
      score_home: 67,
      score_away: 69,
      result: "loss",
      team: {
        connect: { id: team.id },
      },
    },
  });

  // Create match stats seed
  const match_stats1 = await prisma.matchStats.create({
    data: {
      match: {
        connect: { id: match.id },
      },
      player: {
        connect: { id: player1.id },
      },
      goals: 100,
    },
  });

  const match_stats2 = await prisma.matchStats.create({
    data: {
      match: {
        connect: { id: match.id },
      },
      player: {
        connect: { id: player2.id },
      },
      goals: 50,
    },
  });

  // Create player note seed
  const player_note1 = await prisma.playerNote.create({
    data: {
      coach: {
        connect: { id: coach.id },
      },
      player: {
        connect: { id: player1.id },
      },
      content: "Ham her er en lille lømmel",
    },
  });

  const player_note2 = await prisma.playerNote.create({
    data: {
      coach: {
        connect: { id: coach.id },
      },
      player: {
        connect: { id: player2.id },
      },
      content: "Godt spillet sidste kamp :)",
    },
  });

  // Create a invite token seed
  const invite_token = await prisma.inviteToken.create({
    data: {
      coach: {
        connect: { id: coach.id },
      },
      match: {
        connect: { id: match.id },
      },
      token: "1234tokenhejjegerentoken69420",
      expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000), // expires om 2 timer
    },
  });

  [
    {
      name: "COACH",
      content: coach,
    },
    {
      name: "TEAM",
      content: team,
    },
    {
      name: "PLAYER 1",
      content: player1,
    },
    {
      name: "PLAYER ",
      content: player2,
    },
    {
      name: "MATCH",
      content: match,
    },
    {
      name: "MATCH STATS PLAYER 1",
      content: match_stats1,
    },
    {
      name: "MATCH STATS PLAYER 2",
      content: match_stats2,
    },
    {
      name: "PLAYER NOTE 1",
      content: player_note1,
    },
    {
      name: "PLAYER NOTE 2",
      content: player_note2,
    },
    {
      name: "INVITE TOKEN",
      content: invite_token,
    },
  ].forEach((seed) => {
    console.log(
      `${"-".repeat(15)} ### ${seed.name} SEED ### ${"-".repeat(15)}`,
    );
    console.log(seed.content);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
