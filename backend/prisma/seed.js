import { PrismaClient, Location } from "@prisma/client";

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
  const coach = await prisma.coach.create({
    data: {
      email: "coachmail@mail.com",
      password_hash: "123passwordhash321",
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
  const player = await prisma.player.create({
    data: {
      first_name: "pelle",
      last_name: "pedel",
      team: {
        connect: { id: team.id },
      },
      jersey_number: 69,
    },
  });

  // Create match seed
  const match = await prisma.match.create({
    data: {
      opponent: "De seje rejer",
      location: Location.AWAY,
      score_home: 67,
      score_away: 69,
      team: {
        connect: { id: team.id },
      },
    },
  });

  // Create match stats seed
  const match_stats = await prisma.matchStats.create({
    data: {
      match: {
        connect: { id: match.id },
      },
      player: {
        connect: { id: player.id },
      },
    },
  });

  // Create player note seed
  const player_note = await prisma.playerNote.create({
    data: {
      coach: {
        connect: { id: coach.id },
      },
      player: {
        connect: { id: player.id },
      },
      content: "Ham her er en lille lømmel",
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
      name: "PLAYER",
      content: player,
    },
    {
      name: "MATCH",
      content: match,
    },
    {
      name: "MATCH STATS",
      content: match_stats,
    },
    {
      name: "PLAYER NOTE",
      content: player_note,
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
