import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

global.prisma = prisma;

afterAll(async () => {
  await prisma.$disconnect();
});
