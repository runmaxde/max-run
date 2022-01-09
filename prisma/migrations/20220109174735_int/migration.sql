-- CreateTable
CREATE TABLE "PageViews" (
    "id" SERIAL NOT NULL,
    "pathname" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "lastViewd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageViews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageViews_pathname_key" ON "PageViews"("pathname");
