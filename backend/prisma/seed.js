import { PrismaClient, Location } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete all data before seeding
  await prisma.coach.deleteMany();
  await prisma.team.deleteMany();
  await prisma.player.deleteMany();
  //await prisma.match.deleteMany();
  //await prisma.matchstats.deleteMany();
  //await prisma.playernote.deleteMany();
  //await prisma.invitetoken.deleteMany();

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
