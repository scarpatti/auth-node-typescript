-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" INTEGER NOT NULL,
    "pumpId" INTEGER NOT NULL,
    "reelId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "groups_pumpId_key" ON "groups"("pumpId");

-- CreateIndex
CREATE UNIQUE INDEX "groups_reelId_key" ON "groups"("reelId");

-- CreateIndex
CREATE UNIQUE INDEX "groups_cartId_key" ON "groups"("cartId");

-- CreateIndex
CREATE UNIQUE INDEX "groups_code_company_id_key" ON "groups"("code", "company_id");

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_pumpId_fkey" FOREIGN KEY ("pumpId") REFERENCES "pumps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_reelId_fkey" FOREIGN KEY ("reelId") REFERENCES "reels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
