-- Migración idempotente: algunas BD ya tenían estos cambios aplicados con `db push`,
-- así que cada sentencia comprueba antes si el objeto existe.

-- AlterTable
-- El campo "month" se añadió al schema sin migración (db push).
ALTER TABLE "RecurringTransaction" ADD COLUMN IF NOT EXISTS "month" INTEGER;

-- CreateTable
CREATE TABLE IF NOT EXISTS "RecurringSkip" (
    "id" SERIAL NOT NULL,
    "recurringTransactionId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecurringSkip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "RecurringSkip_recurringTransactionId_year_month_key" ON "RecurringSkip"("recurringTransactionId", "year", "month");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'RecurringSkip_recurringTransactionId_fkey'
    ) THEN
        ALTER TABLE "RecurringSkip" ADD CONSTRAINT "RecurringSkip_recurringTransactionId_fkey" FOREIGN KEY ("recurringTransactionId") REFERENCES "RecurringTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
