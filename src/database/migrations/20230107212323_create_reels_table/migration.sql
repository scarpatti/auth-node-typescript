-- CreateTable
CREATE TABLE "reels" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device_code" INTEGER NOT NULL,
    "fleet" TEXT NOT NULL,
    "hose_length" INTEGER NOT NULL,
    "hose_diameter" INTEGER NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "reels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reels_device_code_company_id_key" ON "reels"("device_code", "company_id");

-- AddForeignKey
ALTER TABLE "reels" ADD CONSTRAINT "reels_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
