ALTER TABLE "User"
ADD COLUMN "username" TEXT,
ADD CONSTRAINT "User_username_format_check" CHECK ("username" ~ '^[a-z0-9_]{3,24}$');

CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
