-- AlterTable
ALTER TABLE "MatchStats" ADD COLUMN     "free_throws" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "penalty_throws" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "two_min_susp" INTEGER NOT NULL DEFAULT 0;
