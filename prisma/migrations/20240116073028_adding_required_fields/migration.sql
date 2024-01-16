/*
  Warnings:

  - The primary key for the `Credentials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Credentials` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Credentials" DROP CONSTRAINT "Credentials_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Credentials_pkey" PRIMARY KEY ("owner", "ownerType");
