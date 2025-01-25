-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2025 at 07:20 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `user_id` int(11) NOT NULL,
  `vacation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`user_id`, `vacation_id`) VALUES
(112, 12369),
(112, 12370),
(112, 12372),
(112, 12374),
(112, 12377),
(112, 12383),
(114, 12371),
(114, 12373),
(114, 12374),
(114, 12378),
(115, 12369),
(115, 12370),
(115, 12374),
(115, 12378),
(115, 12385),
(116, 12369),
(116, 12375),
(116, 12385),
(118, 12367),
(118, 12371),
(118, 12385);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `role`) VALUES
(112, 'Shahar', 'Varda', 'Shahar@Varda.com', 'f9c0f4456864eae8f7bbadfc7a878b97f1c28f0f37e11623f85ec987ad8d1bc5042079ba47eb293965203f75f65b3b29240d8cabf3ff6b7d5f5e2e230f2f47f4', 'user'),
(113, 'Shalev', 'Shaul', 'shalev@example.com', '43b3dd190e28feef3dab9df177dab06387a37c9dc9a19b53c9f1230d0e70085887a70faeac5b6e6a2ea608d7260a88c7989c5bab0101835edc5f697adb91aa7e', 'admin'),
(114, 'Beni', 'Salem', 'beni@salem.com', '1554cf732ec883df5c3001f2cd08c41dbeae3484c93354e8215cbf4c7506de4bab56000cbcb6cfaee85b700610a1895af26a3e87ba0aee214501c524cbe0df00', 'user'),
(115, 'Rami', 'Gershon', 'Rami@gershon.com', '272876d6ee8d38e18c09c779fb5552b503a7b1ef9c888fe29be7c74bb2283b28888ebeeab1e2d38e4971ae17961d14173bb4d9f6871150db266217ff935611e2', 'user'),
(116, 'Shir', 'Shaul', 'shirshaul159@gmail.com', '4631001c87cc4bee52bd5dc3e415ba80ed690f551689d3ae73170bdba1507cecd7cf89ea1fcdac8cda461ebd486cde8ffa3e196f18962edc23ff56c4d704d8af', 'user'),
(117, 'shlomi', 'avigzer', 'shlomi@example.com', 'da3e0c36ec2fc516aef1e9c0755ab350eb33c8260ed5d39ae0b936bf08e1e1f84f34c6d491441d8c3d5d5db85cc616e6956ec54057447fb6084e642445824cbc', 'user'),
(118, 'Inbal', 'Shaul', 'inbal@shaul.com', '4631001c87cc4bee52bd5dc3e415ba80ed690f551689d3ae73170bdba1507cecd7cf89ea1fcdac8cda461ebd486cde8ffa3e196f18962edc23ff56c4d704d8af', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacation_id` int(11) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `start_time` date NOT NULL,
  `end_time` date NOT NULL,
  `price` int(11) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacation_id`, `destination`, `description`, `start_time`, `end_time`, `price`, `image`) VALUES
(12367, 'Batumi', 'Batumi, Georgy.', '2025-01-01', '2025-01-08', 540, 'batumi.jpg'),
(12368, 'Berlin', 'Berlin, Germany.', '2025-01-12', '2025-01-18', 710, 'berlin.jpg'),
(12369, 'Bora Bora', 'Bora Bora, quiet ocean islands.', '2025-01-19', '2025-01-25', 1250, 'bora.jpg'),
(12370, 'Bucarest', 'Bucarest, Romania.', '2025-02-03', '2025-02-09', 675, 'bucarest.jpg'),
(12371, 'Athene', 'Athene, Greece.', '2025-02-16', '2025-01-21', 390, 'greece.jpg'),
(12372, 'Hanoi', 'Hanoi, Vietnam.', '2025-02-23', '2025-03-03', 885, 'hanoi.jpg'),
(12373, 'Ibiza', 'Ibiza, Spain.', '2025-05-14', '2025-05-20', 980, 'ibiza.jpg'),
(12374, 'Tokyo', 'Tokyo, Japan.', '2025-04-06', '2025-04-20', 1010, 'japan.jpg'),
(12375, 'Jerusalem', 'Jerusalem, Israel.', '2025-03-17', '2025-03-28', 1850, 'jerusalem.jpg'),
(12376, 'London', 'London, England.', '2025-03-25', '2025-03-31', 790, 'london.jpg'),
(12377, 'Madrid', 'Madrid, Spain', '2025-04-15', '2025-04-23', 649, 'madrid.jpg'),
(12378, 'NYC', 'New York city, New York.', '2025-05-04', '2025-05-25', 2100, 'nyc.jpg'),
(12379, 'Paris', 'Paris, France.', '2025-06-08', '2025-06-16', 950, 'paris.jpg'),
(12380, 'Lima', 'Lima, Peru.', '2025-06-22', '2025-06-30', 1450, 'peru.jpg'),
(12381, 'Rabat', 'Rabat,  Morocco.', '2025-08-10', '2025-08-20', 490, 'rabat.jpg'),
(12382, 'Rio', 'Rio De Janeiro, Brazil.', '2026-01-06', '2026-01-30', 1480, 'rio.jpg'),
(12383, 'Rome', 'Rome, Italy.', '2025-05-18', '2025-05-27', 280, 'rome.jpg'),
(12384, 'Seoul', 'Seoul, South Korea.', '2025-01-28', '2025-02-12', 754, 'seoul.jpg'),
(12385, 'Thailand', 'Thailand islands.', '2025-02-09', '2025-02-26', 1390, 'thailand.jpg'),
(12386, 'Budapest', 'Butapest, Hungary', '2025-04-20', '2025-04-29', 785, 'budapest.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12387;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
