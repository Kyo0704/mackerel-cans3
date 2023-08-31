-- CreateTable
CREATE TABLE `User` (
    `uid` VARCHAR(255) NOT NULL,
    `uname` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Classification` (
    `cid` VARCHAR(255) NOT NULL,
    `cname` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`cid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `pid` VARCHAR(255) NOT NULL,
    `pname` VARCHAR(255) NOT NULL,
    `price` INTEGER NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `cid` VARCHAR(255) NOT NULL,
    `production_area` VARCHAR(255) NULL,
    `volume` VARCHAR(255) NULL,
    `expiry_date` DATETIME(3) NULL,

    PRIMARY KEY (`pid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Store` (
    `sid` VARCHAR(255) NOT NULL,
    `sname` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `State` (
    `stid` VARCHAR(255) NOT NULL,
    `stname` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`stid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Classification_state` (
    `stid` VARCHAR(255) NOT NULL,
    `cid` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`stid`, `cid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Discount` (
    `pid` VARCHAR(255) NOT NULL,
    `sid` VARCHAR(255) NOT NULL,
    `dprice` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `stid` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`pid`, `sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Registered_stores` (
    `uid` VARCHAR(255) NOT NULL,
    `sid` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`uid`, `sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `eid` VARCHAR(255) NOT NULL,
    `ename` VARCHAR(255) NOT NULL,
    `sid` VARCHAR(255) NOT NULL,
    `jid` VARCHAR(255) NOT NULL,
    `pass` VARCHAR(255) NULL,

    PRIMARY KEY (`eid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Job` (
    `jid` VARCHAR(255) NOT NULL,
    `jname` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`jid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_cid_fkey` FOREIGN KEY (`cid`) REFERENCES `Classification`(`cid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classification_state` ADD CONSTRAINT `Classification_state_stid_fkey` FOREIGN KEY (`stid`) REFERENCES `State`(`stid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classification_state` ADD CONSTRAINT `Classification_state_cid_fkey` FOREIGN KEY (`cid`) REFERENCES `Classification`(`cid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_pid_fkey` FOREIGN KEY (`pid`) REFERENCES `Product`(`pid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_sid_fkey` FOREIGN KEY (`sid`) REFERENCES `Store`(`sid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_stid_fkey` FOREIGN KEY (`stid`) REFERENCES `State`(`stid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registered_stores` ADD CONSTRAINT `Registered_stores_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registered_stores` ADD CONSTRAINT `Registered_stores_sid_fkey` FOREIGN KEY (`sid`) REFERENCES `Store`(`sid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_sid_fkey` FOREIGN KEY (`sid`) REFERENCES `Store`(`sid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_jid_fkey` FOREIGN KEY (`jid`) REFERENCES `Job`(`jid`) ON DELETE RESTRICT ON UPDATE CASCADE;
