/*
  Warnings:

  - You are about to drop the column `shots` on the `MatchStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MatchStats" DROP COLUMN "shots",
ADD COLUMN     "shots_off_goal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shots_on_goal" INTEGER NOT NULL DEFAULT 0;
