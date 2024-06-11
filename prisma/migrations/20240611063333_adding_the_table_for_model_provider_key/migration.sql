-- AlterTable
ALTER TABLE "Assistant" ADD COLUMN     "modelProviderKeyId" TEXT;

-- CreateTable
CREATE TABLE "ModelProviderKey" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" JSONB,
    "organizationOwner" TEXT,
    "organizationOwnerType" TEXT,

    CONSTRAINT "ModelProviderKey_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModelProviderKey" ADD CONSTRAINT "ModelProviderKey_organizationOwner_organizationOwnerType_fkey" FOREIGN KEY ("organizationOwner", "organizationOwnerType") REFERENCES "Organization"("owner", "ownerType") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assistant" ADD CONSTRAINT "Assistant_modelProviderKeyId_fkey" FOREIGN KEY ("modelProviderKeyId") REFERENCES "ModelProviderKey"("id") ON DELETE SET NULL ON UPDATE CASCADE;
