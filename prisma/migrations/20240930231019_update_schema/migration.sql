-- CreateTable
CREATE TABLE `Restaurant` (
    `restaurantID` INTEGER NOT NULL AUTO_INCREMENT,
    `contactNumber` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `restaurantName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`restaurantID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'user') NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservedById` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReservationDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationID` INTEGER NOT NULL,

    UNIQUE INDEX `ReservationDetail_reservationID_key`(`reservationID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RestaurantTables` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('booked', 'unbooked') NOT NULL,
    `reservationID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReservationDetailandItems` (
    `reservationdetailsID` INTEGER NOT NULL,
    `itemsID` INTEGER NOT NULL,

    PRIMARY KEY (`reservationdetailsID`, `itemsID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_reservedById_fkey` FOREIGN KEY (`reservedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationDetail` ADD CONSTRAINT `ReservationDetail_reservationID_fkey` FOREIGN KEY (`reservationID`) REFERENCES `Reservations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestaurantTables` ADD CONSTRAINT `RestaurantTables_reservationID_fkey` FOREIGN KEY (`reservationID`) REFERENCES `Reservations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationDetailandItems` ADD CONSTRAINT `ReservationDetailandItems_itemsID_fkey` FOREIGN KEY (`itemsID`) REFERENCES `Items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationDetailandItems` ADD CONSTRAINT `ReservationDetailandItems_reservationdetailsID_fkey` FOREIGN KEY (`reservationdetailsID`) REFERENCES `ReservationDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
