/*
  Warnings:

  - You are about to drop the column `descrition` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "descrition",
ADD COLUMN     "description" TEXT;
