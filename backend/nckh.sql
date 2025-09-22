-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: webstudyonline
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,NULL,NULL,0,'admin@gmail.com','2025-03-01 21:18:50.125948','AD01','admin@gmail.com','admin one','$2a$10$pDcNLVk7NjM0dvvxJES.7u87lFo6DbSr8jQC2jPnng60BMtjB2wuO','02345567895',_binary ''),(2,NULL,NULL,0,'user@gmail.com','2025-03-03 14:24:50.412401','US01','1@gmail.com','Dinh Xuan Truong','$2a$10$jBPC5DMgQ.k8XA9eZ9zRTOuMz072a/Uu.ZtCRoxsv7HxHfueDJ3hy','02345567895',_binary ''),(3,NULL,'2025-02-03 21:50:44.000000',0,'admin@gmail.com','2025-03-27 11:53:54.771757','TE01','teacher@gmail.com','Lê Thái Dương','$2a$10$pDcNLVk7NjM0dvvxJES.7u87lFo6DbSr8jQC2jPnng60BMtjB2wuO','02345567895',_binary ''),(9,'admin@gmail.com','2025-02-19 15:24:19.104355',0,'admin@gmail.com','2025-03-27 11:44:20.891323','DSM01','user@gmail.com','Lê Thái Dương','$2a$10$pDcNLVk7NjM0dvvxJES.7u87lFo6DbSr8jQC2jPnng60BMtjB2wuO','02345567895',_binary ''),(10,NULL,NULL,0,'admin@gmail.com','2025-02-28 19:54:06.943903','sfg','ao@gmail.com','nhat minh','$2a$10$g7qbq2Gjw9zTqqIiYdmnXOecI7Cpg7s9wBFP2NZVFacJS5mW4hLFi','02345567895',_binary ''),(11,NULL,NULL,0,'admin@gmail.com','2025-02-28 19:56:03.522442','gdfghdfh','ao1@gmail.com','ho','$2a$10$g7qbq2Gjw9zTqqIiYdmnXOecI7Cpg7s9wBFP2NZVFacJS5mW4hLFi','02345567895',_binary ''),(14,'admin@gmail.com','2025-03-01 18:03:14.560579',NULL,'admin@gmail.com','2025-03-01 18:03:14.560579',NULL,NULL,'truong dx',NULL,'02345567895',_binary '\0'),(15,NULL,NULL,0,'admin@gmail.com','2025-02-28 19:54:06.943903','sfg','gv2@gmail.com','GV 2','$2a$10$g7qbq2Gjw9zTqqIiYdmnXOecI7Cpg7s9wBFP2NZVFacJS5mW4hLFi','02345567895',_binary ''),(16,NULL,NULL,0,'admin@gmail.com','2025-02-28 19:54:06.943903','sfg','gv3@gmail.com','GV 3','$2a$10$g7qbq2Gjw9zTqqIiYdmnXOecI7Cpg7s9wBFP2NZVFacJS5mW4hLFi','02345567895',_binary ''),(17,NULL,NULL,0,'admin@gmail.com','2025-02-28 19:54:06.943903','sfg','gv4@gmail.com','GV 4','$2a$10$g7qbq2Gjw9zTqqIiYdmnXOecI7Cpg7s9wBFP2NZVFacJS5mW4hLFi','02345567895',_binary ''),(18,NULL,NULL,0,'admin@gmail.com','2025-02-28 19:54:06.943903','sfg','gv5@gmail.com','GV 5','$2a$10$g7qbq2Gjw9zTqqIiYdmnXOecI7Cpg7s9wBFP2NZVFacJS5mW4hLFi','02345567895',_binary ''),(19,NULL,NULL,0,'admin@gmail.com','2025-02-28 19:54:06.943903','sfg','gv6@gmail.com','GV 6','$2a$10$g7qbq2Gjw9zTqqIiYdmnXOecI7Cpg7s9wBFP2NZVFacJS5mW4hLFi','02345567895',_binary '');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_role`
--

DROP TABLE IF EXISTS `account_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_role` (
  `account_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`account_id`,`role_id`),
  KEY `FKrs2s3m3039h0xt8d5yhwbuyam` (`role_id`),
  CONSTRAINT `FK1f8y4iy71kb1arff79s71j0dh` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FKrs2s3m3039h0xt8d5yhwbuyam` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_role`
--

