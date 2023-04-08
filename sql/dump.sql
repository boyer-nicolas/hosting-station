-- DUMPED ON 17/06/2022 at 17:55:26
-- MariaDB dump 10.19  Distrib 10.8.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: mariadb    Database: hostingstation
-- ------------------------------------------------------
-- Server version	10.8.3-MariaDB-1:10.8.3+maria~jammy
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!40101 SET NAMES utf8mb4 */
;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;

/*!40103 SET TIME_ZONE='+00:00' */
;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Current Database: `hostingstation`
--
CREATE DATABASE
/*!32312 IF NOT EXISTS*/
`hostingstation`
/*!40100 DEFAULT CHARACTER SET utf8mb4 */
;

USE `hostingstation`;

--
-- Table structure for table `admin_permissions`
--
DROP TABLE IF EXISTS `admin_permissions`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `admin_permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `properties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`properties`)),
  `conditions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`conditions`)),
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_permissions_created_by_id_fk` (`created_by_id`),
  KEY `admin_permissions_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `admin_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL,
    CONSTRAINT `admin_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL
) ENGINE = InnoDB AUTO_INCREMENT = 102 DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `admin_permissions_role_links`
--
DROP TABLE IF EXISTS `admin_permissions_role_links`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `admin_permissions_role_links` (
  `permission_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  KEY `admin_permissions_role_links_fk` (`permission_id`),
  KEY `admin_permissions_role_links_inv_fk` (`role_id`),
  CONSTRAINT `admin_permissions_role_links_fk` FOREIGN KEY (`permission_id`) REFERENCES `admin_permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `admin_permissions_role_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `admin_roles` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `admin_roles`
--
DROP TABLE IF EXISTS `admin_roles`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `admin_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_roles_created_by_id_fk` (`created_by_id`),
  KEY `admin_roles_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `admin_roles_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL,
    CONSTRAINT `admin_roles_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `admin_roles`
--
LOCK TABLES `admin_roles` WRITE;

/*!40000 ALTER TABLE `admin_roles` DISABLE KEYS */
;

INSERT INTO
  `admin_roles`
VALUES
  (
    1,
    'Super Admin',
    'strapi-super-admin',
    'Super Admins can access and manage all features and settings.',
    '2022-06-03 09:25:15.904000',
    '2022-06-03 09:25:15.904000',
    NULL,
    NULL
  ),
  (
    2,
    'Editor',
    'strapi-editor',
    'Editors can manage and publish contents including those of other users.',
    '2022-06-03 09:25:15.908000',
    '2022-06-03 09:25:15.908000',
    NULL,
    NULL
  ),
  (
    3,
    'Author',
    'strapi-author',
    'Authors can manage the content they have created.',
    '2022-06-03 09:25:15.909000',
    '2022-06-03 09:25:15.909000',
    NULL,
    NULL
  );

/*!40000 ALTER TABLE `admin_roles` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `admin_users`
--
DROP TABLE IF EXISTS `admin_users`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `admin_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `registration_token` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT NULL,
  `prefered_language` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_users_created_by_id_fk` (`created_by_id`),
  KEY `admin_users_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `admin_users_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL,
    CONSTRAINT `admin_users_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `admin_users`
--
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */
;

--
-- Table structure for table `admin_users_roles_links`
--
DROP TABLE IF EXISTS `admin_users_roles_links`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `admin_users_roles_links` (
  `user_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  KEY `admin_users_roles_links_fk` (`user_id`),
  KEY `admin_users_roles_links_inv_fk` (`role_id`),
  CONSTRAINT `admin_users_roles_links_fk` FOREIGN KEY (`user_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `admin_users_roles_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `admin_roles` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `admin_users_roles_links`
--
LOCK TABLES `admin_users_roles_links` WRITE;

/*!40000 ALTER TABLE `admin_users_roles_links` DISABLE KEYS */
;

INSERT INTO
  `admin_users_roles_links`
VALUES
  (1, 1);

/*!40000 ALTER TABLE `admin_users_roles_links` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `app_users`
--
DROP TABLE IF EXISTS `app_users`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `app_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_users_created_by_id_fk` (`created_by_id`),
  KEY `app_users_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `app_users_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL,
    CONSTRAINT `app_users_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `files`
--
DROP TABLE IF EXISTS `files`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `files` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `alternative_text` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `formats` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`formats`)),
  `hash` varchar(255) DEFAULT NULL,
  `ext` varchar(255) DEFAULT NULL,
  `mime` varchar(255) DEFAULT NULL,
  `size` decimal(10, 2) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `preview_url` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `provider_metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`provider_metadata`)),
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `files_created_by_id_fk` (`created_by_id`),
  KEY `files_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `files_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL,
    CONSTRAINT `files_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `files`
