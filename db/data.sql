-- MySQL dump 10.13  Distrib 5.7.32, for Linux (x86_64)
--
-- Host: localhost    Database: TimeMaster
-- ------------------------------------------------------
-- Server version	5.7.32-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `idevent` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `timeBegin` datetime NOT NULL,
  `timeEnd` datetime NOT NULL,
  `idgoal` int(11) NOT NULL,
  PRIMARY KEY (`idevent`),
  UNIQUE KEY `idevent_UNIQUE` (`idevent`),
  KEY `fk_idgoal_event_goal_idx` (`idgoal`),
  CONSTRAINT `fk_idgoal_event_goal` FOREIGN KEY (`idgoal`) REFERENCES `goal` (`idgoal`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goal`
--

DROP TABLE IF EXISTS `goal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goal` (
  `idgoal` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `creator` int(11) NOT NULL,
  PRIMARY KEY (`idgoal`),
  UNIQUE KEY `idgoal_UNIQUE` (`idgoal`),
  KEY `fk_goal_creator_idx` (`creator`),
  CONSTRAINT `fk_goal_creator` FOREIGN KEY (`creator`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goal`
--

LOCK TABLES `goal` WRITE;
/*!40000 ALTER TABLE `goal` DISABLE KEYS */;
INSERT INTO `goal` VALUES (1,'Fix decimal point bug','Floating point variables seem to be causing unexpected behaviour',1),(2,'Fix crashing problem','Users have submitted a ticket regarding a crashing problem',1),(3,'Add a submit button','Submit button needs to be added to the main page',1),(4,'Clean up the database','Datebase needs some maintainance regarding the user password storage',1),(5,'Deploy latest version','Latest version needs to be deployed immediately to ensure up-to-date user experience',1),(6,'Add support for UTF-8','Balkan users can\'t properly create accounts due to missing characters',1);
/*!40000 ALTER TABLE `goal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `onetime`
--

DROP TABLE IF EXISTS `onetime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `onetime` (
  `idonetime` int(11) NOT NULL AUTO_INCREMENT,
  `idreminder` int(11) NOT NULL,
  PRIMARY KEY (`idonetime`),
  UNIQUE KEY `idonetime_UNIQUE` (`idonetime`),
  KEY `fk_repeating_reminder_idreminder_idx` (`idreminder`),
  CONSTRAINT `fk_onetime_reminder_idreminder` FOREIGN KEY (`idreminder`) REFERENCES `reminder` (`idreminder`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `onetime`
--

LOCK TABLES `onetime` WRITE;
/*!40000 ALTER TABLE `onetime` DISABLE KEYS */;
INSERT INTO `onetime` VALUES (1,2),(2,3);
/*!40000 ALTER TABLE `onetime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reminder`
--

DROP TABLE IF EXISTS `reminder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reminder` (
  `idreminder` int(11) NOT NULL AUTO_INCREMENT,
  `dateCreated` datetime NOT NULL,
  `creator` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `dateBegin` datetime NOT NULL,
  PRIMARY KEY (`idreminder`),
  UNIQUE KEY `idevent_UNIQUE` (`idreminder`),
  KEY `fk_reminder_user_idx` (`creator`),
  CONSTRAINT `fk_reminder_user` FOREIGN KEY (`creator`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminder`
--

LOCK TABLES `reminder` WRITE;
/*!40000 ALTER TABLE `reminder` DISABLE KEYS */;
INSERT INTO `reminder` VALUES (1,'2020-11-20 20:00:00',2,'Stand up','Stretch your legs','2020-11-20 20:00:00'),(2,'2020-11-20 20:00:00',2,'Water your plants','Or they will die :(','2020-11-21 08:00:00'),(3,'2020-11-20 20:00:00',2,'Turn on boiler','You don\'t want a cold shower, right?','2020-11-21 11:00:00');
/*!40000 ALTER TABLE `reminder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repeating`
--

DROP TABLE IF EXISTS `repeating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `repeating` (
  `idrepeating` int(11) NOT NULL AUTO_INCREMENT,
  `time` int(11) NOT NULL,
  `idreminder` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idrepeating`),
  UNIQUE KEY `idrepeating_UNIQUE` (`idrepeating`),
  KEY `fk_repeating_reminder_idreminder_idx` (`idreminder`),
  CONSTRAINT `fk_repeating_reminder_idreminder` FOREIGN KEY (`idreminder`) REFERENCES `reminder` (`idreminder`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repeating`
--

LOCK TABLES `repeating` WRITE;
/*!40000 ALTER TABLE `repeating` DISABLE KEYS */;
INSERT INTO `repeating` VALUES (1,15,1,1);
/*!40000 ALTER TABLE `repeating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solution`
--

DROP TABLE IF EXISTS `solution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solution` (
  `idsolution` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`idsolution`),
  UNIQUE KEY `idsolution_UNIQUE` (`idsolution`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solution`
--

LOCK TABLES `solution` WRITE;
/*!40000 ALTER TABLE `solution` DISABLE KEYS */;
INSERT INTO `solution` VALUES (1,'2020-11-20','UTF-8 is now supported. Changed the include parameter');
/*!40000 ALTER TABLE `solution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (
  `idtask` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL DEFAULT '0',
  `resolved` int(11) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `idgoal` int(11) NOT NULL,
  `assignee` int(11) DEFAULT NULL,
  `urgency` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idtask`),
  UNIQUE KEY `idtask_UNIQUE` (`idtask`),
  KEY `fk_idsolution_task_idx` (`resolved`),
  KEY `fk_idgoal_task_goal_idx` (`idgoal`),
  KEY `fk_idassignee_user_idx` (`assignee`),
  CONSTRAINT `fk_idassignee_user` FOREIGN KEY (`assignee`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_idgoal_task_goal` FOREIGN KEY (`idgoal`) REFERENCES `goal` (`idgoal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_idsolution_task` FOREIGN KEY (`resolved`) REFERENCES `solution` (`idsolution`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,2,NULL,'2020-11-20 20:00:00',1,NULL,0),(2,2,NULL,'2020-11-20 20:00:00',2,NULL,1),(3,1,NULL,'2020-11-20 20:00:00',3,NULL,0),(4,5,NULL,'2020-11-20 20:00:00',4,NULL,0),(5,5,NULL,'2020-11-20 20:00:00',5,NULL,1),(6,1,1,'2020-11-20 20:00:00',6,2,1);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `iduser_UNIQUE` (`iduser`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'kenan','7586abf186ed94a3c5a1b74bb78bdcd6b0a8d990',2),(2,'adna','16eb0f78abbd99323ae742719a3619db5bc76539',1),(3,'emir','230fa112586ee6f1f9bb1f6b9475ad2369c37d88',1),(4,'ajla','32397fc19eb6f4f17f10c66af90d629c01cb8e4a',1),(5,'eldar','b8810ca3a16c758caeb7fb32fcc1d4046fba2fb4',1),(6,'zlatan','12575433bce7fcdc1e4ffe186ef0efc5bf9862bb',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-20 17:06:45
