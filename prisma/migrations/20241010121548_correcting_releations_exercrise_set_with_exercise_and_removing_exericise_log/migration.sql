/*
  Warnings:

  - You are about to drop the column `exerciseType` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the `ExerciseLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseSet" DROP CONSTRAINT "ExerciseSet_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "exerciseType",
ADD COLUMN     "exercise_type" TEXT;

-- DropTable
DROP TABLE "ExerciseLog";

-- AddForeignKey
ALTER TABLE "ExerciseSet" ADD CONSTRAINT "ExerciseSet_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