--
LOCK TABLES `files` WRITE;

/*!40000 ALTER TABLE `files` DISABLE KEYS */
;

/*!40000 ALTER TABLE `files` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `files_related_morphs`
--
DROP TABLE IF EXISTS `files_related_morphs`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `files_related_morphs` (
  `file_id` int(10) unsigned DEFAULT NULL,
  `related_id` int(10) unsigned DEFAULT NULL,
  `related_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` int(10) unsigned DEFAULT NULL,
  KEY `files_related_morphs_fk` (`file_id`),
  CONSTRAINT `files_related_morphs_fk` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `files_related_morphs`
--
LOCK TABLES `files_related_morphs` WRITE;

/*!40000 ALTER TABLE `files_related_morphs` DISABLE KEYS */
;

/*!40000 ALTER TABLE `files_related_morphs` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `i18n_locale`
--
DROP TABLE IF EXISTS `i18n_locale`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `i18n_locale` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `i18n_locale_created_by_id_fk` (`created_by_id`),
  KEY `i18n_locale_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `i18n_locale_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL,
    CONSTRAINT `i18n_locale_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `i18n_locale`
--
LOCK TABLES `i18n_locale` WRITE;

/*!40000 ALTER TABLE `i18n_locale` DISABLE KEYS */
;

INSERT INTO
  `i18n_locale`
VALUES
  (
    1,
    'English (en)',
    'en',
    '2022-06-03 09:25:15.843000',
    '2022-06-03 09:25:15.843000',
    NULL,
    NULL
  );

/*!40000 ALTER TABLE `i18n_locale` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `infrastructures`
--
DROP TABLE IF EXISTS `infrastructures`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `infrastructures` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `giturl` varchar(255) DEFAULT NULL,
  `prettyname` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `infrastructures_created_by_id_fk` (`created_by_id`),
  KEY `infrastructures_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `infrastructures_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL,
    CONSTRAINT `infrastructures_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `infrastructures`
--
LOCK TABLES `infrastructures` WRITE;

/*!40000 ALTER TABLE `infrastructures` DISABLE KEYS */
;

INSERT INTO
  `infrastructures`
VALUES
  (
    1,
    'git@gitlab.com:niwee-productions/infrastructures/production/wordpress.git',
    'Wordpress',
    '2022-06-03 09:53:17.766000',
    '2022-06-03 09:53:21.942000',
    '2022-06-03 09:53:21.941000',
    1,
    1
  ),
  (
    2,
    'git@gitlab.com:niwee-productions/infrastructures/production/php-mariadb.git',
    'PHP - Mariadb',
    '2022-06-03 09:54:07.014000',
    '2022-06-03 09:54:07.706000',
    '2022-06-03 09:54:07.705000',
    1,
    1
  ),
  (
    3,
    'git@gitlab.com:niwee-productions/infrastructures/production/node.git',
    'Node',
    '2022-06-03 09:54:39.013000',
    '2022-06-03 09:54:39.473000',
    '2022-06-03 09:54:39.472000',
    1,
    1
  );

/*!40000 ALTER TABLE `infrastructures` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `organisations`
--
DROP TABLE IF EXISTS `organisations`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `organisations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `organisations_created_by_id_fk` (`created_by_id`),
  KEY `organisations_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `organisations_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL,
    CONSTRAINT `organisations_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `organisations`
--
LOCK TABLES `organisations` WRITE;

/*!40000 ALTER TABLE `organisations` DISABLE KEYS */
;

INSERT INTO
  `organisations`
VALUES
  (
    1,
    'NiWee Productions',
    '2022-06-03 09:50:47.251000',
    '2022-06-03 09:50:49.382000',
    '2022-06-03 09:50:49.381000',
    1,
    1
  );

