-- CreateTable
CREATE TABLE `PageViews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pathname` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 1,
    `lastViewd` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PageViews_pathname_key`(`pathname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
