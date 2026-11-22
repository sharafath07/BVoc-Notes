CREATE TABLE "ChatRoom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "audienceKey" TEXT NOT NULL,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ChatRoom_audienceKey_name_key" ON "ChatRoom"("audienceKey", "name");
CREATE INDEX "ChatRoom_createdById_idx" ON "ChatRoom"("createdById");
ALTER TABLE "ChatRoom" ADD CONSTRAINT "ChatRoom_createdById_fkey"
    FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
