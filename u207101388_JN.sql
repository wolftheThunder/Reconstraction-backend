-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 12, 2025 at 04:02 AM
-- Server version: 10.11.10-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u207101388_JN`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'rashid@gmail.com', '$2y$10$4KpI0a9hUFqjIjZXYtcqR.h7RFjfSF88EyKRM7IsRioSk/CLjwKXW', '2025-02-25 20:09:26', '2025-03-07 02:18:57'),
(2, 'Jandrnwconstruction@gmail.com', '$2y$10$Y1avpNpIZBpOtehAdYX4OOZLCVWSMf0gh6veGzm1EEedAffp4X6oW', '2025-03-07 02:16:41', '2025-03-07 02:17:01');

-- --------------------------------------------------------

--
-- Table structure for table `ContactMessages`
--

CREATE TABLE `ContactMessages` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `agreed` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ContactMessages`
--

INSERT INTO `ContactMessages` (`id`, `firstName`, `lastName`, `company`, `email`, `phone`, `message`, `agreed`, `createdAt`, `updatedAt`) VALUES
(1, 'Shabbir', 'ali', 'cali', 'rashid.khan.maitla13@gmail.com', '03492777660', 'this is test msg while deployment', 1, '2025-03-07 01:48:03', '2025-03-07 01:48:03'),
(2, 'rashid', 'khan', 'freelancer', 'rashid.khan.maitla13@gmail.com', '03492777660', 'this is only to test the mail config while deploying', 1, '2025-03-07 02:29:59', '2025-03-07 02:29:59'),
(3, 'RASHID', 'KKHAN', 'freelancer', 'rashid.khan.maitla13@gmail.com', '0000', 'TEST MSG', 1, '2025-03-07 02:31:40', '2025-03-07 02:31:40'),
(4, 'test', 'tes', 'test', 'rashid.khan.maitla13@gmail.com', '333', 'test', 1, '2025-03-07 02:33:34', '2025-03-07 02:33:34'),
(5, 'Shabbir', 'ali', 'test', 'rashid.khan.maitla13@gmail.com', '5555', 'sas', 1, '2025-03-07 02:33:50', '2025-03-07 02:33:50'),
(6, 'Shabbir', 'ali', 'test', 'rashid.khan.maitla13@gmail.com', '333', 'rr', 1, '2025-03-07 02:36:44', '2025-03-07 02:36:44'),
(7, 'Shabbir', 'ali', 'test', 'rashid.khan.maitla13@gmail.com', '333', 'rr', 1, '2025-03-07 02:36:46', '2025-03-07 02:36:46'),
(8, 'Shabbir', 'ali', 'test', 'rashid.khan.maitla13@gmail.com', '333', 'rr', 1, '2025-03-07 02:36:46', '2025-03-07 02:36:46'),
(9, 'Shabbir', 'ali', 'test', 'rashid.khan.maitla13@gmail.com', '333', 'rr', 1, '2025-03-07 02:36:48', '2025-03-07 02:36:48'),
(10, 'Shabbir', 'ali', 'wew', 'rashid.khan.maitla13@gmail.com', '333', 'test', 1, '2025-03-07 02:37:29', '2025-03-07 02:37:29'),
(11, 'Shabbir', 'ali', 'cali', 'rashid.khan.maitla13@gmail.com', '33', 'res', 1, '2025-03-07 02:38:54', '2025-03-07 02:38:54'),
(12, 'Shabbir', 'ali', 'tes', 'rashid.khan.maitla13@gmail.com', '33', 'reat', 1, '2025-03-07 02:41:12', '2025-03-07 02:41:12'),
(13, 'Shabbir', 'ali', 'test', 'rashid.khan.maitla13@gmail.com', '33', 'test', 1, '2025-03-07 02:44:27', '2025-03-07 02:44:27'),
(14, 'test', 'test', 'test', 'rashid.khan.maitla13@gmail.com', '333', 'test', 1, '2025-03-07 02:46:41', '2025-03-07 02:46:41');

-- --------------------------------------------------------

--
-- Table structure for table `contactmessages`
--

