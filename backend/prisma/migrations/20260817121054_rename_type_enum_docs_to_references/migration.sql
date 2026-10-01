/*
  Warnings:

  - The values [Docs] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "Type" RENAME VALUE 'Docs' TO 'References';
