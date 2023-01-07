-- CreateEnum
CREATE TYPE "PumpType" AS ENUM ('MOTO', 'ELETRO');

-- CreateTable
CREATE TABLE "pumps" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "PumpType" NOT NULL,
    "device_code" INTEGER NOT NULL,
    "fleet" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "pumps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pumps_device_code_company_id_key" ON "pumps"("device_code", "company_id");

-- AddForeignKey
ALTER TABLE "pumps" ADD CONSTRAINT "pumps_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
