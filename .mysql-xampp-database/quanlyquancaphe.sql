-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 24, 2020 at 01:14 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlyquancaphe`
--

DROP DATABASE IF EXISTS `quanlyquancaphe`;
CREATE DATABASE `quanlyquancaphe`;
USE `quanlyquancaphe`;

-- --------------------------------------------------------

--
-- Table structure for table `ban`
--

CREATE TABLE `ban` (
  `ID_BAN` int(11) NOT NULL,
  `TEN` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `GHI_CHU` text COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `ban`
--

INSERT INTO `ban` (`ID_BAN`, `TEN`, `GHI_CHU`) VALUES
(51, 'ban1', NULL);

--
-- Triggers `ban`
--
DELIMITER $$
CREATE TRIGGER `DELETE_Ban_DELETE_Hoadon_Datban` BEFORE DELETE ON `ban` FOR EACH ROW BEGIN
DELETE FROM hoa_don WHERE hoa_don.ID_BAN = OLD.ID_BAN;
DELETE FROM dat_ban WHERE dat_ban.ID_BAN = OLD.ID_BAN;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `cthd`
--

CREATE TABLE `cthd` (
  `ID_HOA_DON` int(11) NOT NULL,
  `ID_SAN_PHAM` int(11) NOT NULL,
  `SO_LUONG` int(11) UNSIGNED NOT NULL,
  `DON_GIA` int(11) UNSIGNED NOT NULL,
  `DIEM_TICH_LUY` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ctkm`
--

