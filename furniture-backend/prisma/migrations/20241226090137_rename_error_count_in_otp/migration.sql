/*
  Warnings:

  - You are about to drop the column `error` on the `Otp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "error",
ADD COLUMN     "errorCount" SMALLINT NOT NULL DEFAULT 0;
