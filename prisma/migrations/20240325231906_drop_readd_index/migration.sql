-- DropIndex
DROP INDEX IF EXISTS "Metric_assistantId_name_time_key";

-- CreateIndex
CREATE UNIQUE INDEX "Metric_assistantId_name_time_key" ON "Metric"("assistantId", "name", "time");