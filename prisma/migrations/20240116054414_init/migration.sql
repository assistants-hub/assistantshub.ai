-- CreateTable
CREATE TABLE "Credentials" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "ownerType" TEXT NOT NULL DEFAULT 'personal',
    "openAIApiKey" TEXT NOT NULL,

    CONSTRAINT "Credentials_pkey" PRIMARY KEY ("id")
);
