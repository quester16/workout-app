/*
  Warnings:

  - You are about to drop the column `exerciseType` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `reps` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the `Logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseToWorkout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExerciseToWorkout" DROP CONSTRAINT "_ExerciseToWorkout_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToWorkout" DROP CONSTRAINT "_ExerciseToWorkout_B_fkey";

-- DropIndex
DROP INDEX "Exercise_name_key";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "exerciseType",
DROP COLUMN "reps";

-- DropTable
DROP TABLE "Logs";

-- DropTable
DROP TABLE "_ExerciseToWorkout";

-- CreateTable
CREATE TABLE "ExerciseDefinition" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upadated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "exerciseType" TEXT NOT NULL,

    CONSTRAINT "ExerciseDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseSet" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upadated_at" TIMESTAMP(3) NOT NULL,
    "weight" INTEGER NOT NULL,
    "repeat" INTEGER NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "ExerciseSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseDefinitionToWorkout" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseDefinition_name_key" ON "ExerciseDefinition"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseDefinitionToWorkout_AB_unique" ON "_ExerciseDefinitionToWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseDefinitionToWorkout_B_index" ON "_ExerciseDefinitionToWorkout"("B");

-- AddForeignKey
ALTER TABLE "ExerciseSet" ADD CONSTRAINT "ExerciseSet_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseDefinitionToWorkout" ADD CONSTRAINT "_ExerciseDefinitionToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "ExerciseDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseDefinitionToWorkout" ADD CONSTRAINT "_ExerciseDefinitionToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
