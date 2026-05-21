/*
  Warnings:

  - You are about to drop the column `yellow_cards` on the `MatchStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "match_time" TEXT NOT NULL DEFAULT '00:00';

-- AlterTable
ALTER TABLE "MatchStats" DROP COLUMN "yellow_cards";
