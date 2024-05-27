-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT;

-- CreateTable
CREATE TABLE "System" (
    "id" TEXT NOT NULL,
    "adminUserCreated" BOOLEAN NOT NULL,
    "authProviders" JSONB,
    "modelProviders" JSONB,
    "emailServer" JSONB,
    "blobStorage" JSONB,
    "agreeToTerms" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "System_pkey" PRIMARY KEY ("id")
);
