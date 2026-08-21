-- CreateTable
CREATE TABLE "NavItem" (
    "id" SERIAL NOT NULL,
    "title" JSONB NOT NULL,
    "subtitle" JSONB,
    "description" JSONB,
    "image" TEXT,
    "href" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NavItem_pkey" PRIMARY KEY ("id")
);
