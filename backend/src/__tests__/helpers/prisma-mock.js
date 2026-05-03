import { vi } from "vitest";

export const prismaMock = {
  coach: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  team: {
    findUnique: vi.fn(),
    create: vi.fn(),
  },
  player: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  match: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  matchStats: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    upsert: vi.fn(),
  },
  playerNote: {
    findMany: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
  inviteToken: {
    findFirst: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
  $connect: vi.fn(),
  $disconnect: vi.fn(),
  $transaction: vi.fn(),
};

vi.mock("../../lib/prisma", () => ({
  prisma: prismaMock,
}));
