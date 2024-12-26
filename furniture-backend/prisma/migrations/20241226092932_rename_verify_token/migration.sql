/*
  Warnings:

  - You are about to drop the column `verifyTokens` on the `Otp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Otp" RENAME COLUMN "verifyTokens" TO "verifyToken";
