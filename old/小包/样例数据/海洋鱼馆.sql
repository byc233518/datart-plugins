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

 Date: 29/03/2022 23:54:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for student_result
-- ----------------------------
DROP TABLE IF EXISTS `student_result`;
CREATE TABLE `student_result` (
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `class` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `result` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of student_result
-- ----------------------------
BEGIN;
INSERT INTO `student_result` VALUES ('张三', '2018.01', 90);
INSERT INTO `student_result` VALUES ('李四', '2018.02', 96);
INSERT INTO `student_result` VALUES ('王五', '2019.02', 85);
INSERT INTO `student_result` VALUES ('赵六', '2019.01', 70);
INSERT INTO `student_result` VALUES ('赵钱孙', '2020.01', 86);
INSERT INTO `student_result` VALUES ('五六七', '2022.02', 75);
INSERT INTO `student_result` VALUES ('七八九', '2022.03', 78);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
