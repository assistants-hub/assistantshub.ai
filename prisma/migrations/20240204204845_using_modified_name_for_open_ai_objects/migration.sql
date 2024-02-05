/*
  Warnings:

  - You are about to drop the column `extendedAssistant` on the `Assistant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Assistant" DROP COLUMN "extendedAssistant",
ADD COLUMN     "object" JSONB;
