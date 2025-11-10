-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.6.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table web2.client
CREATE TABLE IF NOT EXISTS `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `clientTypeId` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT 'default.png',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Client_clientTypeId_fkey` (`clientTypeId`),
  CONSTRAINT `Client_clientTypeId_fkey` FOREIGN KEY (`clientTypeId`) REFERENCES `clienttype` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table web2.client: ~39 rows (approximately)
INSERT INTO `client` (`id`, `name`, `email`, `phone`, `address`, `clientTypeId`, `image`, `createdAt`, `updatedAt`) VALUES
	(1, 'Vibrand', 'vibrand@example.com', '123-456-7926', 'Address 1', NULL, '/client/vibrand.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(2, '7cs', '7cs@example.com', '123-456-7890', 'Address 2', NULL, '/client/7cs.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(3, 'Alefia', 'alefia@example.com', '123-456-7891', 'Address 3', NULL, '/client/Alefia.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(4, 'Alphabet', 'alphabet@example.com', '123-456-7892', 'Address 4', NULL, '/client/Alphabet.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(5, 'Alyasa Village', 'animation@example.com', '123-456-7893', 'Address 5', NULL, '/client/animation.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(6, 'Astella', 'astella@example.com', '123-456-7894', 'Address 6', NULL, '/client/astella.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(7, 'BARBAR Soap', 'barbarsoap@example.com', '123-456-7895', 'Address 7', NULL, '/client/BARBARSoap.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(8, 'Batroun Village Club', 'batrounvillage@example.com', '123-456-7896', 'Address 8', NULL, '/client/batrounvillage.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(9, 'Bkerke', 'bkerke@example.com', '123-456-7897', 'Address 9', NULL, '/client/bkerke.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(10, 'Bkerke Jeune', 'bkerkejeune@example.com', '123-456-7898', 'Address 10', NULL, '/client/BKERKEJEUNE.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(11, 'BuildIts', 'buildits@example.com', '123-456-7899', 'Address 11', NULL, '/client/buildits.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(12, 'CastIron', 'castiron@example.com', '123-456-7900', 'Address 12', NULL, '/client/Castiron.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(13, 'Chia Catering', 'chiacatering@example.com', '123-456-7901', 'Address 13', NULL, '/client/chiacatering.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(14, 'Citizen', 'citizen@example.com', '123-456-7902', 'Address 14', NULL, '/client/citizen.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(15, 'Crushers', 'crushers@example.com', '123-456-7903', 'Address 15', NULL, '/client/Crushers.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(16, 'Fabronia Catering', 'fabroniacatering@example.com', '123-456-7904', 'Address 16', NULL, '/client/fabroniaCATERING.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(17, 'Fabronia Cuisine', 'fabroniacuisine@example.com', '123-456-7905', 'Address 17', NULL, '/client/FabroniaCuisine.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(18, 'Hawerwr Amem', 'hawerwramem@example.com', '123-456-7906', 'Address 18', NULL, '/client/hawerwramem.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(19, 'Hiwar', 'hiwar@example.com', '123-456-7907', 'Address 19', NULL, '/client/hiwar.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(20, 'Hooboor', 'hooboor@example.com', '123-456-7908', 'Address 20', NULL, '/client/hooboor.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(21, 'Lacazelle', 'lacazelle@example.com', '123-456-7909', 'Address 21', NULL, '/client/lacazelle.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(22, 'LAMAR', 'lamar@example.com', '123-456-7910', 'Address 22', NULL, '/client/LAMAR.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(23, 'LeMarche', 'lemarche@example.com', '123-456-7911', 'Address 23', NULL, '/client/lemarche.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(24, 'Logo Cyprus', 'logocyprus@example.com', '123-456-7912', 'Address 24', NULL, '/client/logocyprus.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(25, 'Light Pop Chrispy', 'lpc@example.com', '123-456-7913', 'Address 25', NULL, '/client/LPC.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(26, 'Maktab ra3awiyat lMar2a', 'maktabra3awiyatlmar2a@example.com', '123-456-7914', 'Address 26', NULL, '/client/maktabra3awiyatlMar2a.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(27, 'Mama dounya', 'mamadounya@example.com', '123-456-7915', 'Address 27', NULL, '/client/mamadounya.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(28, 'Martine Icons', 'martineicons@example.com', '123-456-7916', 'Address 28', NULL, '/client/MARTINEICONS.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(29, 'Min al alblelalb', 'minalalblelalb@example.com', '123-456-7917', 'Address 29', NULL, '/client/minalalblelalb.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(30, 'Paracetamour', 'paracetamouranimation@example.com', '123-456-7918', 'Address 30', NULL, '/client/paracetamouranimation.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(31, 'Polanco', 'polanco@example.com', '123-456-7919', 'Address 31', NULL, '/client/Polanco.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(32, 'Rays', 'rays@example.com', '123-456-7920', 'Address 32', NULL, '/client/rays.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(33, 'SAWA', 'sawa@example.com', '123-456-7921', 'Address 33', NULL, '/client/SAWA.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(34, 'Sinodos Khas bel Mar2a', 'sinodoskhasbelmar2a@example.com', '123-456-7922', 'Address 34', NULL, '/client/sinodoskhasbelmar2a.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(35, 'SmartUpEducation', 'smartupeducation@example.com', '123-456-7923', 'Address 35', NULL, '/client/SmartUpeducation.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(37, 'VAL', 'val@example.com', '123-456-7925', 'Address 37', NULL, '/client/VAL.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(38, 'View Lebanon', 'viewlebanon@example.com', '123-456-7927', 'Address 38', NULL, '/client/VIEWLEBANON.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(39, 'WS', 'ws@example.com', '123-456-7928', 'Address 39', NULL, '/client/WS.webm', '2025-05-12 11:33:00.000', '2025-05-12 11:33:00.000'),
	(40, 'HUSJ', 'fghmggx', 'gfgfd', 'jhfxdg', NULL, '/client/default.png', '2025-05-12 23:24:00.000', '2025-05-12 23:24:00.000');

-- Dumping structure for table web2.clienttype
CREATE TABLE IF NOT EXISTS `clienttype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table web2.clienttype: ~0 rows (approximately)

-- Dumping structure for table web2.employee
CREATE TABLE IF NOT EXISTS `employee` (
  `id` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `fatherName` varchar(30) DEFAULT NULL,
  `lastName` varchar(30) NOT NULL,
  `position` varchar(50) DEFAULT NULL,
  `hireDate` datetime(3) DEFAULT NULL,
  `info` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `Employee_id_fkey` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table web2.employee: ~0 rows (approximately)

-- Dumping structure for table web2.milestone
CREATE TABLE IF NOT EXISTS `milestone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `date` datetime(3) DEFAULT current_timestamp(3),
  `dueDate` datetime(3) DEFAULT current_timestamp(3),
  `status` enum('Upcoming','Pending','InProgress','Completed') NOT NULL DEFAULT 'Pending',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Milestone_projectId_fkey` (`projectId`),
  CONSTRAINT `Milestone_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table web2.milestone: ~21 rows (approximately)
INSERT INTO `milestone` (`id`, `projectId`, `name`, `description`, `date`, `dueDate`, `status`, `createdAt`, `updatedAt`) VALUES
	(1, 2, 'Project Kickoff', 'Initial planning meeting and scope confirmation for the Bkerki official website.', '2025-09-01 00:00:00.000', '2025-09-05 00:00:00.000', 'Completed', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(2, 2, 'Content Migration', 'Transfer and format official Bkerki documents and archives to new CMS.', '2025-09-10 00:00:00.000', '2025-09-25 00:00:00.000', 'InProgress', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(3, 2, 'Public Launch', 'Go live with multilingual support and final security audit.', '2025-11-01 00:00:00.000', '2025-11-05 00:00:00.000', 'Upcoming', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(4, 3, 'Design Approval', 'Finalize layout and brand visuals for Alyasa Village site.', '2025-11-10 00:00:00.000', '2025-11-20 00:00:00.000', 'Pending', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(5, 3, 'Development Phase', 'Implement booking and villa showcase pages.', '2025-11-21 00:00:00.000', '2025-12-15 00:00:00.000', 'Upcoming', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(6, 3, 'Testing & Review', 'Internal testing and client feedback round before launch.', '2026-01-05 00:00:00.000', '2026-01-10 00:00:00.000', 'Upcoming', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(7, 4, 'Website Concept', 'Define color palette and snack branding guidelines.', '2024-08-01 00:00:00.000', '2024-08-05 00:00:00.000', 'Completed', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(8, 4, 'Shop Integration', 'Add e-commerce module with product filters and cart.', '2024-08-15 00:00:00.000', '2024-08-30 00:00:00.000', 'InProgress', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(9, 4, 'Marketing Launch', 'Coordinate online ads and website launch campaign.', '2024-09-01 00:00:00.000', '2024-09-10 00:00:00.000', 'Upcoming', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(10, 5, 'Icon Catalog Upload', 'Prepare and upload initial collection of 200 icons.', '2024-07-25 00:00:00.000', '2024-08-05 00:00:00.000', 'Completed', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(11, 5, 'Subscription Setup', 'Add monthly subscription and license system.', '2024-08-10 00:00:00.000', '2024-08-20 00:00:00.000', 'Pending', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(12, 5, 'UI Enhancements', 'Improve navigation and user dashboard visuals.', '2024-08-21 00:00:00.000', '2024-08-30 00:00:00.000', 'Upcoming', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(13, 6, 'Website Redesign', 'Modernize layout and simplify content management.', '2024-07-10 00:00:00.000', '2024-07-22 00:00:00.000', 'Completed', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(14, 6, 'News Section', 'Add new events and community stories section.', '2024-07-25 00:00:00.000', '2024-08-05 00:00:00.000', 'Pending', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(15, 6, 'Launch Event', 'Coordinate with the congregation for launch announcement.', '2024-08-10 00:00:00.000', '2024-08-15 00:00:00.000', 'Upcoming', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(16, 7, 'Initial Brief', 'Define project scope for the HUSJ website revamp.', '2024-09-15 00:00:00.000', '2024-09-20 00:00:00.000', 'Completed', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(17, 7, 'Backend Development', 'Integrate academic database and student access panel.', '2024-09-25 00:00:00.000', '2024-10-10 00:00:00.000', 'InProgress', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(18, 7, 'Beta Launch', 'Deploy preview version for staff feedback.', '2024-10-15 00:00:00.000', '2024-10-20 00:00:00.000', 'Pending', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(19, 8, 'Design Concept', 'Create main visual identity for the Papal youth meeting.', '2025-11-01 00:00:00.000', '2025-11-05 00:00:00.000', 'InProgress', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(20, 8, 'Booklet Printing', 'Finalize and print all booklets and signage materials.', '2025-11-06 00:00:00.000', '2025-11-10 00:00:00.000', 'Pending', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000'),
	(21, 8, 'Event Day', 'Support the media and design team on-site during the Papal visit.', '2025-11-15 00:00:00.000', '2025-11-17 00:00:00.000', 'Upcoming', '2025-11-10 23:07:31.000', '2025-11-10 23:07:31.000');

-- Dumping structure for table web2.project
CREATE TABLE IF NOT EXISTS `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `clientId` int(11) DEFAULT NULL,
  `startDate` datetime(3) DEFAULT current_timestamp(3),
  `deadline` datetime(3) DEFAULT current_timestamp(3),
  `status` enum('Upcoming','Pending','InProgress','Completed') NOT NULL DEFAULT 'Pending',
  `overview` varchar(800) DEFAULT NULL,
  `files` varchar(800) DEFAULT NULL,
  `image` varchar(255) DEFAULT 'default.png',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `public` tinyint(1) NOT NULL DEFAULT 0,
  `code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Project_clientId_fkey` (`clientId`),
  CONSTRAINT `Project_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table web2.project: ~7 rows (approximately)
INSERT INTO `project` (`id`, `name`, `description`, `clientId`, `startDate`, `deadline`, `status`, `overview`, `files`, `image`, `createdAt`, `updatedAt`, `public`, `code`) VALUES
	(2, 'Bkerki Website', 'Designed the official website for the Maronite Patriarchate (Bkerké, Lebanon), showcasing news, archives and institutional info.', 9, '2025-11-02 00:46:52.000', '2025-11-02 00:46:54.000', 'InProgress', 'https://bkerki.org/', NULL, '/bkerki.org_.png', '2025-11-02 00:47:41.000', '2025-11-02 00:47:42.000', 1, 'Bkerki'),
	(3, 'Alyasa Village Website', 'Website for Alyasa Village (Lebanon) retreat-resort: weddings, accommodations and mountain-nature experience showcased online.', 5, '2025-11-02 00:49:33.000', '2025-11-02 00:49:34.000', 'Upcoming', 'https://alyasa.vibrandstudio.com', 'https://drive.google.com/drive/', '/alyasa.vibrandstudio.com_.png', '2025-11-02 00:49:35.000', '2025-11-10 19:47:28.777', 0, 'Alyasa'),
	(4, 'Light Pop Crispy Website', 'Website for Light Pop Crispy – Lebanese brown-rice snack brand (0 sugar, salt, fat) presenting product range and healthy living content.', 25, '2024-09-10 00:00:00.000', '2024-09-10 00:00:00.000', 'Pending', 'https://lightpopcrispy.com', NULL, '/lightpopcrispy.com_.png', '2025-11-02 00:56:34.000', '2025-11-02 00:56:34.000', 1, 'LPC'),
	(5, 'Martine Icons Website', 'Website for Martine Icons, presenting Lebanese iconographer’s portfolio, artist bio and online commission service.', 28, '2024-08-05 00:00:00.000', '2024-08-05 00:00:00.000', 'Pending', 'https://martineicons.com', NULL, '/martineicons.com_.png', '2025-11-02 00:56:34.000', '2025-11-02 00:56:34.000', 1, 'MIcons'),
	(6, 'Sisters of the Cross Website', 'Website for the Sisters of the Cross (Lebanon), presenting their congregation’s mission, ministries and digital presence.', NULL, '2024-07-22 00:00:00.000', '2024-07-22 00:00:00.000', 'Pending', 'https://sistersofthecross.org.lb', NULL, '/sistersofthecross.org.lb_web_.png', '2025-11-02 00:56:34.000', '2025-11-02 00:56:34.000', 1, 'SOTC'),
	(7, 'HUSJ Website', 'Website built for HOPITAL UNIVERSITAIRE SAINT JOSEPH DES SOEURS DE LA CROIX CENTRE MEDICAL RAYMOND & AIDA NAJJAR.', 40, '2024-10-20 00:00:00.000', '2024-10-20 00:00:00.000', 'Pending', 'https://husj.vibrandstudio.com', NULL, '/husj.vibrandstudio.com_.png', '2025-11-02 00:56:34.000', '2025-11-02 00:56:34.000', 1, 'HUSJ'),
	(8, 'Pope Visit', 'Full graphic design, booklets and event materials for the upcoming papal visit to Lebanon, especially the youth meeting at Bkerké.', 10, '2025-11-10 22:48:03.000', '2025-11-10 22:48:04.000', 'Pending', 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto%2F%3Ffbid%3D1148589210790826%26set%3Da.557895589860194&show_text=true&width=500', NULL, '/pope.jpg', '2025-11-10 22:50:29.000', '2025-11-10 22:50:30.000', 1, 'Pope');

-- Dumping structure for table web2.service
CREATE TABLE IF NOT EXISTS `service` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `rate` double NOT NULL,
  `duration` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `image` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table web2.service: ~1 rows (approximately)
INSERT INTO `service` (`id`, `name`, `description`, `rate`, `duration`, `active`, `image`, `createdAt`, `updatedAt`) VALUES
	(1, 'web', 'web', 1, 1, 1, NULL, '2025-11-10 11:43:14.000', '2025-11-10 11:43:15.000');

-- Dumping structure for table web2.task
CREATE TABLE IF NOT EXISTS `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectId` int(11) DEFAULT NULL,
  `createdById` int(11) DEFAULT NULL,
  `assignedToId` int(11) DEFAULT NULL,
  `completedById` int(11) DEFAULT NULL,
  `dueDate` datetime(3) DEFAULT current_timestamp(3),
  `title` varchar(255) NOT NULL,
  `details` text DEFAULT NULL,
  `important` tinyint(1) NOT NULL DEFAULT 0,
  `visibility` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Task_projectId_fkey` (`projectId`),
  KEY `Task_createdById_fkey` (`createdById`),
  KEY `Task_assignedToId_fkey` (`assignedToId`),
  KEY `Task_completedById_fkey` (`completedById`),
  CONSTRAINT `Task_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Task_completedById_fkey` FOREIGN KEY (`completedById`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Task_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Task_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table web2.task: ~55 rows (approximately)
INSERT INTO `task` (`id`, `projectId`, `createdById`, `assignedToId`, `completedById`, `dueDate`, `title`, `details`, `important`, `visibility`, `createdAt`, `updatedAt`) VALUES
	(1, 2, 1, 2, NULL, '2025-11-15 10:00:00.000', 'Kick-off meeting with client', 'Initial meeting to gather requirements for the Bkerki website project.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(2, 2, 1, 3, NULL, '2025-11-18 16:00:00.000', 'Define site map', 'Create site map outlining major pages (Home, News, Archive, Contact) for Bkerki website.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(3, 2, 2, 3, NULL, '2025-11-20 14:00:00.000', 'Wireframe homepage', 'Designer to produce low-fidelity wireframe for homepage for review.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(4, 2, 2, 1, 2, '2025-11-23 12:00:00.000', 'Approve homepage wireframe', 'Client review and approval of homepage wireframe.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(5, 2, 1, 3, NULL, '2025-11-25 15:00:00.000', 'Develop homepage HTML/CSS', 'Developer to build the homepage following approved design.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(6, 2, 3, 2, NULL, '2025-11-28 11:00:00.000', 'Upload initial content', 'Populate the homepage with draft content (text & images).', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(7, 2, 2, 3, NULL, '2025-11-30 09:00:00.000', 'Responsive testing', 'Test the homepage across mobile, tablet, desktop for layout issues.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(8, 2, 1, 2, NULL, '2025-12-02 17:00:00.000', 'SEO metadata review', 'Add and review meta titles/descriptions for homepage and key pages.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(9, 2, 3, 1, NULL, '2025-12-04 13:00:00.000', 'Accessibility audit', 'Review website for accessibility compliance (contrast, alt text) for Bkerki site.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(10, 2, 2, 3, 3, '2025-12-06 15:00:00.000', 'Launch site to staging', 'Move website to staging environment for final QA.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(11, 3, 1, 2, NULL, '2025-12-10 10:00:00.000', 'Brand photo-shoot at resort', 'Organise photo shoot at Alyasa Village grounds.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(12, 3, 1, 3, NULL, '2025-12-12 14:00:00.000', 'Write accommodations copy', 'Draft copy for all accommodation types: rooms, suites, chalets.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(13, 3, 2, 3, NULL, '2025-12-14 11:00:00.000', 'Design accommodation pages', 'Create page layouts for each accommodation type with images.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(14, 3, 3, 2, NULL, '2025-12-16 16:00:00.000', 'Integrate booking widget', 'Implement booking functionality and test end-to-end.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(15, 3, 2, 1, 1, '2025-12-18 13:00:00.000', 'Client feedback session', 'Meet with client to review draft site and collect feedback.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(16, 3, 1, 2, NULL, '2025-12-20 09:00:00.000', 'Revise visuals based on feedback', 'Update images/layouts following client input.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(17, 3, 2, 3, NULL, '2025-12-22 15:00:00.000', 'Mobile layout testing', 'Ensure site is responsive on phones and tablets.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(18, 3, 3, 2, NULL, '2025-12-24 12:00:00.000', 'Content finalisation', 'Lock in all text and images for launch.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(19, 3, 1, 3, NULL, '2025-12-26 17:00:00.000', 'Launch Alyasa website', 'Go live with Alyasa Village site.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(20, 3, 2, 1, NULL, '2025-12-28 10:00:00.000', 'Post-launch analytics setup', 'Install Google Analytics and set event tracking.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(21, 4, 1, 2, NULL, '2025-11-20 11:00:00.000', 'Product photography session', 'Shoot product imagery for Light Pop Crispy snack brand.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(22, 4, 1, 3, NULL, '2025-11-22 14:00:00.000', 'Define product category pages', 'Outline structure for snacking products, flavors, nutrition info.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(23, 4, 2, 1, NULL, '2025-11-24 16:00:00.000', 'Design landing page', 'Create visual mock-up for main landing page of snack brand.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(24, 4, 2, 3, 3, '2025-11-26 09:00:00.000', 'Frontend development', 'Build landing page in HTML/CSS/JS.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(25, 4, 3, 2, NULL, '2025-11-28 12:00:00.000', 'Content upload: nutrition & benefits', 'Add product content, benefits, nutrition tables.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(26, 4, 1, 3, NULL, '2025-11-30 15:00:00.000', 'Shopping cart test', 'Test the e-commerce checkout flow end to end.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(27, 4, 3, 1, NULL, '2025-12-02 10:00:00.000', 'Optimize site speed', 'Perform performance audit and improve load times.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(28, 4, 2, 2, NULL, '2025-12-04 13:00:00.000', 'SEO product pages', 'Add meta tags, alt text, structured data for product pages.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(29, 4, 1, 3, NULL, '2025-12-06 17:00:00.000', 'Launch Light Pop Crispy site', 'Go live with snack brand website.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(30, 4, 3, 2, NULL, '2025-12-08 11:00:00.000', 'Post-launch review & bug-fix', 'Collect bug reports and fix issues first week live.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(31, 5, 2, 1, NULL, '2025-11-25 14:00:00.000', 'Icon portfolio shoot', 'Photograph new icons for Martine Icons portfolio.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(32, 5, 2, 3, NULL, '2025-11-27 10:00:00.000', 'Update artist biography', 'Revise Martine Boutros bio section on website.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(33, 5, 3, 2, NULL, '2025-11-29 16:00:00.000', 'Design new gallery layout', 'Create grid layout for new icon artwork gallery.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(34, 5, 3, 1, NULL, '2025-12-01 09:00:00.000', 'Implement shop functionality', 'Add online commissions shop to website.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(35, 5, 1, 3, NULL, '2025-12-03 12:00:00.000', 'Write blog post: iconography', 'Prepare blog post on meaning & process of creating icons.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(36, 5, 2, 2, 2, '2025-12-05 15:00:00.000', 'Client review website draft', 'Show preview of site to client and collect feedback.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(37, 5, 3, 1, NULL, '2025-12-07 11:00:00.000', 'Final QA & accessibility check', 'Test site for usability, alt text, contrast, etc.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(38, 5, 1, 3, NULL, '2025-12-09 17:00:00.000', 'Launch Martine Icons site', 'Go live with updated portfolio & shop.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(39, 6, 2, 3, NULL, '2025-11-30 13:00:00.000', 'Gather ministerial content', 'Collect text & images for Sisters of the Cross site.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(40, 6, 2, 1, NULL, '2025-12-02 10:00:00.000', 'Translate site to Arabic', 'Work on Arabic version of key pages of the congregation site.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(41, 6, 3, 2, NULL, '2025-12-04 16:00:00.000', 'Design homepage header visual', 'Create a compelling hero image with tagline for site.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(42, 6, 3, 3, NULL, '2025-12-06 14:00:00.000', 'Develop site navigation', 'Implement menu and internal links for multi-language site.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(43, 6, 1, 2, NULL, '2025-12-08 11:00:00.000', 'Accessibility and mobile testing', 'Ensure site works across devices and meets accessibility.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(44, 6, 2, 3, 3, '2025-12-10 09:00:00.000', 'Launch Sisters of the Cross website', 'Deploy site live and run final checks.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(45, 6, 3, 1, NULL, '2025-12-12 15:00:00.000', 'Post-launch maintenance plan', 'Define schedule for regular updates, backups and analytics.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(46, 8, 1, 2, NULL, '2025-11-18 09:00:00.000', 'Design youth meeting booklet cover', 'Create the cover design for the youth meeting booklet for the papal visit.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(47, 8, 1, 3, NULL, '2025-11-19 14:00:00.000', 'Layout inside pages of booklet', 'Design internal pages (agenda, speakers, location info) for the youth meeting.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(48, 8, 2, 1, NULL, '2025-11-20 10:00:00.000', 'Print proof review', 'Review print proofs (posters, bookmarks, programmes) for the papal visit event.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(49, 8, 2, 3, NULL, '2025-11-21 15:00:00.000', 'Coordinate with printers', 'Send print-ready files and finalize printing schedule.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(50, 8, 3, 2, NULL, '2025-11-22 11:00:00.000', 'Arrange event signage', 'Design and position signage for youth meeting venue at Bkerké.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(51, 8, 1, 3, NULL, '2025-11-23 16:00:00.000', 'Digital promotional assets', 'Create social media visuals and banners for the papal visit youth event.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(52, 8, 2, 2, NULL, '2025-11-24 13:00:00.000', 'Finalize participant badges', 'Design and print name badges for youth meeting attendees.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(53, 8, 3, 1, NULL, '2025-11-25 09:00:00.000', 'Set up onsite check-in desk graphics', 'Prepare materials (table signage, direction arrows) for event day.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(54, 8, 1, 2, 3, '2025-11-26 12:00:00.000', 'Event day support', 'Team stands by to support printing or signage issues on event day.', 1, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000'),
	(55, 8, 2, 3, NULL, '2025-11-27 14:00:00.000', 'Post-event report and debrief', 'Compile “what went well/what to improve” report after youth meeting.', 0, 1, '2025-11-10 23:04:42.000', '2025-11-10 23:04:42.000');

-- Dumping structure for table web2.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `companyId` int(11) DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `accessLevel` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `User_companyId_fkey` (`companyId`),
  CONSTRAINT `User_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `client` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table web2.user: ~3 rows (approximately)
INSERT INTO `user` (`id`, `name`, `password`, `companyId`, `position`, `email`, `phone`, `image`, `accessLevel`, `createdAt`, `updatedAt`) VALUES
	(1, 'mathieu', '$2a$10$mi9CtBNrq5K48T9Z9x4jru.QHy2t4Lo6wuM8pMGUPIeJdm3p.Cm6a', NULL, NULL, 'mathieu@mathieu.com', NULL, '/user/mathieu.png', 0, '2025-11-03 10:19:46.516', '2025-11-03 10:19:46.516'),
	(2, 'johny', '$2a$10$mi9CtBNrq5K48T9Z9x4jru.QHy2t4Lo6wuM8pMGUPIeJdm3p.Cm6a', NULL, NULL, 'j@j.j', NULL, '/user/johny.png', 0, '2025-11-06 11:00:51.000', '2025-11-06 11:00:52.000'),
	(3, 'martine', ' ', NULL, NULL, NULL, NULL, '/user/johny.png', 0, '2025-11-10 11:50:50.000', '2025-11-10 11:50:51.000');

-- Dumping structure for table web2._projecttoservice
CREATE TABLE IF NOT EXISTS `_projecttoservice` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL,
  UNIQUE KEY `_ProjectToService_AB_unique` (`A`,`B`),
  KEY `_ProjectToService_B_index` (`B`),
  CONSTRAINT `_ProjectToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_ProjectToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table web2._projecttoservice: ~0 rows (approximately)

-- Dumping structure for table web2._projecttouser
CREATE TABLE IF NOT EXISTS `_projecttouser` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL,
  UNIQUE KEY `_ProjectToUser_AB_unique` (`A`,`B`),
  KEY `_ProjectToUser_B_index` (`B`),
  CONSTRAINT `_ProjectToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_ProjectToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table web2._projecttouser: ~15 rows (approximately)
INSERT INTO `_projecttouser` (`A`, `B`) VALUES
	(2, 1),
	(3, 1),
	(4, 1),
	(5, 1),
	(6, 1),
	(7, 1),
	(8, 1),
	(2, 2),
	(5, 2),
	(7, 2),
	(8, 2),
	(3, 3),
	(6, 3),
	(7, 3),
	(8, 3);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
