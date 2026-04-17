-- CreateTable
CREATE TABLE "Team" (
    "id" UUID NOT NULL,
    "coach_id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_coach_id_key" ON "Team"("coach_id");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
