-- CreateTable
CREATE TABLE "Assistant" (
    "id" TEXT NOT NULL,
    "credentialsOwner" TEXT,
    "credentialsOwnerType" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assistant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assistant" ADD CONSTRAINT "Assistant_credentialsOwner_credentialsOwnerType_fkey" FOREIGN KEY ("credentialsOwner", "credentialsOwnerType") REFERENCES "Credentials"("owner", "ownerType") ON DELETE SET NULL ON UPDATE CASCADE;
