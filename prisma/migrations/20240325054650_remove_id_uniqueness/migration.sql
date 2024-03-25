/*
  Warnings:

  - The primary key for the `Metric` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `assistantId` on table `Metric` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Metric" DROP CONSTRAINT "Metric_pkey",
ALTER COLUMN "assistantId" SET NOT NULL;
