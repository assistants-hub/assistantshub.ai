/*
  Warnings:

  - A unique constraint covering the columns `[assistantId,name,created_at]` on the table `Metric` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Metric" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Metric_assistantId_name_created_at_key" ON "Metric"("assistantId", "name", "created_at");
