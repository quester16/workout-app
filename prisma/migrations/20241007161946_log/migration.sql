-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upadated_at" TIMESTAMP(3) NOT NULL,
    "previous" TEXT NOT NULL,
    "current" JSONB NOT NULL,
    "completed" BOOLEAN NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);
