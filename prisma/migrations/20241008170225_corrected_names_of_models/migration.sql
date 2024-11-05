/*
  Warnings:

  - You are about to drop the `ExerciseDefinition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseDefinitionToWorkout` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ExerciseSet" DROP CONSTRAINT "ExerciseSet_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseDefinitionToWorkout" DROP CONSTRAINT "_ExerciseDefinitionToWorkout_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseDefinitionToWorkout" DROP CONSTRAINT "_ExerciseDefinitionToWorkout_B_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "exerciseType" TEXT,
ADD COLUMN     "reps" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "ExerciseDefinition";

-- DropTable
DROP TABLE "_ExerciseDefinitionToWorkout";

-- CreateTable
CREATE TABLE "ExerciseLog" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upadated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ExerciseLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToWorkout" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToWorkout_AB_unique" ON "_ExerciseToWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToWorkout_B_index" ON "_ExerciseToWorkout"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_key" ON "Exercise"("name");

-- AddForeignKey
ALTER TABLE "ExerciseSet" ADD CONSTRAINT "ExerciseSet_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "ExerciseLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkout" ADD CONSTRAINT "_ExerciseToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkout" ADD CONSTRAINT "_ExerciseToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
