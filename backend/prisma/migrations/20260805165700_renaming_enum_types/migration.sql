/*
  Warnings:

  - The values [Tool,Library,Platform,Extension] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('Tools', 'Docs', 'Libraries', 'Inspiration', 'Services', 'Extensions', 'Social');
ALTER TABLE "public"."Resource" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Resource" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "public"."Type_old";
ALTER TABLE "Resource" ALTER COLUMN "type" SET DEFAULT 'Tools';
COMMIT;

-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "type" SET DEFAULT 'Tools';
