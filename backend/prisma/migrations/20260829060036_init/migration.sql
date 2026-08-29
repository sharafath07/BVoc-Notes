/*
  Warnings:

  - You are about to drop the column `fileSize` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `Resource` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "fileSize",
DROP COLUMN "mimeType";
