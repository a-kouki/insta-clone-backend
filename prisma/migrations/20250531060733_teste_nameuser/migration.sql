/*
  Warnings:

  - A unique constraint covering the columns `[nameuser]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_user_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "users_nameuser_key" ON "users"("nameuser");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("nameuser") ON DELETE RESTRICT ON UPDATE CASCADE;
