-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2015 at 09:54 AM
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `codeigniter`
--

-- --------------------------------------------------------

--
-- Table structure for table `collector_x_coordinator`
--

CREATE TABLE IF NOT EXISTS `collector_x_coordinator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `collector` int(11) NOT NULL,
  `coordinatorcol` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `collector_x_coordinator_idx` (`coordinatorcol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `combination`
--

CREATE TABLE IF NOT EXISTS `combination` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) NOT NULL,
  `rumble` tinyint(1) DEFAULT '0',
  `amount` decimal(3,2) NOT NULL,
  `time` int(11) DEFAULT NULL COMMENT '1. 11AM',
  `date` date DEFAULT NULL,
  `owner` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `owner_idx` (`owner`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` int(11) DEFAULT '1' COMMENT '1. coordinator',
  `parent` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=25 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `password`, `role`, `parent`, `status`, `created_at`) VALUES
(15, 'yongboang', 'limit123', 5, NULL, 1, '2015-03-18 08:04:53'),
(18, 'collector', 'limit123', 3, NULL, 1, '2015-03-18 09:04:54'),
(20, 'passer', 'limit123', 2, NULL, 1, '2015-03-18 09:05:25'),
(22, 'coordinator', 'limit123', 1, 18, 1, '2015-03-18 09:05:57'),
(23, 'admin', 'limit123', 4, NULL, 1, '2015-03-19 01:26:05'),
(24, 'coordinator2', 'limit123', 1, 18, 1, '2015-03-19 01:35:36');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `collector_x_coordinator`
--
ALTER TABLE `collector_x_coordinator`
  ADD CONSTRAINT `collector_x_coordinator` FOREIGN KEY (`coordinatorcol`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `combination`
--
ALTER TABLE `combination`
  ADD CONSTRAINT `owner` FOREIGN KEY (`owner`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
