/*
  Warnings:

  - You are about to drop the column `anthropicApiKey` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `googleAIStudioKey` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `groqCloudApiKey` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `openAIApiKey` on the `Organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "anthropicApiKey",
DROP COLUMN "googleAIStudioKey",
DROP COLUMN "groqCloudApiKey",
DROP COLUMN "openAIApiKey";
