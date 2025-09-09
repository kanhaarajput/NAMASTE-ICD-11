-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "profession" TEXT,
    "organization" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SavedRecord" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT NOT NULL,
    "saveLocation" TEXT NOT NULL,
    "notes" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SavedRecordCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "system" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,

    CONSTRAINT "SavedRecordCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "public"."User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "SavedRecord_userId_idx" ON "public"."SavedRecord"("userId");

-- CreateIndex
CREATE INDEX "SavedRecordCode_recordId_idx" ON "public"."SavedRecordCode"("recordId");

-- AddForeignKey
ALTER TABLE "public"."SavedRecord" ADD CONSTRAINT "SavedRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SavedRecordCode" ADD CONSTRAINT "SavedRecordCode_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "public"."SavedRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
