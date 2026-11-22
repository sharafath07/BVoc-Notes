CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "roomKey" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ChatMessage_roomKey_createdAt_id_idx" ON "ChatMessage"("roomKey", "createdAt", "id");
CREATE INDEX "ChatMessage_authorId_idx" ON "ChatMessage"("authorId");
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_authorId_fkey"
    FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
