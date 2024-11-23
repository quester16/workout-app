/*
  Warnings:

  - You are about to drop the column `created_at` on the `ExerciseSet` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseId` on the `ExerciseSet` table. All the data in the column will be lost.
  - You are about to drop the column `repeat` on the `ExerciseSet` table. All the data in the column will be lost.
  - You are about to drop the column `upadated_at` on the `ExerciseSet` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `upadated_at` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `exerciseLogId` to the `ExerciseSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repetitions` to the `ExerciseSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExerciseSet" DROP CONSTRAINT "ExerciseSet_exerciseId_fkey";

-- AlterTable
ALTER TABLE "ExerciseSet" DROP COLUMN "created_at",
DROP COLUMN "exerciseId",
DROP COLUMN "repeat",
DROP COLUMN "upadated_at",
ADD COLUMN     "exerciseLogId" INTEGER NOT NULL,
ADD COLUMN     "repetitions" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "created_at",
DROP COLUMN "upadated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ExerciseLog" (
    "id" SERIAL NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ExerciseLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseLog" ADD CONSTRAINT "ExerciseLog_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseLog" ADD CONSTRAINT "ExerciseLog_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseSet" ADD CONSTRAINT "ExerciseSet_exerciseLogId_fkey" FOREIGN KEY ("exerciseLogId") REFERENCES "ExerciseLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