/*!40000 ALTER TABLE `organisations` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `organisations_app_users_links`
--
DROP TABLE IF EXISTS `organisations_app_users_links`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `organisations_app_users_links` (
  `organisation_id` int(10) unsigned DEFAULT NULL,
  `app_user_id` int(10) unsigned DEFAULT NULL,
  KEY `organisations_app_users_links_fk` (`organisation_id`),
  KEY `organisations_app_users_links_inv_fk` (`app_user_id`),
  CONSTRAINT `organisations_app_users_links_fk` FOREIGN KEY (`organisation_id`) REFERENCES `organisations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `organisations_app_users_links_inv_fk` FOREIGN KEY (`app_user_id`) REFERENCES `app_users` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `organisations_app_users_links`
--
LOCK TABLES `organisations_app_users_links` WRITE;

/*!40000 ALTER TABLE `organisations_app_users_links` DISABLE KEYS */
;

INSERT INTO
  `organisations_app_users_links`
VALUES
  (1, 1);

/*!40000 ALTER TABLE `organisations_app_users_links` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `project_types`
--
DROP TABLE IF EXISTS `project_types`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `project_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_types_created_by_id_fk` (`created_by_id`),
  KEY `project_types_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `project_types_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL,
    CONSTRAINT `project_types_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `project_types`
--
LOCK TABLES `project_types` WRITE;

/*!40000 ALTER TABLE `project_types` DISABLE KEYS */
;

INSERT INTO
  `project_types`
VALUES
  (
    1,
    'Wordpress',
    '2022-06-03 09:43:31.063000',
    '2022-06-08 19:48:26.618000',
    '2022-06-03 09:43:32.588000',
    1,
    1
  ),
  (
    2,
    'PHP',
    '2022-06-03 09:43:38.227000',
    '2022-06-08 19:48:40.486000',
    '2022-06-03 09:43:39.783000',
    1,
    1
  ),
  (
    3,
    'NodeJS',
    '2022-06-03 09:43:45.514000',
    '2022-06-08 19:48:34.973000',
    '2022-06-03 09:43:45.964000',
    1,
    1
  ),
  (
    4,
    'Python',
    '2022-06-08 23:50:02.246000',
    '2022-06-08 23:50:03.623000',
    '2022-06-08 23:50:03.621000',
    1,
    1
  );

/*!40000 ALTER TABLE `project_types` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `project_types_infrastructures_links`
--
DROP TABLE IF EXISTS `project_types_infrastructures_links`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `project_types_infrastructures_links` (
  `project_type_id` int(10) unsigned DEFAULT NULL,
  `infrastructure_id` int(10) unsigned DEFAULT NULL,
  KEY `project_types_infrastructures_links_fk` (`project_type_id`),
  KEY `project_types_infrastructures_links_inv_fk` (`infrastructure_id`),
  CONSTRAINT `project_types_infrastructures_links_fk` FOREIGN KEY (`project_type_id`) REFERENCES `project_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `project_types_infrastructures_links_inv_fk` FOREIGN KEY (`infrastructure_id`) REFERENCES `infrastructures` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `project_types_infrastructures_links`
--
LOCK TABLES `project_types_infrastructures_links` WRITE;

/*!40000 ALTER TABLE `project_types_infrastructures_links` DISABLE KEYS */
;

INSERT INTO
  `project_types_infrastructures_links`
VALUES
  (1, 1),
  (3, 3),
  (2, 2);

/*!40000 ALTER TABLE `project_types_infrastructures_links` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `projects`
--
DROP TABLE IF EXISTS `projects`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `projects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` longtext DEFAULT NULL,
  `giturl` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `prettyname` varchar(255) DEFAULT NULL,
  `basename` varchar(255) DEFAULT NULL,
  `online` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projects_created_by_id_fk` (`created_by_id`),
  KEY `projects_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `projects_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL,
    CONSTRAINT `projects_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `projects`
--
LOCK TABLES `projects` WRITE;

/*!40000 ALTER TABLE `projects` DISABLE KEYS */
;

INSERT INTO
  `projects`
VALUES
  (
    8,
    'CRM',
    'git@github.com:niwee-productions/trident.git',
    '2022-06-17 14:01:20.918000',
    '2022-06-17 14:01:20.918000',
    '2022-06-17 14:01:20.914000',
    NULL,
    NULL,
    'Trident',
    'trident',
    0
  );

/*!40000 ALTER TABLE `projects` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `projects_infrastructure_links`
--
DROP TABLE IF EXISTS `projects_infrastructure_links`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `projects_infrastructure_links` (
  `project_id` int(10) unsigned DEFAULT NULL,
  `infrastructure_id` int(10) unsigned DEFAULT NULL,
  KEY `projects_infrastructure_links_fk` (`project_id`),
  KEY `projects_infrastructure_links_inv_fk` (`infrastructure_id`),
  CONSTRAINT `projects_infrastructure_links_fk` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `projects_infrastructure_links_inv_fk` FOREIGN KEY (`infrastructure_id`) REFERENCES `infrastructures` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `projects_infrastructure_links`
--
LOCK TABLES `projects_infrastructure_links` WRITE;

/*!40000 ALTER TABLE `projects_infrastructure_links` DISABLE KEYS */
;

