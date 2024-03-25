/*
  Warnings:

  - You are about to drop the column `created_at` on the `Metric` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[assistantId,name,time]` on the table `Metric` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Metric_assistantId_name_created_at_key";

-- AlterTable
ALTER TABLE "Metric" DROP COLUMN "created_at",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Metric_assistantId_name_time_key" ON "Metric"("assistantId", "name", "time");
