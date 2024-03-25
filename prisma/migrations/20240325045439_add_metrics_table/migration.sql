-- CreateTable
CREATE TABLE "Metric" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "assistantId" TEXT,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "tags" JSONB,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);