/*!40000 ALTER TABLE `projects_infrastructure_links` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `projects_project_type_links`
--
DROP TABLE IF EXISTS `projects_project_type_links`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `projects_project_type_links` (
  `project_id` int(10) unsigned DEFAULT NULL,
  `project_type_id` int(10) unsigned DEFAULT NULL,
  KEY `projects_project_type_links_fk` (`project_id`),
  KEY `projects_project_type_links_inv_fk` (`project_type_id`),
  CONSTRAINT `projects_project_type_links_fk` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `projects_project_type_links_inv_fk` FOREIGN KEY (`project_type_id`) REFERENCES `project_types` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `projects_project_type_links`
--
LOCK TABLES `projects_project_type_links` WRITE;

/*!40000 ALTER TABLE `projects_project_type_links` DISABLE KEYS */
;

INSERT INTO
  `projects_project_type_links`
VALUES
  (8, 2);

/*!40000 ALTER TABLE `projects_project_type_links` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `strapi_api_tokens`
--
DROP TABLE IF EXISTS `strapi_api_tokens`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `strapi_api_tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `access_key` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `strapi_api_tokens_created_by_id_fk` (`created_by_id`),
  KEY `strapi_api_tokens_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `strapi_api_tokens_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL,
    CONSTRAINT `strapi_api_tokens_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `strapi_api_tokens`
--
LOCK TABLES `strapi_api_tokens` WRITE;

/*!40000 ALTER TABLE `strapi_api_tokens` DISABLE KEYS */
;

--
-- Table structure for table `strapi_core_store_settings`
--
DROP TABLE IF EXISTS `strapi_core_store_settings`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `strapi_core_store_settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `value` longtext DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `environment` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 22 DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `strapi_database_schema`
--
DROP TABLE IF EXISTS `strapi_database_schema`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `strapi_database_schema` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `schema` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`schema`)),
  `time` datetime DEFAULT NULL,
  `hash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `strapi_migrations`
--
DROP TABLE IF EXISTS `strapi_migrations`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `strapi_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `strapi_migrations`
--
LOCK TABLES `strapi_migrations` WRITE;

/*!40000 ALTER TABLE `strapi_migrations` DISABLE KEYS */
;

/*!40000 ALTER TABLE `strapi_migrations` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `strapi_webhooks`
--
DROP TABLE IF EXISTS `strapi_webhooks`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `strapi_webhooks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` longtext DEFAULT NULL,
  `headers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`headers`)),
  `events` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`events`)),
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `strapi_webhooks`
--
LOCK TABLES `strapi_webhooks` WRITE;

/*!40000 ALTER TABLE `strapi_webhooks` DISABLE KEYS */
;

/*!40000 ALTER TABLE `strapi_webhooks` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `up_permissions`
--
DROP TABLE IF EXISTS `up_permissions`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `up_permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `up_permissions_created_by_id_fk` (`created_by_id`),
  KEY `up_permissions_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `up_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL,
    CONSTRAINT `up_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `up_users`
--
DROP TABLE IF EXISTS `up_users`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `up_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `confirmation_token` varchar(255) DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `up_users_created_by_id_fk` (`created_by_id`),
  KEY `up_users_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `up_users_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL,
    CONSTRAINT `up_users_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE
  SET
    NULL
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `up_users_role_links`
--
DROP TABLE IF EXISTS `up_users_role_links`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE `up_users_role_links` (
  `user_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  KEY `up_users_role_links_fk` (`user_id`),
  KEY `up_users_role_links_inv_fk` (`role_id`),
  CONSTRAINT `up_users_role_links_fk` FOREIGN KEY (`user_id`) REFERENCES `up_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `up_users_role_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `up_roles` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `up_users_role_links`
--
LOCK TABLES `up_users_role_links` WRITE;

/*!40000 ALTER TABLE `up_users_role_links` DISABLE KEYS */
;

INSERT INTO
  `up_users_role_links`
VALUES
  (2, 1);

/*!40000 ALTER TABLE `up_users_role_links` ENABLE KEYS */
;

UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2022-06-17 17:55:26