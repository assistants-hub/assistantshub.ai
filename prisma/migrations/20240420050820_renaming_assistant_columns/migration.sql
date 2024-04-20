/*
  Warnings:

  - You are about to drop the column `accountOwner` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `accountOwnerType` on the `Assistant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assistant" RENAME CONSTRAINT "Assistant_accountOwner_accountOwnerType_fkey" TO "Assistant_organizationOwner_organizationOwnerType_fkey";

-- AlterTable
ALTER TABLE "Assistant" RENAME COLUMN "accountOwner" TO "organizationOwner";
ALTER TABLE "Assistant" RENAME COLUMN "accountOwnerType" TO "organizationOwnerType";

