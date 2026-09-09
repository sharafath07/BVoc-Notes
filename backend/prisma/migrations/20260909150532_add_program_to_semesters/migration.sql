/*
  Add Program hierarchy to Semester.

  Existing semesters are assigned to FYUG.
*/

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Program_name_key" ON "Program"("name");

-- Insert existing FYUG program
INSERT INTO "Program" ("id", "name", "createdAt", "updatedAt")
VALUES (
    'fyug-program',
    'FYUG',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

INSERT INTO "Program" ("id", "name", "createdAt", "updatedAt")
VALUES (
    'ug-program',
    'UG',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Add programId as nullable first
ALTER TABLE "Semester"
ADD COLUMN "programId" TEXT;

-- Assign all existing semesters to FYUG
UPDATE "Semester"
SET "programId" = 'fyug-program';

-- Make programId required
ALTER TABLE "Semester"
ALTER COLUMN "programId" SET NOT NULL;

-- Drop the old globally unique semester number
DROP INDEX "Semester_number_key";

-- Create program-scoped unique constraint
CREATE UNIQUE INDEX "Semester_number_programId_key"
ON "Semester"("number", "programId");

-- Create index for program lookup
CREATE INDEX "Semester_programId_idx"
ON "Semester"("programId");

-- Add foreign key
ALTER TABLE "Semester"
ADD CONSTRAINT "Semester_programId_fkey"
FOREIGN KEY ("programId")
REFERENCES "Program"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;