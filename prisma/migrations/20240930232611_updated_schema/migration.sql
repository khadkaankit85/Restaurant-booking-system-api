/*
  Warnings:

  - The primary key for the `Restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `restaurantID` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the `Items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReservationDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReservationDetailandItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reservations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantTables` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ReservationDetail` DROP FOREIGN KEY `ReservationDetail_reservationID_fkey`;

-- DropForeignKey
ALTER TABLE `ReservationDetailandItems` DROP FOREIGN KEY `ReservationDetailandItems_itemsID_fkey`;

-- DropForeignKey
ALTER TABLE `ReservationDetailandItems` DROP FOREIGN KEY `ReservationDetailandItems_reservationdetailsID_fkey`;

-- DropForeignKey
ALTER TABLE `Reservations` DROP FOREIGN KEY `Reservations_reservedById_fkey`;

-- DropForeignKey
ALTER TABLE `RestaurantTables` DROP FOREIGN KEY `RestaurantTables_reservationID_fkey`;

-- AlterTable
ALTER TABLE `Restaurant` DROP PRIMARY KEY,
    DROP COLUMN `restaurantID`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Items`;

-- DropTable
DROP TABLE `ReservationDetail`;

-- DropTable
DROP TABLE `ReservationDetailandItems`;

-- DropTable
DROP TABLE `Reservations`;

-- DropTable
DROP TABLE `RestaurantTables`;

-- CreateTable
CREATE TABLE `Reservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservedById` INTEGER NOT NULL,
    `tableId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Table` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('booked', 'unbooked') NOT NULL,
    `restaurantId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `reservationId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_reservedById_fkey` FOREIGN KEY (`reservedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `Table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table` ADD CONSTRAINT `Table_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
