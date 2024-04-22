/*
  Warnings:

  - You are about to drop the column `model` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `modelProvider` on the `Assistant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Assistant" DROP COLUMN "model",
DROP COLUMN "modelProvider",
ADD COLUMN     "modelId" TEXT DEFAULT 'gpt-4-turbo',
ADD COLUMN     "modelProviderId" TEXT DEFAULT 'openai';

-- AddForeignKey
ALTER TABLE "Assistant" ADD CONSTRAINT "Assistant_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assistant" ADD CONSTRAINT "Assistant_modelProviderId_fkey" FOREIGN KEY ("modelProviderId") REFERENCES "ModelProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
