/*
 Navicat Premium Data Transfer

 Source Server         : 47.114.88.211
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : 47.114.88.211:3306
 Source Schema         : data

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 30/03/2022 01:07:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock` (
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `num` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of stock
-- ----------------------------
BEGIN;
INSERT INTO `stock` VALUES ('小麦', 50000);
INSERT INTO `stock` VALUES ('玉米', 100000);
INSERT INTO `stock` VALUES ('大豆', 40000);
INSERT INTO `stock` VALUES ('水稻', 70000);
INSERT INTO `stock` VALUES ('菜籽', 20000);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
