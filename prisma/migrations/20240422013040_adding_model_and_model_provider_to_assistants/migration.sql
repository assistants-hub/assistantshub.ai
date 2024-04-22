-- AlterTable
ALTER TABLE "Assistant" ADD COLUMN     "model" TEXT DEFAULT 'gpt-4-turbo',
ADD COLUMN     "modelProvider" TEXT DEFAULT 'openai';