CREATE TABLE `contactmessages` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `agreed` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contactmessages`
--

INSERT INTO `contactmessages` (`id`, `firstName`, `lastName`, `company`, `email`, `phone`, `message`, `agreed`, `createdAt`, `updatedAt`) VALUES
(1, 'qasim', 'fida', 'asdf', 'rashid.khan.maitla13@gmail.com', '1234', '1233434', 1, '2025-02-26 01:38:36', '2025-02-26 01:38:36');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `mainImage` varchar(255) DEFAULT NULL,
  `subImages` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`subImages`)),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `description`, `mainImage`, `subImages`, `createdAt`, `updatedAt`) VALUES
(2, 'gateway hearing aid', 'gateway hearing aid desc', 'uploads/1740764469365-174838851.jpeg', '[\"uploads/1740764469372-160515118.jpeg\", \"uploads/1740764469384-384879041.jpeg\", \"uploads/1740764469387-669101939.jpeg\", \"uploads/1740764469391-587660357.jpeg\"]', '2025-02-26 01:11:51', '2025-02-28 17:41:09'),
(3, 'ne 90th ave', 'ne 90th ave desc', 'uploads/1740578559547-492477563.jpeg', '[\"uploads/1740578559551-163415732.jpeg\", \"uploads/1740578559562-18056454.jpeg\", \"uploads/1740578559579-636204713.jpeg\", \"uploads/1740578559635-262581098.jpeg\"]', '2025-02-26 01:12:51', '2025-02-26 20:42:17'),
(4, 'Palisade terrace drive', 'Palisade terrace drive desc', 'uploads/1740764791896-175853022.jpeg', '[\"uploads/1740764791896-920829572.jpeg\", \"uploads/1740764791902-316989969.jpeg\", \"uploads/1740764791908-917107262.jpeg\", \"uploads/1740764791913-824359347.jpeg\"]', '2025-02-26 01:13:34', '2025-02-28 17:46:31'),
(6, 'Tabor Heights', 'Tabor Heights Descr', 'uploads/1740994913137-67014277.jpeg', '[\"uploads/1740994913139-614566134.jpeg\", \"uploads/1740994913144-810497673.jpeg\", \"uploads/1740994913147-388110065.jpeg\", \"uploads/1740994913159-68286507.jpeg\"]', '2025-03-03 09:41:53', '2025-03-03 09:41:53');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `quote` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `isApproved` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `projectId`, `name`, `rating`, `quote`, `image`, `isApproved`, `createdAt`, `updatedAt`) VALUES
(7, 6, 'Shabbir ali', 5, 'nice project reallly like it', 'uploads\\1740994988675-181136651.jpeg', 1, '2025-03-03 09:43:08', '2025-03-03 09:43:14'),
(8, 4, 'hey', 5, 'hey', NULL, 1, '2025-03-07 01:34:40', '2025-03-07 01:35:27'),
(9, 6, 'Rashid Khan', 5, 'Amazing work! ', NULL, 1, '2025-03-07 01:46:49', '2025-03-07 01:46:58');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20250218224121-create-admin.js'),
('20250222055840-create-projects.js'),
('20250222055848-create-reviews.js'),
('20250225003708-add-isApproved-to-reviews.js'),
('20250303023317-create-service.js'),
('XXXXXXXXXXXXXX-create-contact-messages.js');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `beforeImage` varchar(255) NOT NULL,
  `afterImage` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `description`, `beforeImage`, `afterImage`, `createdAt`, `updatedAt`) VALUES
(1, 'Drywall/painting ', 'We offer professional drywall installation, repair, and painting services to create smooth, durable walls with a flawless finish.', 'uploads/1741022239918-520788990.jpeg', 'uploads/1741022239937-674155420.jpeg', '2025-03-03 17:17:19', '2025-03-03 17:45:30'),
(3, 'Mitigation and restoration', 'We minimize damage and restore properties after disasters like water, fire, or mold, ensuring quick recovery and safety', 'uploads/1741022967366-394093841.jpeg', 'uploads/1741022967384-117068173.jpeg', '2025-03-03 17:29:27', '2025-03-03 17:39:27'),
(4, 'Interior/exterior finishing', 'We provide expert interior and exterior finishing services, enhancing aesthetics and durability with high-quality craftsmanship.', 'uploads/1741024013611-960276073.jpeg', 'uploads/1741024013626-614747460.jpeg', '2025-03-03 17:46:53', '2025-03-03 17:46:53'),
(5, 'Emergency services', 'We offer fast and reliable emergency services to address urgent restoration needs, minimizing damage and ensuring quick recovery.', 'uploads/1741024243630-594698899.jpeg', 'uploads/1741024243726-691816295.jpeg', '2025-03-03 17:50:43', '2025-03-03 17:50:43'),
(6, 'fire damage and restoration', 'We specialize in fire damage restoration, removing soot, smoke, and structural damage to restore your property to its original condition.', 'uploads/1741024477407-452899737.jpeg', 'uploads/1741024477413-891989964.jpeg', '2025-03-03 17:54:37', '2025-03-03 17:54:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `ContactMessages`
--
ALTER TABLE `ContactMessages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactmessages`
--
ALTER TABLE `contactmessages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projectId` (`projectId`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ContactMessages`
--
ALTER TABLE `ContactMessages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `contactmessages`
--
ALTER TABLE `contactmessages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
