/*
  Warnings:

  - You are about to drop the column `reservationId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_reservationId_fkey`;

-- AlterTable
ALTER TABLE `Item` DROP COLUMN `reservationId`;

-- CreateTable
CREATE TABLE `ReservedItem` (
    `reservationId` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,

    PRIMARY KEY (`reservationId`, `itemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReservedItem` ADD CONSTRAINT `ReservedItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservedItem` ADD CONSTRAINT `ReservedItem_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
