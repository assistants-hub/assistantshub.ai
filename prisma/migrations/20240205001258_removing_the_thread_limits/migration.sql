/*
  Warnings:

  - You are about to drop the column `limitRunsPerDay` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `limitThreadsPerDay` on the `Assistant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Assistant" DROP COLUMN "limitRunsPerDay",
DROP COLUMN "limitThreadsPerDay";
