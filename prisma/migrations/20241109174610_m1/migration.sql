/*
  Warnings:

  - Added the required column `quantity` to the `ReservedItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reserveditem` ADD COLUMN `quantity` INTEGER NOT NULL;