LOCK TABLES `account_role` WRITE;
/*!40000 ALTER TABLE `account_role` DISABLE KEYS */;
INSERT INTO `account_role` VALUES (1,1),(10,1),(2,2),(9,2),(11,2),(3,3),(15,3),(16,3),(17,3),(18,3),(19,3);
/*!40000 ALTER TABLE `account_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgpfluataee5ad31ijyu9jfvms` (`account_id`),
  CONSTRAINT `FKgpfluataee5ad31ijyu9jfvms` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (1,NULL,'2025-03-03 11:08:06.000000',0,NULL,NULL,'BILL-20250222-001',1),(2,NULL,'2025-03-03 11:08:06.000000',0,NULL,NULL,'BILL-20250222-002',1),(3,NULL,'2025-03-03 11:08:06.000000',0,NULL,NULL,'BILL-20250222-003',1),(4,NULL,'2025-03-03 11:08:06.000000',0,NULL,NULL,'BILL-20250222-004',2),(5,NULL,'2025-03-03 11:08:06.000000',0,NULL,NULL,'BILL-20250222-005',1),(6,NULL,'2025-03-03 11:08:06.000000',0,NULL,NULL,'BILL-20250222-006',1),(7,NULL,'2025-03-03 11:08:06.000000',0,NULL,NULL,'BILL-20250222-007',3),(8,NULL,'2025-03-03 11:08:06.000000',0,NULL,NULL,'BILL-20250222-008',2),(9,NULL,'2025-03-03 11:08:06.000000',0,NULL,NULL,'BILL-20250222-009',2),(10,NULL,'2025-03-03 11:08:06.000000',0,NULL,NULL,'BILL-20250222-010',2),(21,'duongsmoke1@gmail.com','2025-03-11 15:45:05.920649',0,'duongsmoke1@gmail.com','2025-03-11 15:45:05.920649','BILL2553047',9),(22,'duongsmoke1@gmail.com','2025-03-11 16:25:58.336076',0,'duongsmoke1@gmail.com','2025-03-11 16:25:58.336076','BILL2549068',9);
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_details`
--

DROP TABLE IF EXISTS `bill_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `bill_id` bigint DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7coossdaxtwjpy23knsjtua2i` (`bill_id`),
  KEY `FK3221vssjsrsj5tcndiyav577g` (`course_id`),
  CONSTRAINT `FK3221vssjsrsj5tcndiyav577g` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `FK7coossdaxtwjpy23knsjtua2i` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_details`
--

LOCK TABLES `bill_details` WRITE;
/*!40000 ALTER TABLE `bill_details` DISABLE KEYS */;
INSERT INTO `bill_details` VALUES (1,NULL,NULL,0,NULL,NULL,500000.00,2,1,1),(2,NULL,NULL,0,NULL,NULL,300000.00,1,1,2),(3,NULL,NULL,0,NULL,NULL,950000.00,3,1,3),(4,NULL,NULL,0,NULL,NULL,600000.00,1,2,4),(5,NULL,NULL,0,NULL,NULL,250000.00,2,2,5),(6,NULL,NULL,0,NULL,NULL,700000.00,1,2,6),(7,NULL,NULL,0,NULL,NULL,400000.00,2,3,7),(8,NULL,NULL,0,NULL,NULL,350000.00,1,3,8),(9,NULL,NULL,0,NULL,NULL,200000.00,3,3,1),(10,NULL,NULL,0,NULL,NULL,800000.00,2,3,2),(11,NULL,NULL,0,NULL,NULL,750000.00,1,4,3),(12,NULL,NULL,0,NULL,NULL,600000.00,2,4,4),(13,NULL,NULL,0,NULL,NULL,500000.00,3,4,5),(14,NULL,NULL,0,NULL,NULL,550000.00,1,5,6),(15,NULL,NULL,0,NULL,NULL,300000.00,2,5,7),(16,NULL,NULL,0,NULL,NULL,450000.00,2,5,8),(17,NULL,NULL,0,NULL,NULL,900000.00,1,6,1),(18,NULL,NULL,0,NULL,NULL,650000.00,3,6,2),(19,NULL,NULL,0,NULL,NULL,300000.00,2,6,3),(20,NULL,NULL,0,NULL,NULL,720000.00,2,7,4),(21,NULL,NULL,0,NULL,NULL,400000.00,1,7,5),(22,NULL,NULL,0,NULL,NULL,550000.00,3,7,6),(23,NULL,NULL,0,NULL,NULL,620000.00,2,8,7),(24,NULL,NULL,0,NULL,NULL,450000.00,1,8,8),(25,NULL,NULL,0,NULL,NULL,700000.00,2,8,1),(26,NULL,NULL,0,NULL,NULL,480000.00,3,9,2),(27,NULL,NULL,0,NULL,NULL,350000.00,1,9,3),(28,NULL,NULL,0,NULL,NULL,600000.00,2,9,4),(29,NULL,NULL,0,NULL,NULL,500000.00,3,9,5),(30,NULL,NULL,0,NULL,NULL,880000.00,1,10,6),(31,NULL,NULL,0,NULL,NULL,450000.00,2,10,7),(32,NULL,NULL,0,NULL,NULL,750000.00,3,10,8),(65,'duongsmoke1@gmail.com','2025-03-11 15:45:06.031937',0,'duongsmoke1@gmail.com','2025-03-11 15:45:06.031937',900000.00,1,21,1),(66,'duongsmoke1@gmail.com','2025-03-11 16:25:58.574710',0,'duongsmoke1@gmail.com','2025-03-11 16:25:58.574710',6300000.00,1,22,8),(67,'duongsmoke1@gmail.com','2025-03-11 16:25:58.574710',0,'duongsmoke1@gmail.com','2025-03-11 16:25:58.574710',3600000.00,1,22,6);
/*!40000 ALTER TABLE `bill_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  `roadmap_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4pljlvncf45mr98etwpubxvbt` (`account_id`),
  KEY `FKe8qhvp3rieyui6fxssjs4r34r` (`course_id`),
  KEY `FKibib9v4iaiwx8sjo93p3i1k67` (`roadmap_id`),
  CONSTRAINT `FK4pljlvncf45mr98etwpubxvbt` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FKe8qhvp3rieyui6fxssjs4r34r` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `FKibib9v4iaiwx8sjo93p3i1k67` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmap` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (15,'user@gmail.com','2025-02-20 11:04:08.021109',NULL,'user@gmail.com','2025-02-20 11:04:08.021109',1,2,1,NULL),(16,'user@gmail.com','2025-02-20 11:04:08.030221',NULL,'user@gmail.com','2025-02-20 11:04:08.030221',3,2,8,NULL);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,NULL,NULL,0,NULL,NULL,'T001','TOEIC'),(2,NULL,NULL,0,NULL,NULL,'I001','ILETS'),(3,'admin@gmail.com','2025-02-21 21:09:06.029485',1,'admin@gmail.com','2025-02-22 13:45:04.102198','CATE2588950','333'),(4,NULL,NULL,1,'admin@gmail.com','2025-02-21 21:13:32.553350','CATE2520889','Advanced Web Development111');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificate`
--

DROP TABLE IF EXISTS `certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificate` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `issue_date` varchar(255) DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `teacher_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKa98hmqm0ghc2vlsu8v9kaot8e` (`teacher_id`),
  CONSTRAINT `FKa98hmqm0ghc2vlsu8v9kaot8e` FOREIGN KEY (`teacher_id`) REFERENCES `infor_teacher` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate`
--

LOCK TABLES `certificate` WRITE;
/*!40000 ALTER TABLE `certificate` DISABLE KEYS */;
INSERT INTO `certificate` VALUES (13,'admin@gmail.com','2025-03-27 12:00:01.797729',0,'admin@gmail.com','2025-03-27 12:00:01.797729','TOEIC LR','TOE1312','TOEIC','sfgdnhhnf','2025-03-11','IIG',8),(16,NULL,NULL,0,'admin@gmail.com','2025-03-27 12:02:23.558994','TOEIC SW','TOE2342','TOEIC','sfgdnhhnf','2025-03-11','IIG',10),(17,NULL,NULL,0,'admin@gmail.com','2025-03-27 12:02:38.836490','TOEIC LR','TOE4223','TOEIC','sfgdnhhnf','2025-03-11','IIG',11),(18,NULL,NULL,0,'admin@gmail.com','2025-03-27 12:02:50.943223','ILESTLR','ILEST1312','ILEST','sfgdnhhnf','2025-03-11','IIG',12),(19,'admin@gmail.com','2025-03-27 12:00:01.797729',0,'admin@gmail.com','2025-03-27 12:00:01.797729','TOEIC LR','TOE1312','TOEIC','sfgdnhhnf','2025-03-11','IIG',13),(20,'admin@gmail.com','2025-03-27 12:00:01.797729',0,'admin@gmail.com','2025-03-27 12:00:01.797729','TOEIC LR','TOE1312','TOEIC','sfgdnhhnf','2025-03-11','IIG',14);
/*!40000 ALTER TABLE `certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `aim` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkyes7515s3ypoovxrput029bh` (`category_id`),
  CONSTRAINT `FKkyes7515s3ypoovxrput029bh` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'admin@gmail.com','2025-02-28 23:00:59.190721',0,NULL,'2025-03-22 09:44:06.000000','C001','Khóa học được thiết kế dành riêng cho người mất gốc tiếng Anh lâu năm, không thể nghe audio các âm cơ bản, các từ vựng đơn lẻ và đọc hiểu từ vựng tiếng Anh ở mức độ tối thiểu.','TOEIC Tập Sự',1000000.00,'Đã Duyệt',1,10,'0 - 450'),(2,'admin@gmail.com','2025-02-28 23:00:59.190721',0,NULL,'2025-03-22 09:44:10.000000','C002','TOEIC Cơ Bản 450+ dành riêng cho người mất gốc tiếng Anh lâu năm, không thể nghe audio và đọc hiểu từ vựng tiếng Anh ở mức độ tối thiểu','TOEIC A',2000000.00,'Đã Duyệt',1,10,'450+'),(3,'admin@gmail.com','2025-02-28 23:00:59.190721',0,NULL,'2025-03-22 09:44:06.000000','C003','TOEIC 700+ dành riêng cho người mất gốc tiếng Anh lâu năm, không thể nghe audio và đọc hiểu từ vựng tiếng Anh ở mức độ tối thiểu khóa học được thiết kế đặc biệt cho những học viên đã có nền tảng tiếng Anh cơ bản và mong muốn đạt được mục tiêu 700 điểm TOE','TOEIC B',3000000.00,'Đã Duyệt',1,10,'700+'),(4,'admin@gmail.com','2025-02-28 23:00:59.190721',0,NULL,'2025-03-22 09:44:10.000000','C004','TOEIC Master (250+ TOEIC Speaking & Writing) là khóa học chuyên sâu dành cho những người đã có nền tảng tiếng Anh và muốn tập trung phát triển kỹ năng Nói và Viết ở mức độ cao','TOEIC SW',4000000.00,'Đã Duyệt',1,10,'master toeic'),(5,'teacher@gmail.com','2025-02-28 23:00:59.190721',0,NULL,'2025-03-22 09:44:06.000000','C005','Tích lũy 400 từ vựng quan trọng, 21 phạm trù ngữ pháp toàn diện, hoàn thiện phát âm, ngữ điệu, nối âm, nuốt âm, trọng âm tròn vẹn.','IELTS Tập Sự',3000000.00,'Đã Duyệt',2,10,'0 - 5.5'),(6,'teacher@gmail.com','2025-02-28 23:00:59.190721',0,NULL,'2025-03-22 09:44:10.000000','C006','Xây dựng tư duy, phương pháp làm các dạng bài Listening + Reading + Speaking + Writing. Viết câu, phát triển ý mạch lạc và rèn luyện cách mở rộng câu trả lời cho nhiều chủ đề.\n','IELTS A',4000000.00,'Đã Duyệt',2,10,'5.5+'),(7,'teacher@gmail.com','2025-02-28 23:00:59.190721',0,NULL,'2025-03-22 09:44:06.000000','C007','Chiến lược xử lý nhanh gọn, chính xác các dạng bài toàn diện cả 4 kỹ năng. Writing nắm chắc 4 dạng biểu đồ, 4 dạng bài luận. Speaking nằm lòng 8 nhóm chủ điểm quan trọng xuất hiện trong 90% kỳ thi IELTS\n','IELTS B',5000000.00,'Đã Duyệt',2,10,'6.5+'),(8,'teacher@gmail.com','2025-02-28 23:00:59.190721',0,NULL,'2025-03-22 09:44:10.000000','C008','Làm chủ mọi kỹ năng Skimming, Scanning và Read in details. Brainstorm và phát triển ý tưởng hiệu quả. Làm chủ ngôn ngữ, tăng tốc độ nói cùng các kỹ năng chuyên sâu','IELTS C',7000000.00,'Đã Duyệt',2,10,'7.5+');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_details`
--

DROP TABLE IF EXISTS `course_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `period` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  `public_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgn7lx849uwed06vuyl04hc156` (`course_id`),
  CONSTRAINT `FKgn7lx849uwed06vuyl04hc156` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_details`
--

LOCK TABLES `course_details` WRITE;
/*!40000 ALTER TABLE `course_details` DISABLE KEYS */;
INSERT INTO `course_details` VALUES (9,NULL,NULL,0,NULL,NULL,'Học về các thì cơ bản và cấu trúc câu.','Phần 1: Ngữ pháp cơ bản','50','ENG101-01',1,NULL),(10,NULL,NULL,0,NULL,NULL,'Học 500 từ vựng tiếng Anh cơ bản.','Phần 2: Từ vựng cơ bản','40.00','ENG101-02',1,NULL),(11,NULL,NULL,0,NULL,NULL,'Học cách phát âm chuẩn và ngữ điệu.','Phần 3: Phát âm cơ bản','30.00','ENG101-03',1,NULL),(12,NULL,NULL,0,'admin@gmail.com','2025-02-28 23:26:46.557078','Học các mẫu câu giao tiếp cơ bản hàng ngày.','Phần 4: Giao tiếp cơ bản','30.00',NULL,1,NULL),(13,NULL,NULL,0,'admin@gmail.com','2025-02-28 23:49:48.398634','demo la demo','demo 1','10','kakaka',1,NULL),(14,'admin@gmail.com','2025-02-28 23:50:15.941527',0,'admin@gmail.com','2025-02-28 23:50:15.941527','toi la ai','Phần 5','100','https',1,NULL),(15,NULL,NULL,0,'admin@gmail.com','2025-02-28 23:52:50.207615','hihihi1','Phan 61','191','https://chatgpt.com/c/67c1e711-bc20-8004-a855-5af24616c553',1,NULL),(16,'admin@gmail.com','2025-03-01 00:01:53.362529',0,'admin@gmail.com','2025-03-01 00:01:53.362529','ihuogyv','ihugy','7','gyhv',1,NULL),(17,'admin@gmail.com','2025-03-01 00:02:17.422208',0,'admin@gmail.com','2025-03-01 00:02:17.422208','ihuogyv','ihugy','7','gyhv',1,NULL),(18,'','2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'abc','1','3NNVQ6iQjO4',1,NULL),(19,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'def','2','5VRZZfh7kqk',1,NULL),(20,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'abc','1','ixPZQoxywhk',2,NULL),(21,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'abc','1','Sj-xPElSZ20',3,NULL),(22,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'def','2','0HDpV_sO3Tk',3,NULL),(23,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'ghi','3','QvqrrmPDMjo',3,NULL),(24,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'abc','1','3NNVQ6iQjO4',4,NULL),(25,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'def','2','5VRZZfh7kqk',4,NULL),(26,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'abc','1','ixPZQoxywhk',5,NULL),(27,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'def','2','Sj-xPElSZ20',5,NULL),(28,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'abc','1','0HDpV_sO3Tk',6,NULL),(29,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'def','2','QvqrrmPDMjo',6,NULL),(30,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'ghi','3','3NNVQ6iQjO4',6,NULL),(31,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'abc','1','5VRZZfh7kqk',7,NULL),(32,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'def','2','ixPZQoxywhk',7,NULL),(33,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'ghi','3','Sj-xPElSZ20',7,NULL),(34,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'abc','1','0HDpV_sO3Tk',8,NULL),(35,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'def','2','QvqrrmPDMjo',8,NULL),(36,NULL,'2025-03-02 00:36:44.000000',0,NULL,NULL,NULL,'ghi','3','3NNVQ6iQjO4',8,NULL);
/*!40000 ALTER TABLE `course_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `number_question` int DEFAULT NULL,
  `is_free` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
INSERT INTO `exam` VALUES (8,'admin@gmail.com','2025-03-27 10:36:54.158682',0,'admin@gmail.com','2025-03-27 10:36:54.158682','EXAM2560474','ETS2024 Test 1',120,10,NULL),(9,'admin@gmail.com','2025-03-27 10:37:05.603826',0,'admin@gmail.com','2025-03-27 10:37:05.603826','EXAM2545087','ETS2024 Test 2',120,10,NULL),(10,'admin@gmail.com','2025-03-27 10:37:24.523136',0,'admin@gmail.com','2025-03-27 10:37:24.523136','EXAM2539175','ETS2024 Test 3',120,10,NULL),(11,'admin@gmail.com','2025-03-27 10:38:50.869236',0,'admin@gmail.com','2025-03-27 10:38:50.869236','EXAM2581497','ILEST 2024 Test 1',150,10,NULL),(12,'admin@gmail.com','2025-03-27 10:42:13.112822',0,'admin@gmail.com','2025-03-27 10:42:13.112822','EXAM2588880','ILEST 2024 Test 2',150,10,NULL),(13,'admin@gmail.com','2025-03-27 10:42:32.909148',0,'admin@gmail.com','2025-03-27 10:42:32.909148','EXAM2549877','ILEST 2024 Test 3',150,10,NULL);
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_details`
--

DROP TABLE IF EXISTS `exam_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `exam_id` bigint DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK268arefjvq3txdtkqy6mijqub` (`exam_id`),
  CONSTRAINT `FK268arefjvq3txdtkqy6mijqub` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=275 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_details`
--

LOCK TABLES `exam_details` WRITE;
/*!40000 ALTER TABLE `exam_details` DISABLE KEYS */;
INSERT INTO `exam_details` VALUES (29,'admin@gmail.com','2025-03-27 10:47:35.390938',0,'admin@gmail.com','2025-03-27 10:47:35.390938','C','What is the capital of France? A. Berlin B. Madrid C. Paris  D. Rome','',8,'1'),(30,'admin@gmail.com','2025-03-27 10:48:04.529265',0,'admin@gmail.com','2025-03-27 10:48:04.529265','C','Which planet is known as the Red Planet? A. Earth B. Venus C. Mars D. Jupiter','',8,'2'),(31,'admin@gmail.com','2025-03-27 10:48:27.630358',0,'admin@gmail.com','2025-03-27 10:48:27.630358','C',' What is the largest ocean on Earth? A. Atlantic Ocean B. Indian Ocean C. Pacific Ocean D. Arctic Ocean','',8,'3'),(32,'admin@gmail.com','2025-03-27 10:49:44.350720',0,'admin@gmail.com','2025-03-27 10:49:44.350720','C','What is the square root of 64? A. 6 B. 7 C. 8 D. 9','',8,'5'),(33,'admin@gmail.com','2025-03-27 10:49:04.373722',0,'admin@gmail.com','2025-03-27 10:49:04.373722','C','What is the chemical symbol for water? A. CO₂ B. O₂ C. H₂O D. CH₄','',8,'6'),(34,'admin@gmail.com','2025-03-27 10:49:25.654105',0,'admin@gmail.com','2025-03-27 10:49:25.654105','B','Which animal is known as the \"King of the Jungle\"? A. Tiger B. Lion C. Elephant D. Bear','',8,'7'),(35,'admin@gmail.com','2025-03-27 10:48:44.132091',0,'admin@gmail.com','2025-03-27 10:48:44.132091','B','Who wrote \"Romeo and Juliet\"? A. Charles Dickens B. William Shakespeare C. Mark Twain D. Jane Austen','',8,'4'),(36,'admin@gmail.com','2025-03-27 10:50:01.650891',0,'admin@gmail.com','2025-03-27 10:50:01.650891','B','What is the currency of Japan? A. Yuan B. Yen C. Won D. Ringgit','',8,'8'),(37,'admin@gmail.com','2025-03-27 10:50:22.579157',0,'admin@gmail.com','2025-03-27 10:50:22.579157','C',' How many continents are there in the world? A. 5 B. 6 C. 7 D. 8','',8,'9'),(38,'admin@gmail.com','2025-03-27 10:50:35.701557',0,'admin@gmail.com','2025-03-27 10:50:35.701557','C','What is the chemical symbol for water? A. CO₂ B. O₂ C. H₂O  D. CH₄','',8,'10'),(225,'admin@gmail.com','2025-03-27 10:47:35.390938',0,'admin@gmail.com','2025-03-27 10:47:35.390938','C','What is the capital of France? A. Berlin B. Madrid C. Paris  D. Rome','',9,'1'),(226,'admin@gmail.com','2025-03-27 10:48:04.529265',0,'admin@gmail.com','2025-03-27 10:48:04.529265','C','Which planet is known as the Red Planet? A. Earth B. Venus C. Mars D. Jupiter','',9,'2'),(227,'admin@gmail.com','2025-03-27 10:48:27.630358',0,'admin@gmail.com','2025-03-27 10:48:27.630358','C',' What is the largest ocean on Earth? A. Atlantic Ocean B. Indian Ocean C. Pacific Ocean D. Arctic Ocean','',9,'3'),(228,'admin@gmail.com','2025-03-27 10:49:44.350720',0,'admin@gmail.com','2025-03-27 10:49:44.350720','C','What is the square root of 64? A. 6 B. 7 C. 8 D. 9','',9,'5'),(229,'admin@gmail.com','2025-03-27 10:49:04.373722',0,'admin@gmail.com','2025-03-27 10:49:04.373722','C','What is the chemical symbol for water? A. CO₂ B. O₂ C. H₂O D. CH₄','',9,'6'),(230,'admin@gmail.com','2025-03-27 10:49:25.654105',0,'admin@gmail.com','2025-03-27 10:49:25.654105','B','Which animal is known as the \"King of the Jungle\"? A. Tiger B. Lion C. Elephant D. Bear','',9,'7'),(231,'admin@gmail.com','2025-03-27 10:48:44.132091',0,'admin@gmail.com','2025-03-27 10:48:44.132091','B','Who wrote \"Romeo and Juliet\"? A. Charles Dickens B. William Shakespeare C. Mark Twain D. Jane Austen','',9,'4'),(232,'admin@gmail.com','2025-03-27 10:50:01.650891',0,'admin@gmail.com','2025-03-27 10:50:01.650891','B','What is the currency of Japan? A. Yuan B. Yen C. Won D. Ringgit','',9,'8'),(233,'admin@gmail.com','2025-03-27 10:50:22.579157',0,'admin@gmail.com','2025-03-27 10:50:22.579157','C',' How many continents are there in the world? A. 5 B. 6 C. 7 D. 8','',9,'9'),(234,'admin@gmail.com','2025-03-27 10:50:35.701557',0,'admin@gmail.com','2025-03-27 10:50:35.701557','C','What is the chemical symbol for water? A. CO₂ B. O₂ C. H₂O  D. CH₄','',9,'10'),(235,'admin@gmail.com','2025-03-27 10:47:35.390938',0,'admin@gmail.com','2025-03-27 10:47:35.390938','C','What is the capital of France? A. Berlin B. Madrid C. Paris  D. Rome','',10,'1'),(236,'admin@gmail.com','2025-03-27 10:48:04.529265',0,'admin@gmail.com','2025-03-27 10:48:04.529265','C','Which planet is known as the Red Planet? A. Earth B. Venus C. Mars D. Jupiter','',10,'2'),(237,'admin@gmail.com','2025-03-27 10:48:27.630358',0,'admin@gmail.com','2025-03-27 10:48:27.630358','C',' What is the largest ocean on Earth? A. Atlantic Ocean B. Indian Ocean C. Pacific Ocean D. Arctic Ocean','',10,'3'),(238,'admin@gmail.com','2025-03-27 10:49:44.350720',0,'admin@gmail.com','2025-03-27 10:49:44.350720','C','What is the square root of 64? A. 6 B. 7 C. 8 D. 9','',10,'5'),(239,'admin@gmail.com','2025-03-27 10:49:04.373722',0,'admin@gmail.com','2025-03-27 10:49:04.373722','C','What is the chemical symbol for water? A. CO₂ B. O₂ C. H₂O D. CH₄','',10,'6'),(240,'admin@gmail.com','2025-03-27 10:49:25.654105',0,'admin@gmail.com','2025-03-27 10:49:25.654105','B','Which animal is known as the \"King of the Jungle\"? A. Tiger B. Lion C. Elephant D. Bear','',10,'7'),(241,'admin@gmail.com','2025-03-27 10:48:44.132091',0,'admin@gmail.com','2025-03-27 10:48:44.132091','B','Who wrote \"Romeo and Juliet\"? A. Charles Dickens B. William Shakespeare C. Mark Twain D. Jane Austen','',10,'4'),(242,'admin@gmail.com','2025-03-27 10:50:01.650891',0,'admin@gmail.com','2025-03-27 10:50:01.650891','B','What is the currency of Japan? A. Yuan B. Yen C. Won D. Ringgit','',10,'8'),(243,'admin@gmail.com','2025-03-27 10:50:22.579157',0,'admin@gmail.com','2025-03-27 10:50:22.579157','C',' How many continents are there in the world? A. 5 B. 6 C. 7 D. 8','',10,'9'),(244,'admin@gmail.com','2025-03-27 10:50:35.701557',0,'admin@gmail.com','2025-03-27 10:50:35.701557','C','What is the chemical symbol for water? A. CO₂ B. O₂ C. H₂O  D. CH₄','',10,'10'),(245,'admin@gmail.com','2025-03-27 10:47:35.390938',0,'admin@gmail.com','2025-03-27 10:47:35.390938','C','What is the capital of France? A. Berlin B. Madrid C. Paris  D. Rome','',11,'1'),(246,'admin@gmail.com','2025-03-27 10:48:04.529265',0,'admin@gmail.com','2025-03-27 10:48:04.529265','C','Which planet is known as the Red Planet? A. Earth B. Venus C. Mars D. Jupiter','',11,'2'),(247,'admin@gmail.com','2025-03-27 10:48:27.630358',0,'admin@gmail.com','2025-03-27 10:48:27.630358','C',' What is the largest ocean on Earth? A. Atlantic Ocean B. Indian Ocean C. Pacific Ocean D. Arctic Ocean','',11,'3'),(248,'admin@gmail.com','2025-03-27 10:49:44.350720',0,'admin@gmail.com','2025-03-27 10:49:44.350720','C','What is the square root of 64? A. 6 B. 7 C. 8 D. 9','',11,'5'),(249,'admin@gmail.com','2025-03-27 10:49:04.373722',0,'admin@gmail.com','2025-03-27 10:49:04.373722','C','What is the chemical symbol for water? A. CO₂ B. O₂ C. H₂O D. CH₄','',11,'6'),(250,'admin@gmail.com','2025-03-27 10:49:25.654105',0,'admin@gmail.com','2025-03-27 10:49:25.654105','B','Which animal is known as the \"King of the Jungle\"? A. Tiger B. Lion C. Elephant D. Bear','',11,'7'),(251,'admin@gmail.com','2025-03-27 10:48:44.132091',0,'admin@gmail.com','2025-03-27 10:48:44.132091','B','Who wrote \"Romeo and Juliet\"? A. Charles Dickens B. William Shakespeare C. Mark Twain D. Jane Austen','',11,'4'),(252,'admin@gmail.com','2025-03-27 10:50:01.650891',0,'admin@gmail.com','2025-03-27 10:50:01.650891','B','What is the currency of Japan? A. Yuan B. Yen C. Won D. Ringgit','',11,'8'),(253,'admin@gmail.com','2025-03-27 10:50:22.579157',0,'admin@gmail.com','2025-03-27 10:50:22.579157','C',' How many continents are there in the world? A. 5 B. 6 C. 7 D. 8','',11,'9'),(254,'admin@gmail.com','2025-03-27 10:50:35.701557',0,'admin@gmail.com','2025-03-27 10:50:35.701557','C','What is the chemical symbol for water? A. CO₂ B. O₂ C. H₂O  D. CH₄','',11,'10'),(255,'admin@gmail.com','2025-03-27 10:47:35.390938',0,'admin@gmail.com','2025-03-27 10:47:35.390938','C','What is the capital of France? A. Berlin B. Madrid C. Paris  D. Rome','',12,'1'),(256,'admin@gmail.com','2025-03-27 10:48:04.529265',0,'admin@gmail.com','2025-03-27 10:48:04.529265','C','Which planet is known as the Red Planet? A. Earth B. Venus C. Mars D. Jupiter','',12,'2'),(257,'admin@gmail.com','2025-03-27 10:48:27.630358',0,'admin@gmail.com','2025-03-27 10:48:27.630358','C',' What is the largest ocean on Earth? A. Atlantic Ocean B. Indian Ocean C. Pacific Ocean D. Arctic Ocean','',12,'3'),(258,'admin@gmail.com','2025-03-27 10:49:44.350720',0,'admin@gmail.com','2025-03-27 10:49:44.350720','C','What is the square root of 64? A. 6 B. 7 C. 8 D. 9','',12,'5'),(259,'admin@gmail.com','2025-03-27 10:49:04.373722',0,'admin@gmail.com','2025-03-27 10:49:04.373722','C','What is the chemical symbol for water? A. CO₂ B. O₂ C. H₂O D. CH₄','',12,'6'),(260,'admin@gmail.com','2025-03-27 10:49:25.654105',0,'admin@gmail.com','2025-03-27 10:49:25.654105','B','Which animal is known as the \"King of the Jungle\"? A. Tiger B. Lion C. Elephant D. Bear','',12,'7'),(261,'admin@gmail.com','2025-03-27 10:48:44.132091',0,'admin@gmail.com','2025-03-27 10:48:44.132091','B','Who wrote \"Romeo and Juliet\"? A. Charles Dickens B. William Shakespeare C. Mark Twain D. Jane Austen','',12,'4'),(262,'admin@gmail.com','2025-03-27 10:50:01.650891',0,'admin@gmail.com','2025-03-27 10:50:01.650891','B','What is the currency of Japan? A. Yuan B. Yen C. Won D. Ringgit','',12,'8'),(263,'admin@gmail.com','2025-03-27 10:50:22.579157',0,'admin@gmail.com','2025-03-27 10:50:22.579157','C',' How many continents are there in the world? A. 5 B. 6 C. 7 D. 8','',12,'9'),(264,'admin@gmail.com','2025-03-27 10:50:35.701557',0,'admin@gmail.com','2025-03-27 10:50:35.701557','C','What is the chemical symbol for water? A. CO₂ B. O₂ C. H₂O  D. CH₄','',12,'10'),(265,'admin@gmail.com','2025-03-27 10:47:35.390938',0,'admin@gmail.com','2025-03-27 10:47:35.390938','C','What is the capital of France? A. Berlin B. Madrid C. Paris  D. Rome','',13,'1'),(266,'admin@gmail.com','2025-03-27 10:48:04.529265',0,'admin@gmail.com','2025-03-27 10:48:04.529265','C','Which planet is known as the Red Planet? A. Earth B. Venus C. Mars D. Jupiter','',13,'2'),(267,'admin@gmail.com','2025-03-27 10:48:27.630358',0,'admin@gmail.com','2025-03-27 10:48:27.630358','C',' What is the largest ocean on Earth? A. Atlantic Ocean B. Indian Ocean C. Pacific Ocean D. Arctic Ocean','',13,'3'),(268,'admin@gmail.com','2025-03-27 10:49:44.350720',0,'admin@gmail.com','2025-03-27 10:49:44.350720','C','What is the square root of 64? A. 6 B. 7 C. 8 D. 9','',13,'5'),(269,'admin@gmail.com','2025-03-27 10:49:04.373722',0,'admin@gmail.com','2025-03-27 10:49:04.373722','C','What is the chemical symbol for water? A. CO₂ B. O₂ C. H₂O D. CH₄','',13,'6'),(270,'admin@gmail.com','2025-03-27 10:49:25.654105',0,'admin@gmail.com','2025-03-27 10:49:25.654105','B','Which animal is known as the \"King of the Jungle\"? A. Tiger B. Lion C. Elephant D. Bear','',13,'7'),(271,'admin@gmail.com','2025-03-27 10:48:44.132091',0,'admin@gmail.com','2025-03-27 10:48:44.132091','B','Who wrote \"Romeo and Juliet\"? A. Charles Dickens B. William Shakespeare C. Mark Twain D. Jane Austen','',13,'4'),(272,'admin@gmail.com','2025-03-27 10:50:01.650891',0,'admin@gmail.com','2025-03-27 10:50:01.650891','B','What is the currency of Japan? A. Yuan B. Yen C. Won D. Ringgit','',13,'8'),(273,'admin@gmail.com','2025-03-27 10:50:22.579157',0,'admin@gmail.com','2025-03-27 10:50:22.579157','C',' How many continents are there in the world? A. 5 B. 6 C. 7 D. 8','',13,'9'),(274,'admin@gmail.com','2025-03-27 10:50:35.701557',0,'admin@gmail.com','2025-03-27 10:50:35.701557','C','What is the chemical symbol for water? A. CO₂ B. O₂ C. H₂O  D. CH₄','',13,'10');
/*!40000 ALTER TABLE `exam_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `number_student` bigint DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  `remain_student` bigint DEFAULT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `study_date` varchar(255) DEFAULT NULL,
  `study_time` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7e8ca7hfmrpruicqhocskjlf2` (`course_id`),
  CONSTRAINT `FK7e8ca7hfmrpruicqhocskjlf2` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade`
--

LOCK TABLES `grade` WRITE;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
INSERT INTO `grade` VALUES (59,'admin@gmail.com','2025-03-21 15:46:30.908488',0,'duongsmoke1@gmail.com','2025-03-22 11:43:23.392656','GR2548048','TS93',12,1,8,'2025-03-20 07:00:00.000000','2,5,6','17:00-18:30','https://discord.com/channels/1346742537758441572'),(60,'admin@gmail.com','2025-03-21 15:48:57.728583',0,'duongsmoke1@gmail.com','2025-03-22 11:41:13.304310','GR2539308','TS89',13,1,9,'2025-03-21 07:00:00.000000','2,4,6','17:00-18:30','https://discord.com/channels/1346742537758441572'),(61,'admin@gmail.com','2025-03-21 15:59:51.731513',0,'admin@gmail.com','2025-03-21 15:59:51.731513','GR2537320','A100',31,2,31,'2025-03-29 07:00:00.000000','3,5,7','18:00-19:30','https://discord.com/channels/1346742537758441572'),(62,'admin@gmail.com','2025-03-21 16:01:03.169625',0,'admin@gmail.com','2025-03-21 16:01:03.169625','GR2590271','A123',12,2,12,'2025-03-26 07:00:00.000000','2,4,6','21:00-22:30','https://discord.com/channels/1346742537758441572');
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grade_account`
--

DROP TABLE IF EXISTS `grade_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade_account` (
  `grade_id` bigint NOT NULL,
  `account_id` bigint NOT NULL,
  PRIMARY KEY (`grade_id`,`account_id`),
  KEY `FKc6y6gr4rhkokwcqq6rjimk73j` (`account_id`),
  CONSTRAINT `FKc6y6gr4rhkokwcqq6rjimk73j` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FKfq1cp9y8jvp6fe3npgr4y9xlm` FOREIGN KEY (`grade_id`) REFERENCES `grade` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade_account`
--

LOCK TABLES `grade_account` WRITE;
/*!40000 ALTER TABLE `grade_account` DISABLE KEYS */;
INSERT INTO `grade_account` VALUES (59,3),(60,3),(61,3),(62,3),(59,9);
/*!40000 ALTER TABLE `grade_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `public_id` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6mthrhpjbn4uo67cuqi6tolwp` (`course_id`),
  KEY `FK37umbgqe9rxw10adl0vjah5a7` (`account_id`),
  CONSTRAINT `FK37umbgqe9rxw10adl0vjah5a7` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FK6mthrhpjbn4uo67cuqi6tolwp` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (3,'admin@gmail.com','2025-02-21 15:23:19.461559',0,'admin@gmail.com','2025-02-21 15:23:19.461559','8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3','image/png','http://res.cloudinary.com/dilyyimrn/image/upload/v1740126198/8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3.png',1,NULL),(4,NULL,NULL,0,NULL,NULL,'8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3','image/png','http://res.cloudinary.com/dilyyimrn/image/upload/v1740126198/8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3.png',2,NULL),(5,NULL,NULL,0,NULL,NULL,'8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3','image/png','http://res.cloudinary.com/dilyyimrn/image/upload/v1740126198/8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3.png',3,NULL),(6,NULL,NULL,0,NULL,NULL,'8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3','image/png','http://res.cloudinary.com/dilyyimrn/image/upload/v1740126198/8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3.png',4,NULL),(7,NULL,NULL,0,NULL,NULL,'8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3','image/png','http://res.cloudinary.com/dilyyimrn/image/upload/v1740126198/8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3.png',5,NULL),(8,NULL,NULL,0,NULL,NULL,'8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3','image/png','http://res.cloudinary.com/dilyyimrn/image/upload/v1740126198/8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3.png',6,NULL),(9,NULL,NULL,0,NULL,NULL,'8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3','image/png','http://res.cloudinary.com/dilyyimrn/image/upload/v1740126198/8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3.png',7,NULL),(10,NULL,NULL,0,NULL,NULL,'8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3','image/png','http://res.cloudinary.com/dilyyimrn/image/upload/v1740126198/8088cfdb-9c76-47b1-b57b-948b78d12563_khoa-hoc-tieng-anh-online-cho-nguoi-di-lam-tai-aten-english-co-gi-dac-biet-so-3.png',8,NULL),(23,NULL,NULL,0,'admin@gmail.com','2025-03-01 21:18:50.126945','86ca4664-6279-49f9-965d-97f23204bcfa_iuem','image/jpeg','http://res.cloudinary.com/dilyyimrn/image/upload/v1740838729/86ca4664-6279-49f9-965d-97f23204bcfa_iuem.jpg',NULL,1),(24,NULL,NULL,0,'user@gmail.com','2025-03-03 10:36:09.269128','abad8a31-6a98-4c42-a0b9-6acfb0a65c04_z4567928878543_d57bb0ae9e3520d6b6dc10fc170ad077','image/jpeg','http://res.cloudinary.com/dilyyimrn/image/upload/v1740972968/abad8a31-6a98-4c42-a0b9-6acfb0a65c04_z4567928878543_d57bb0ae9e3520d6b6dc10fc170ad077.jpg',NULL,2),(25,NULL,NULL,0,'admin@gmail.com','2025-03-27 11:53:54.771757','eager','image/webp','http://res.cloudinary.com/dilyyimrn/image/upload/v1743050660/eager.jpg',NULL,3),(26,NULL,NULL,0,'admin@gmail.com','2025-03-27 11:44:20.905318','eager','image/webp','http://res.cloudinary.com/dilyyimrn/image/upload/v1743050660/eager.jpg',NULL,9),(27,NULL,NULL,0,'admin@gmail.com','2025-02-28 19:54:06.949432','c6405243-3739-43f7-ac86-cf115fe0fab2_anh-cho-cute-de-thuong-dang-yeu-41','image/jpeg','http://res.cloudinary.com/dilyyimrn/image/upload/v1740747244/c6405243-3739-43f7-ac86-cf115fe0fab2_anh-cho-cute-de-thuong-dang-yeu-41.jpg',NULL,10),(28,NULL,NULL,0,'admin@gmail.com','2025-02-22 15:47:58.236797','5741dca6-b14a-4698-be80-76d845e201ba_z4567928825214_c9a87336f5b25567cc784db846399360','image/jpeg','http://res.cloudinary.com/dilyyimrn/image/upload/v1740214076/5741dca6-b14a-4698-be80-76d845e201ba_z4567928825214_c9a87336f5b25567cc784db846399360.jpg',NULL,11),(30,'admin@gmail.com','2025-03-01 18:05:55.628935',NULL,'admin@gmail.com','2025-03-01 18:05:55.628935','9594b4e2-3ee4-465c-a40d-2c2c466c681c_hinh-anh-con-ho_024656931','image/jpeg','http://res.cloudinary.com/dilyyimrn/image/upload/v1740827152/9594b4e2-3ee4-465c-a40d-2c2c466c681c_hinh-anh-con-ho_024656931.jpg',NULL,14),(31,NULL,NULL,0,'admin@gmail.com','2025-03-27 11:53:54.771757','eager','image/webp','http://res.cloudinary.com/dilyyimrn/image/upload/v1743050660/eager.jpg',NULL,15),(32,NULL,NULL,0,'admin@gmail.com','2025-03-27 11:53:54.771757','eager','image/webp','http://res.cloudinary.com/dilyyimrn/image/upload/v1743050660/eager.jpg',NULL,16),(33,NULL,NULL,0,'admin@gmail.com','2025-03-27 11:53:54.771757','eager','image/webp','http://res.cloudinary.com/dilyyimrn/image/upload/v1743050660/eager.jpg',NULL,17),(34,NULL,NULL,0,'admin@gmail.com','2025-03-27 11:53:54.771757','eager','image/webp','http://res.cloudinary.com/dilyyimrn/image/upload/v1743050660/eager.jpg',NULL,18),(35,NULL,NULL,0,'admin@gmail.com','2025-03-27 11:53:54.771757','eager','image/webp','http://res.cloudinary.com/dilyyimrn/image/upload/v1743050660/eager.jpg',NULL,19);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infor_teacher`
--

DROP TABLE IF EXISTS `infor_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infor_teacher` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `experience` int DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKm4b2p10m7nhr77lrpl41p2qtm` (`account_id`),
  CONSTRAINT `FK92g7knne2u2kl3vt8fuiso45f` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infor_teacher`
--

LOCK TABLES `infor_teacher` WRITE;
/*!40000 ALTER TABLE `infor_teacher` DISABLE KEYS */;
INSERT INTO `infor_teacher` VALUES (8,NULL,NULL,0,'teacher@gmail.com','2025-03-01 23:49:31.623076','Ninh Bình Star 1','2003-04-28',10,3),(10,NULL,NULL,0,'teacher@gmail.com','2025-03-01 23:49:31.623076','Ninh Bình Star 1','2003-04-28',10,15),(11,NULL,NULL,0,'teacher@gmail.com','2025-03-01 23:49:31.623076','Ninh Bình Star 1','2003-04-28',10,16),(12,NULL,NULL,0,'teacher@gmail.com','2025-03-01 23:49:31.623076','Ninh Bình Star 1','2003-04-28',10,17),(13,NULL,NULL,0,'teacher@gmail.com','2025-03-01 23:49:31.623076','Ninh Bình Star 1','2003-04-28',10,18),(14,NULL,NULL,0,'teacher@gmail.com','2025-03-01 23:49:31.623076','Ninh Bình Star 1','2003-04-28',10,19);
/*!40000 ALTER TABLE `infor_teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `point`
--

DROP TABLE IF EXISTS `point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `point` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `name_exam` varchar(255) DEFAULT NULL,
  `rank_level` int DEFAULT NULL,
  `score` double DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  `completion_time` bigint DEFAULT NULL,
  `exam_id` bigint DEFAULT NULL,
  `submitted` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhi02vy9fch2emcqetloq38jve` (`account_id`),
  KEY `FKjq2xfxdbjm84ba8sujkil1h2e` (`exam_id`),
  CONSTRAINT `FKhi02vy9fch2emcqetloq38jve` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FKjq2xfxdbjm84ba8sujkil1h2e` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `point`
--

LOCK TABLES `point` WRITE;
/*!40000 ALTER TABLE `point` DISABLE KEYS */;
INSERT INTO `point` VALUES (3,'duongsmoke1@gmail.com','2025-03-27 11:00:19.345413',0,'duongsmoke1@gmail.com','2025-03-27 11:00:19.345413',NULL,NULL,10,9,0,13,NULL);
/*!40000 ALTER TABLE `point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roadmap`
--

DROP TABLE IF EXISTS `roadmap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roadmap` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(2000) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roadmap`
--

LOCK TABLES `roadmap` WRITE;
/*!40000 ALTER TABLE `roadmap` DISABLE KEYS */;
INSERT INTO `roadmap` VALUES (1,NULL,NULL,1,NULL,NULL,'900+ toeic',15,'Toiec 4 skill',2000.00);
/*!40000 ALTER TABLE `roadmap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,NULL,NULL,0,NULL,NULL,'ADMIN','ADMIN'),(2,NULL,NULL,0,NULL,NULL,'USER','USER'),(3,NULL,NULL,0,NULL,NULL,'TEACHER','TEACHER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salary`
--

DROP TABLE IF EXISTS `salary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salary` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `basic_salary` varchar(255) DEFAULT NULL,
  `bouns_salary` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKryvscdqtilwx90os2bms6ul27` (`account_id`),
  CONSTRAINT `FKryvscdqtilwx90os2bms6ul27` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salary`
--

LOCK TABLES `salary` WRITE;
/*!40000 ALTER TABLE `salary` DISABLE KEYS */;
/*!40000 ALTER TABLE `salary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timetable`
--

DROP TABLE IF EXISTS `timetable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timetable` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `period` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `grade_id` bigint DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjindbb28sm3veak34lylf122w` (`grade_id`),
  CONSTRAINT `FKjindbb28sm3veak34lylf122w` FOREIGN KEY (`grade_id`) REFERENCES `grade` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timetable`
--

LOCK TABLES `timetable` WRITE;
/*!40000 ALTER TABLE `timetable` DISABLE KEYS */;
INSERT INTO `timetable` VALUES (184,'admin@gmail.com','2025-03-21 15:46:31.044385',0,'admin@gmail.com','2025-03-22 09:03:33.906840','2025-03-20 07:00:00.000000','Phần 1: Ngữ pháp cơ bản','50','https://www.youtube.com/watch?v=-4mmSzTdDvM',59,'17:00-18:30'),(185,'admin@gmail.com','2025-03-21 15:46:31.055455',0,'admin@gmail.com','2025-03-21 15:46:31.055455','2025-03-21 07:00:00.000000','Phần 2: Từ vựng cơ bản','40.00','https://www.youtube.com/watch?v=NZxK3oIxI3Y',59,'17:00-18:30'),(186,'admin@gmail.com','2025-03-21 15:46:31.060969',0,'admin@gmail.com','2025-03-21 15:46:31.060969','2025-03-24 07:00:00.000000','Phần 3: Phát âm cơ bản','30.00','https://www.youtube.com/watch?v=NZxK3oIxI3Y',59,'17:00-18:30'),(187,'admin@gmail.com','2025-03-21 15:46:31.068130',0,'admin@gmail.com','2025-03-21 15:46:31.068130','2025-03-27 07:00:00.000000','Phần 4: Giao tiếp cơ bản','30.00','https://www.youtube.com/watch?v=NZxK3oIxI3Y',59,'17:00-18:30'),(188,'admin@gmail.com','2025-03-21 15:46:31.071144',0,'admin@gmail.com','2025-03-21 15:46:31.071144','2025-03-28 07:00:00.000000','demo 1','10','https://www.youtube.com/watch?v=NZxK3oIxI3Y',59,'17:00-18:30'),(189,'admin@gmail.com','2025-03-21 15:46:31.076262',0,'admin@gmail.com','2025-03-21 15:46:31.076262','2025-03-31 07:00:00.000000','Phần 5','100','https://www.youtube.com/watch?v=NZxK3oIxI3Y',59,'17:00-18:30'),(190,'admin@gmail.com','2025-03-21 15:46:31.083273',0,'admin@gmail.com','2025-03-21 15:46:31.083273','2025-04-03 07:00:00.000000','Phan 61','191','https://www.youtube.com/watch?v=NZxK3oIxI3Y',59,'17:00-18:30'),(191,'admin@gmail.com','2025-03-21 15:46:31.088272',0,'admin@gmail.com','2025-03-21 15:46:31.088272','2025-04-04 07:00:00.000000','ihugy','7','https://www.youtube.com/watch?v=NZxK3oIxI3Y',59,'17:00-18:30'),(192,'admin@gmail.com','2025-03-21 15:46:31.092792',0,'admin@gmail.com','2025-03-21 15:46:31.092792','2025-04-07 07:00:00.000000','ihugy','7','https://www.youtube.com/watch?v=NZxK3oIxI3Y',59,'17:00-18:30'),(193,'admin@gmail.com','2025-03-21 15:46:31.095773',0,'admin@gmail.com','2025-03-21 15:46:31.095773','2025-04-10 07:00:00.000000','abc','1','https://www.youtube.com/watch?v=NZxK3oIxI3Y',59,'17:00-18:30'),(194,'admin@gmail.com','2025-03-21 15:46:31.097771',0,'admin@gmail.com','2025-03-21 15:46:31.097771','2025-04-11 07:00:00.000000','def','2','https://www.youtube.com/watch?v=NZxK3oIxI3Y',59,'17:00-18:30'),(195,'admin@gmail.com','2025-03-21 15:48:57.744619',0,'admin@gmail.com','2025-03-21 15:48:57.744619','2025-03-21 07:00:00.000000','Phần 1: Ngữ pháp cơ bản','50','https://www.youtube.com/watch?v=NZxK3oIxI3Y',60,'17:00-18:30'),(196,'admin@gmail.com','2025-03-21 15:48:57.748617',0,'admin@gmail.com','2025-03-21 15:48:57.748617','2025-03-24 07:00:00.000000','Phần 2: Từ vựng cơ bản','40.00','https://www.youtube.com/watch?v=NZxK3oIxI3Y',60,'17:00-18:30'),(197,'admin@gmail.com','2025-03-21 15:48:57.755682',0,'admin@gmail.com','2025-03-21 15:48:57.755682','2025-03-26 07:00:00.000000','Phần 3: Phát âm cơ bản','30.00','https://www.youtube.com/watch?v=NZxK3oIxI3Y',60,'17:00-18:30'),(198,'admin@gmail.com','2025-03-21 15:48:57.760423',0,'admin@gmail.com','2025-03-21 15:48:57.760423','2025-03-28 07:00:00.000000','Phần 4: Giao tiếp cơ bản','30.00','https://www.youtube.com/watch?v=NZxK3oIxI3Y',60,'17:00-18:30'),(199,'admin@gmail.com','2025-03-21 15:48:57.765379',0,'admin@gmail.com','2025-03-21 15:48:57.765379','2025-03-31 07:00:00.000000','demo 1','10','https://www.youtube.com/watch?v=NZxK3oIxI3Y',60,'17:00-18:30'),(200,'admin@gmail.com','2025-03-21 15:48:57.769450',0,'admin@gmail.com','2025-03-21 15:48:57.769450','2025-04-02 07:00:00.000000','Phần 5','100','https://www.youtube.com/watch?v=NZxK3oIxI3Y',60,'17:00-18:30'),(201,'admin@gmail.com','2025-03-21 15:48:57.772440',0,'admin@gmail.com','2025-03-21 15:48:57.772440','2025-04-04 07:00:00.000000','Phan 61','191','https://www.youtube.com/watch?v=NZxK3oIxI3Y',60,'17:00-18:30'),(202,'admin@gmail.com','2025-03-21 15:48:57.777127',0,'admin@gmail.com','2025-03-21 15:48:57.777127','2025-04-07 07:00:00.000000','ihugy','7','https://www.youtube.com/watch?v=NZxK3oIxI3Y',60,'17:00-18:30'),(203,'admin@gmail.com','2025-03-21 15:48:57.781173',0,'admin@gmail.com','2025-03-21 15:48:57.781173','2025-04-09 07:00:00.000000','ihugy','7','https://www.youtube.com/watch?v=NZxK3oIxI3Y',60,'17:00-18:30'),(204,'admin@gmail.com','2025-03-21 15:48:57.784168',0,'admin@gmail.com','2025-03-21 15:48:57.784168','2025-04-11 07:00:00.000000','abc','1','https://www.youtube.com/watch?v=NZxK3oIxI3Y',60,'17:00-18:30'),(205,'admin@gmail.com','2025-03-21 15:48:57.789243',0,'admin@gmail.com','2025-03-21 15:48:57.789243','2025-04-14 07:00:00.000000','def','2','https://www.youtube.com/watch?v=NZxK3oIxI3Y',60,'17:00-18:30'),(206,'admin@gmail.com','2025-03-21 15:59:51.757890',0,'admin@gmail.com','2025-03-21 15:59:51.757890','2025-03-29 07:00:00.000000','abc','1','https://www.youtube.com/watch?v=NZxK3oIxI3Y',61,'18:00-19:30'),(207,'admin@gmail.com','2025-03-21 16:01:03.194691',0,'admin@gmail.com','2025-03-21 16:01:03.194691','2025-03-26 07:00:00.000000','abc','1','https://www.youtube.com/watch?v=NZxK3oIxI3Y',62,'21:00-22:30');
/*!40000 ALTER TABLE `timetable` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-27 16:14:37
