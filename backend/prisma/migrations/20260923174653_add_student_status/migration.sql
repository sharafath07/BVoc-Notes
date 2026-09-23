/*
  Warnings:

  - You are about to drop the column `department` on the `TeacherProfile` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `TeacherProfile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('ACTIVE', 'ALUMNI');

-- DropIndex
DROP INDEX "TeacherProfile_employeeId_key";

-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "status" "StudentStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "TeacherProfile" DROP COLUMN "department",
DROP COLUMN "employeeId";
