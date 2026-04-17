import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete all coaches before seeding
  await prisma.coach.deleteMany();

  // Delete all teams
  await prisma.team.deleteMany();

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

  console.log(coach, team);
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
