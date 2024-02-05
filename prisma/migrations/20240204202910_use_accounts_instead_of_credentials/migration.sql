/*
  Warnings:

  - You are about to drop the column `credentialsOwner` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `credentialsOwnerType` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the `Credentials` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `limitRunsPerDay` to the `Assistant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limitThreadsPerDay` to the `Assistant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assistant" DROP CONSTRAINT "Assistant_credentialsOwner_credentialsOwnerType_fkey";

-- AlterTable
ALTER TABLE "Assistant" DROP COLUMN "credentialsOwner",
DROP COLUMN "credentialsOwnerType",
ADD COLUMN     "accountOwner" TEXT,
ADD COLUMN     "accountOwnerType" TEXT,
ADD COLUMN     "extendedAssistant" JSONB,
ADD COLUMN     "limitRunsPerDay" INTEGER NOT NULL,
ADD COLUMN     "limitThreadsPerDay" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Credentials";

-- CreateTable
CREATE TABLE "Account" (
    "owner" TEXT NOT NULL,
    "ownerType" TEXT NOT NULL DEFAULT 'personal',
    "openAIApiKey" TEXT NOT NULL,
    "assistantsPerAccount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("owner","ownerType")
);

-- AddForeignKey
ALTER TABLE "Assistant" ADD CONSTRAINT "Assistant_accountOwner_accountOwnerType_fkey" FOREIGN KEY ("accountOwner", "accountOwnerType") REFERENCES "Account"("owner", "ownerType") ON DELETE SET NULL ON UPDATE CASCADE;
