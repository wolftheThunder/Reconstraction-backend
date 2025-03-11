-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 05, 2025 at 09:29 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `new_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@example.com', '$2b$10$QvHPegGONtknnbvePJwX1OydzbdfAjlA/4MnWFtI7.ojBRVtNY5ry', '2025-02-25 20:09:26', '2025-02-25 20:09:26');

-- --------------------------------------------------------

--
-- Table structure for table `contactmessages`
--

DROP TABLE IF EXISTS `contactmessages`;
CREATE TABLE IF NOT EXISTS `contactmessages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `agreed` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `contactmessages`
--

INSERT INTO `contactmessages` (`id`, `firstName`, `lastName`, `company`, `email`, `phone`, `message`, `agreed`, `createdAt`, `updatedAt`) VALUES
(1, 'qasim', 'fida', 'asdf', 'rashid.khan.maitla13@gmail.com', '1234', '1233434', 1, '2025-02-26 01:38:36', '2025-02-26 01:38:36');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE IF NOT EXISTS `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `mainImage` varchar(255) DEFAULT NULL,
  `subImages` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `description`, `mainImage`, `subImages`, `createdAt`, `updatedAt`) VALUES
(2, 'gateway hearing aid', 'gateway hearing aid desc', 'uploads/1740764469365-174838851.jpeg', '["uploads/1740764469372-160515118.jpeg", "uploads/1740764469384-384879041.jpeg", "uploads/1740764469387-669101939.jpeg", "uploads/1740764469391-587660357.jpeg"]', '2025-02-26 01:11:51', '2025-02-28 17:41:09');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `projectId` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `rating` int NOT NULL,
  `quote` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `isApproved` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `projectId` (`projectId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `projectId`, `name`, `rating`, `quote`, `image`, `isApproved`, `createdAt`, `updatedAt`) VALUES
(7, 6, 'Shabbir ali', 5, 'nice project reallly like it', 'uploads\1740994988675-181136651.jpeg', 1, '2025-03-03 09:43:08', '2025-03-03 09:43:14');
