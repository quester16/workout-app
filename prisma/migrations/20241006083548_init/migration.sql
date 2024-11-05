-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upadated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "exerciseType" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_id_key" ON "Exercise"("id");
