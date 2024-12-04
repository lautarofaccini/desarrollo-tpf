-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: desarrollo_tpf
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin@example.com','hashedpassword1','admin_user','admin'),(2,'user1@example.com','hashedpassword2','user1','user'),(3,'user2@example.com','hashedpassword3','user2','user'),(4,'user3@example.com','hashedpassword4','user3','user'),(5,'user4@example.com','hashedpassword5','user4','user'),(6,'user5@example.com','hashedpassword6','user5','user'),(7,'user6@example.com','hashedpassword7','user6','user'),(8,'user7@example.com','hashedpassword8','user7','user'),(9,'user8@example.com','hashedpassword9','user8','user'),(10,'user9@example.com','hashedpassword10','user9','user'),(11,'user10@example.com','hashedpassword11','user10','user'),(14,'admin@admin.com','$2b$10$WZ/1.J62dh3Wiw1ywSq3suEeCnTnHXK671KvQG2ZwT5GrlNbgjjle','admin','admin'),(15,'lautarofaccini@gmail.com','$2b$10$OIF2fQrifekO/uxJpzfBpOYQDRyW.NjoViwQrjVHNefHqVChra.Ee','lautarofaccini','admin'),(16,'lautarofaccini@hotmail.com','$2b$10$a.zkW7ZmIyrGY/Nn2wQWbOfOaLGnuihUdpiCzJnV1KwYFmhZK32Ye','laucha','user'),(17,'user@user.com','$2b$10$YnDRULoNttilnCsnbbfl4.QcTlG9fT5SUgGz4VBJAQ4HgxkrdM4LO','user','user'),(18,'lauta@gma.com','$2b$10$u9q0PM1FokAOT4o4Nd2YUOzBHCDE99Nj3sncZScV2FrTbUABMpARm','lautarof02','user'),(19,'celaucha@hotmail.com','$2b$10$/qzpGHHDFvJAzjRCrIn/HelYmi.IvOaB/KTRQ9ovV8nXIVqqIJ8Y.','LauchaCelu','user'),(20,'usuario1@example.com','$2b$10$6G/dHT0q7Sonjb/3idyI5uFmaI898aAFrcApu7NZANod9YoQ1UAxK','usuario1','user'),(21,'usuario2@example.com','$2b$10$eKuP7ENRrA590sh2TiLDfOI86GnoMIMKVblQYDm/qLbq5/HstAhsm','usuario2','user'),(22,'usuario3@example.com','$2b$10$XrGpRynzJrFSvXhEX9Y5pO8wqvrg6aDodhYWRLcJxESwhOjJTHlDu','usuario3','user'),(23,'usuario4@example.com','$2b$10$mZ.WGePLCucSupptgAQz3uz2m6PsSx.M38xNE3NAk42uqsqsQdOHa','usuario4','user'),(24,'usuario5@example.com','$2b$10$e0QB4yjTlwJpZsNWVK/HCO0qF4uDlaGUvUhUVr0ecedyGu.EbJ1FG','usuario5','user');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-01 23:10:52
