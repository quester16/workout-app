/*
  Warnings:

  - You are about to drop the column `exercise_type` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `upadated_at` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `upadated_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the `ExerciseLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExerciseSet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `icon_path` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `times` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_userId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseLog" DROP CONSTRAINT "ExerciseLog_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseLog" DROP CONSTRAINT "ExerciseLog_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseSet" DROP CONSTRAINT "ExerciseSet_exerciseLogId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_userId_fkey";

-- DropIndex
DROP INDEX "Exercise_name_key";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "exercise_type",
DROP COLUMN "sets",
DROP COLUMN "upadated_at",
DROP COLUMN "userId",
ADD COLUMN     "icon_path" TEXT NOT NULL,
ADD COLUMN     "times" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "upadated_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "createdAt",
DROP COLUMN "isCompleted",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "ExerciseLog";

-- DropTable
DROP TABLE "ExerciseSet";

-- CreateTable
CREATE TABLE "Exercise_log" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER,
    "workout_log_id" INTEGER,
    "exercise_id" INTEGER,

    CONSTRAINT "Exercise_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise_time" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 0,
    "repeat" INTEGER NOT NULL DEFAULT 0,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "exercise_log_id" INTEGER,

    CONSTRAINT "Exercise_time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout_log" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER,
    "workout_id" INTEGER,

    CONSTRAINT "Workout_log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise_log" ADD CONSTRAINT "Exercise_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise_log" ADD CONSTRAINT "Exercise_log_workout_log_id_fkey" FOREIGN KEY ("workout_log_id") REFERENCES "Workout_log"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise_log" ADD CONSTRAINT "Exercise_log_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise_time" ADD CONSTRAINT "Exercise_time_exercise_log_id_fkey" FOREIGN KEY ("exercise_log_id") REFERENCES "Exercise_log"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout_log" ADD CONSTRAINT "Workout_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout_log" ADD CONSTRAINT "Workout_log_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
