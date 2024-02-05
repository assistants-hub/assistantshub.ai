/*
  Warnings:

  - You are about to drop the column `assistantsPerAccount` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "assistantsPerAccount",
ADD COLUMN     "limitAssistants" INTEGER NOT NULL DEFAULT 2;
