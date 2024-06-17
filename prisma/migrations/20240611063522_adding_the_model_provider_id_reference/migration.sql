/*
  Warnings:

  - Added the required column `modelProviderId` to the `ModelProviderKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModelProviderKey" ADD COLUMN     "modelProviderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ModelProviderKey" ADD CONSTRAINT "ModelProviderKey_modelProviderId_fkey" FOREIGN KEY ("modelProviderId") REFERENCES "ModelProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
