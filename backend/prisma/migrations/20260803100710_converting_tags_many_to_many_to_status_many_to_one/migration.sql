/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ResourceToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ResourceToTag" DROP CONSTRAINT "_ResourceToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ResourceToTag" DROP CONSTRAINT "_ResourceToTag_B_fkey";

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "statusId" INTEGER;

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_ResourceToTag";

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