CREATE TABLE `ctkm` (
  `ID_KHUYEN_MAI` int(11) NOT NULL,
  `ID_SAN_PHAM` int(11) NOT NULL,
  `SO_LUONG` int(11) UNSIGNED NOT NULL,
  `DON_GIA` int(11) UNSIGNED DEFAULT NULL,
  `DIEM_TICH_LUY` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dat_ban`
--

CREATE TABLE `dat_ban` (
  `ID_TAI_KHOAN` int(11) NOT NULL,
  `ID_BAN` int(11) NOT NULL,
  `THOI_GIAN_LAP` datetime NOT NULL DEFAULT current_timestamp(),
  `THOI_GIAN_NHAN` datetime DEFAULT current_timestamp(),
  `GHI_CHU` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `ID_HOA_DON` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dat_hang_online`
--

CREATE TABLE `dat_hang_online` (
  `ID_KHACH_HANG` int(11) NOT NULL,
  `ID_HOA_DON` int(11) NOT NULL,
  `DIA_CHI_GIAO` text NOT NULL,
  `ID_NHAN_VIEN` int(11) DEFAULT NULL,
  `SDT` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hoa_don`
--

CREATE TABLE `hoa_don` (
  `ID_HOA_DON` int(11) NOT NULL,
  `ID_KHACH_HANG` int(11) DEFAULT NULL,
  `ID_BAN` int(11) NOT NULL,
  `ID_NHAN_VIEN_LAP` int(11) NOT NULL,
  `THOI_GIAN_LAP` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Triggers `hoa_don`
--
DELIMITER $$
CREATE TRIGGER `DELETE_Hoadon_DELETE_Cthd_Thanhtoanhd_DathangOnline` BEFORE DELETE ON `hoa_don` FOR EACH ROW BEGIN
DELETE FROM cthd WHERE cthd.ID_HOA_DON = OLD.ID_HOA_DON;
DELETE FROM dat_ban WHERE dat_ban.ID_HOA_DON = OLD.ID_HOA_DON;
DELETE FROM thanh_toan_hoa_don WHERE thanh_toan_hoa_don.ID_HOA_DON = OLD.ID_HOA_DON;
DELETE FROM dat_hang_online WHERE dat_hang_online.ID_HOA_DON = OLD.ID_HOA_DON;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `khach_hang`
--

CREATE TABLE `khach_hang` (
  `ID_KHACH_HANG` int(11) NOT NULL,
  `TEN` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `SDT` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `ID_TAI_KHOAN` int(11) DEFAULT NULL,
  `DIEM_TICH_LUY` int(11) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Triggers `khach_hang`
--
DELIMITER $$
CREATE TRIGGER `DELETE_Khachhang_DELETE_Hoadon` BEFORE DELETE ON `khach_hang` FOR EACH ROW BEGIN
DELETE FROM hoa_don WHERE hoa_don.ID_KHACH_HANG = OLD.ID_KHACH_HANG;
DELETE FROM dat_hang_online WHERE dat_hang_online.ID_KHACH_HANG = OLD.ID_KHACH_HANG;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `khuyen_mai`
--

CREATE TABLE `khuyen_mai` (
  `ID_KHUYEN_MAI` int(11) NOT NULL,
  `TEN` varchar(100) NOT NULL,
  `THOI_GIAN_DIEN_RA` datetime NOT NULL,
  `THOI_GIAN_KET_THUC` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `khuyen_mai`
--
DELIMITER $$
CREATE TRIGGER `DELETE_Khuyenmai_DELETE_Ctkm` BEFORE DELETE ON `khuyen_mai` FOR EACH ROW BEGIN
DELETE FROM ctkm WHERE ctkm.ID_KHUYEN_MAI = OLD.ID_KHUYEN_MAI;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `loai_san_pham`
--

CREATE TABLE `loai_san_pham` (
  `ID_LOAI_SAN_PHAM` int(11) NOT NULL,
  `TEN` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `LINK_ANH` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `GHI_CHU` text COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `loai_san_pham`
--

INSERT INTO `loai_san_pham` (`ID_LOAI_SAN_PHAM`, `TEN`, `LINK_ANH`, `GHI_CHU`) VALUES
(4, '1', NULL, NULL);

--
-- Triggers `loai_san_pham`
--
DELIMITER $$
CREATE TRIGGER `DELETE_Loaisanpham_DELETE_Ssanpham` BEFORE DELETE ON `loai_san_pham` FOR EACH ROW BEGIN
DELETE FROM san_pham WHERE san_pham.ID_LOAISP = OLD.ID_LOAISP;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `nhan_vien`
--

CREATE TABLE `nhan_vien` (
  `ID_NHAN_VIEN` int(11) NOT NULL,
  `TEN` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `SDT` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `LOAI` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ID_TAI_KHOAN` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Triggers `nhan_vien`
--
DELIMITER $$
CREATE TRIGGER `DELETE_Nhanvien_DELETE_Hoadon` BEFORE DELETE ON `nhan_vien` FOR EACH ROW BEGIN
DELETE FROM hoa_don WHERE hoa_don.ID_NHAN_VIEN = OLD.ID_NHAN_VIEN;
DELETE FROM dat_hang_online WHERE dat_hang_online.ID_NHAN_VIEN = OLD.ID_NHAN_VIEN;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `san_pham`
--

CREATE TABLE `san_pham` (
  `ID_SAN_PHAM` int(11) NOT NULL,
  `ID_LOAI_SAN_PHAM` int(11) NOT NULL,
  `TEN` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `GIA` int(11) UNSIGNED NOT NULL,
  `DIEM_TICH_LUY` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `GHI_CHU` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `LINK_ANH` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `san_pham`
--

INSERT INTO `san_pham` (`ID_SAN_PHAM`, `ID_LOAI_SAN_PHAM`, `TEN`, `GIA`, `DIEM_TICH_LUY`, `GHI_CHU`, `LINK_ANH`) VALUES
(113, 4, 'sp1', 1000, 1, NULL, '');

--
-- Triggers `san_pham`
--
DELIMITER $$
CREATE TRIGGER `DELETE_Sanpham_DELETE_Cthd_Ctkm` BEFORE DELETE ON `san_pham` FOR EACH ROW BEGIN
DELETE FROM cthd WHERE cthd.ID_SAN_PHAM = OLD.ID_SAN_PHAM;
DELETE FROM ctkm WHERE ctkm.ID_SAN_PHAM = OLD.ID_SAN_PHAM;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tai_khoan`
--

CREATE TABLE `tai_khoan` (
  `ID_TAI_KHOAN` int(11) NOT NULL,
  `USERNAME` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `PASSWORD` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `LOAI` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tai_khoan`
--

INSERT INTO `tai_khoan` (`ID_TAI_KHOAN`, `USERNAME`, `PASSWORD`, `LOAI`) VALUES
(110, 'admin', '21232f297a57a5a743894a0e4a801fc3', 0),
(111, 'user', 'ee11cbb19052e40b07aac0ca060c23ee', 1);

--
-- Triggers `tai_khoan`
--
DELIMITER $$
CREATE TRIGGER `DELETE_Taikhoan_DELETE_Nhanvien_Khachhang_Datban_ThanhtoanHD` BEFORE DELETE ON `tai_khoan` FOR EACH ROW BEGIN
DELETE FROM nhan_vien WHERE nhan_vien.ID_TAI_KHOAN = OLD.ID_TAI_KHOAN;
DELETE FROM khach_hang WHERE khach_hang.ID_TAI_KHOAN = OLD.ID_TAI_KHOAN;
DELETE FROM dat_ban WHERE dat_ban.ID_TAI_KHOAN = OLD.ID_TAI_KHOAN;
DELETE FROM thanh_toan_hoa_don WHERE thanh_toan_hoa_don.ID_TAI_KHOAN_THANH_TOAN = OLD.ID_TAI_KHOAN;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `thanh_toan_hoa_don`
--

CREATE TABLE `thanh_toan_hoa_don` (
  `ID_HOA_DON` int(11) NOT NULL,
  `ID_TAI_KHOAN_THANH_TOAN` int(11) NOT NULL,
  `THOI_GIAN_THANH_TOAN` datetime NOT NULL,
  `SO_LUONG_DIEM_DOI` int(10) UNSIGNED NOT NULL,
  `TY_GIA_DIEM_DOI` float UNSIGNED NOT NULL,
  `PHAN_TRAM_TICH_LUY` float UNSIGNED NOT NULL,
  `SO_TIEN_THANH_TOAN` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ban`
--
ALTER TABLE `ban`
  ADD PRIMARY KEY (`ID_BAN`);

--
-- Indexes for table `cthd`
--
ALTER TABLE `cthd`
  ADD PRIMARY KEY (`ID_HOA_DON`,`ID_SAN_PHAM`),
  ADD KEY `FK_CTHD_DOUONG` (`ID_SAN_PHAM`);

--
-- Indexes for table `ctkm`
--
ALTER TABLE `ctkm`
  ADD PRIMARY KEY (`ID_KHUYEN_MAI`,`ID_SAN_PHAM`),
  ADD KEY `ID_KHUYEN_MAI` (`ID_KHUYEN_MAI`,`ID_SAN_PHAM`),
  ADD KEY `ID_DO_UONG` (`ID_SAN_PHAM`);

--
-- Indexes for table `dat_ban`
--
ALTER TABLE `dat_ban`
  ADD PRIMARY KEY (`ID_TAI_KHOAN`,`ID_BAN`,`THOI_GIAN_LAP`),
  ADD KEY `USERNANE` (`ID_TAI_KHOAN`,`ID_BAN`),
  ADD KEY `ID_BAN` (`ID_BAN`),
  ADD KEY `ID_HOA_DON` (`ID_HOA_DON`);

--
-- Indexes for table `dat_hang_online`
--
ALTER TABLE `dat_hang_online`
  ADD PRIMARY KEY (`ID_KHACH_HANG`,`ID_HOA_DON`),
  ADD KEY `ID_HOA_DON` (`ID_HOA_DON`),
  ADD KEY `ID_NHAN_VIEN` (`ID_NHAN_VIEN`);

--
-- Indexes for table `hoa_don`
--
ALTER TABLE `hoa_don`
  ADD PRIMARY KEY (`ID_HOA_DON`),
  ADD KEY `FK_HOADON_KHACHHANG` (`ID_KHACH_HANG`),
  ADD KEY `FK_HOADON_NHANVIEN` (`ID_NHAN_VIEN_LAP`),
  ADD KEY `FK_HOADON_BAN` (`ID_BAN`);

--
-- Indexes for table `khach_hang`
--
ALTER TABLE `khach_hang`
  ADD PRIMARY KEY (`ID_KHACH_HANG`),
  ADD KEY `USERNAME` (`ID_TAI_KHOAN`);

--
-- Indexes for table `khuyen_mai`
--
ALTER TABLE `khuyen_mai`
  ADD PRIMARY KEY (`ID_KHUYEN_MAI`);

--
-- Indexes for table `loai_san_pham`
--
ALTER TABLE `loai_san_pham`
  ADD PRIMARY KEY (`ID_LOAI_SAN_PHAM`);

--
-- Indexes for table `nhan_vien`
--
ALTER TABLE `nhan_vien`
  ADD PRIMARY KEY (`ID_NHAN_VIEN`),
  ADD KEY `USERNAME` (`ID_TAI_KHOAN`);

--
-- Indexes for table `san_pham`
--
ALTER TABLE `san_pham`
  ADD PRIMARY KEY (`ID_SAN_PHAM`),
  ADD KEY `FK_DOUONG_LOAIDOUONG` (`ID_LOAI_SAN_PHAM`);

--
-- Indexes for table `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD PRIMARY KEY (`ID_TAI_KHOAN`),
  ADD UNIQUE KEY `USERNAME` (`USERNAME`);

--
-- Indexes for table `thanh_toan_hoa_don`
--
ALTER TABLE `thanh_toan_hoa_don`
  ADD PRIMARY KEY (`ID_HOA_DON`,`ID_TAI_KHOAN_THANH_TOAN`,`THOI_GIAN_THANH_TOAN`),
  ADD KEY `ID_TAI_KHOAN_THANH_TOAN` (`ID_TAI_KHOAN_THANH_TOAN`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ban`
--
ALTER TABLE `ban`
  MODIFY `ID_BAN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `hoa_don`
--
ALTER TABLE `hoa_don`
  MODIFY `ID_HOA_DON` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT for table `khach_hang`
--
ALTER TABLE `khach_hang`
  MODIFY `ID_KHACH_HANG` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `khuyen_mai`
--
ALTER TABLE `khuyen_mai`
  MODIFY `ID_KHUYEN_MAI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `loai_san_pham`
--
ALTER TABLE `loai_san_pham`
  MODIFY `ID_LOAI_SAN_PHAM` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `nhan_vien`
--
ALTER TABLE `nhan_vien`
  MODIFY `ID_NHAN_VIEN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `san_pham`
--
ALTER TABLE `san_pham`
  MODIFY `ID_SAN_PHAM` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `tai_khoan`
--
ALTER TABLE `tai_khoan`
  MODIFY `ID_TAI_KHOAN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cthd`
--
ALTER TABLE `cthd`
  ADD CONSTRAINT `cthd_ibfk_1` FOREIGN KEY (`ID_HOA_DON`) REFERENCES `hoa_don` (`ID_HOA_DON`),
  ADD CONSTRAINT `cthd_ibfk_2` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `san_pham` (`ID_SAN_PHAM`);

--
-- Constraints for table `ctkm`
--
ALTER TABLE `ctkm`
  ADD CONSTRAINT `ctkm_ibfk_3` FOREIGN KEY (`ID_KHUYEN_MAI`) REFERENCES `khuyen_mai` (`ID_KHUYEN_MAI`),
  ADD CONSTRAINT `ctkm_ibfk_4` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `san_pham` (`ID_SAN_PHAM`);

--
-- Constraints for table `dat_ban`
--
ALTER TABLE `dat_ban`
  ADD CONSTRAINT `dat_ban_ibfk_2` FOREIGN KEY (`ID_BAN`) REFERENCES `ban` (`ID_BAN`),
  ADD CONSTRAINT `dat_ban_ibfk_3` FOREIGN KEY (`ID_TAI_KHOAN`) REFERENCES `tai_khoan` (`ID_TAI_KHOAN`),
  ADD CONSTRAINT `dat_ban_ibfk_4` FOREIGN KEY (`ID_HOA_DON`) REFERENCES `hoa_don` (`ID_HOA_DON`);

--
-- Constraints for table `dat_hang_online`
--
ALTER TABLE `dat_hang_online`
  ADD CONSTRAINT `dat_hang_online_ibfk_1` FOREIGN KEY (`ID_HOA_DON`) REFERENCES `hoa_don` (`ID_HOA_DON`),
  ADD CONSTRAINT `dat_hang_online_ibfk_2` FOREIGN KEY (`ID_KHACH_HANG`) REFERENCES `khach_hang` (`ID_KHACH_HANG`),
  ADD CONSTRAINT `dat_hang_online_ibfk_3` FOREIGN KEY (`ID_NHAN_VIEN`) REFERENCES `nhan_vien` (`ID_NHAN_VIEN`);

--
-- Constraints for table `hoa_don`
--
ALTER TABLE `hoa_don`
  ADD CONSTRAINT `hoa_don_ibfk_2` FOREIGN KEY (`ID_KHACH_HANG`) REFERENCES `khach_hang` (`ID_KHACH_HANG`),
  ADD CONSTRAINT `hoa_don_ibfk_3` FOREIGN KEY (`ID_NHAN_VIEN_LAP`) REFERENCES `nhan_vien` (`ID_NHAN_VIEN`),
  ADD CONSTRAINT `hoa_don_ibfk_4` FOREIGN KEY (`ID_BAN`) REFERENCES `ban` (`ID_BAN`);

--
-- Constraints for table `khach_hang`
--
ALTER TABLE `khach_hang`
  ADD CONSTRAINT `khach_hang_ibfk_1` FOREIGN KEY (`ID_TAI_KHOAN`) REFERENCES `tai_khoan` (`ID_TAI_KHOAN`);

--
-- Constraints for table `nhan_vien`
--
ALTER TABLE `nhan_vien`
  ADD CONSTRAINT `nhan_vien_ibfk_1` FOREIGN KEY (`ID_TAI_KHOAN`) REFERENCES `tai_khoan` (`ID_TAI_KHOAN`);

--
-- Constraints for table `san_pham`
--
ALTER TABLE `san_pham`
  ADD CONSTRAINT `san_pham_ibfk_1` FOREIGN KEY (`ID_LOAI_SAN_PHAM`) REFERENCES `loai_san_pham` (`ID_LOAI_SAN_PHAM`);

--
-- Constraints for table `thanh_toan_hoa_don`
--
ALTER TABLE `thanh_toan_hoa_don`
  ADD CONSTRAINT `thanh_toan_hoa_don_ibfk_1` FOREIGN KEY (`ID_HOA_DON`) REFERENCES `hoa_don` (`ID_HOA_DON`),
  ADD CONSTRAINT `thanh_toan_hoa_don_ibfk_2` FOREIGN KEY (`ID_TAI_KHOAN_THANH_TOAN`) REFERENCES `tai_khoan` (`ID_TAI_KHOAN`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
