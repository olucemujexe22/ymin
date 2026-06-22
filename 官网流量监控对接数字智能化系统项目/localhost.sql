-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2025-11-21 10:33:26
-- 服务器版本： 5.7.40-log
-- PHP 版本： 7.2.33

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `yongming`
--
DROP DATABASE IF EXISTS `yongming`;
CREATE DATABASE IF NOT EXISTS `yongming` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `yongming`;

-- --------------------------------------------------------

--
-- 表的结构 `tp_adapay_bank`
--

CREATE TABLE IF NOT EXISTS `tp_adapay_bank` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `bank_code` varchar(20) NOT NULL DEFAULT '',
  `bank_name` varchar(60) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_adapay_bank_region`
--

CREATE TABLE IF NOT EXISTS `tp_adapay_bank_region` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL DEFAULT '',
  `name` varchar(60) NOT NULL DEFAULT '',
  `pcode` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_album`
--

CREATE TABLE IF NOT EXISTS `tp_album` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `album_name` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_album_pic`
--

CREATE TABLE IF NOT EXISTS `tp_album_pic` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `album_id` int(5) NOT NULL,
  `src` varchar(120) NOT NULL DEFAULT '',
  `_src` varchar(120) NOT NULL DEFAULT '',
  `width` varchar(10) NOT NULL DEFAULT '',
  `height` varchar(10) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `mime` varchar(20) NOT NULL DEFAULT '',
  `border` varchar(10) NOT NULL DEFAULT '',
  `floatStyle` varchar(10) NOT NULL DEFAULT '',
  `vspace` varchar(10) NOT NULL DEFAULT '',
  `alt` varchar(120) NOT NULL DEFAULT '',
  `style` varchar(255) NOT NULL DEFAULT '',
  `create_time` int(11) DEFAULT NULL,
  `size` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_article`
--

CREATE TABLE IF NOT EXISTS `tp_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(3) DEFAULT NULL COMMENT '公司id',
  `column_id` int(3) NOT NULL DEFAULT '0' COMMENT '栏目id',
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT '标题',
  `short_title` varchar(120) NOT NULL DEFAULT '' COMMENT '短标题',
  `keyword` varchar(255) NOT NULL DEFAULT '' COMMENT '关键字',
  `description` text NOT NULL COMMENT '描述',
  `seo_title` varchar(255) NOT NULL DEFAULT '',
  `seo_keyword` varchar(255) NOT NULL DEFAULT '',
  `seo_description` varchar(255) NOT NULL DEFAULT '',
  `thumbnail` varchar(255) NOT NULL DEFAULT '' COMMENT '缩略图',
  `file` varchar(255) NOT NULL DEFAULT '' COMMENT '添加附件',
  `date` int(11) NOT NULL COMMENT '显示的创建时间',
  `views` int(30) NOT NULL COMMENT '看了多少次',
  `sort` int(3) NOT NULL DEFAULT '99' COMMENT '排序',
  `content` text COMMENT '内容',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `delete_time` int(11) DEFAULT NULL COMMENT '删除时间',
  `lb` varchar(30) NOT NULL DEFAULT '' COMMENT '类别',
  `zhiding` int(1) NOT NULL DEFAULT '0' COMMENT '是否置顶',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- 表的结构 `tp_article_copy1`
--

CREATE TABLE IF NOT EXISTS `tp_article_copy1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(3) DEFAULT NULL COMMENT '公司id',
  `column_id` int(3) NOT NULL DEFAULT '0' COMMENT '栏目id',
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT '标题',
  `short_title` varchar(120) NOT NULL DEFAULT '' COMMENT '短标题',
  `keyword` varchar(255) NOT NULL DEFAULT '' COMMENT '关键字',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `seo_title` varchar(255) NOT NULL DEFAULT '',
  `seo_keyword` varchar(255) NOT NULL DEFAULT '',
  `seo_description` varchar(255) NOT NULL DEFAULT '',
  `thumbnail` varchar(255) NOT NULL DEFAULT '' COMMENT '缩略图',
  `file` varchar(255) NOT NULL DEFAULT '' COMMENT '添加附件',
  `date` int(11) NOT NULL COMMENT '显示的创建时间',
  `views` int(30) NOT NULL COMMENT '看了多少次',
  `sort` int(3) NOT NULL DEFAULT '99' COMMENT '排序',
  `content` text COMMENT '内容',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `delete_time` int(11) DEFAULT NULL COMMENT '删除时间',
  `lb` varchar(30) NOT NULL DEFAULT '' COMMENT '类别',
  `zhiding` int(1) NOT NULL DEFAULT '0' COMMENT '是否置顶',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- 表的结构 `tp_banner`
--

CREATE TABLE IF NOT EXISTS `tp_banner` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `site_id` int(3) DEFAULT NULL,
  `img` varchar(100) NOT NULL DEFAULT '',
  `url` varchar(250) NOT NULL DEFAULT '',
  `title` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `delete_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_collect`
--

CREATE TABLE IF NOT EXISTS `tp_collect` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL DEFAULT '0',
  `jobid` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_column`
--

CREATE TABLE IF NOT EXISTS `tp_column` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `site_id` int(3) DEFAULT '1' COMMENT '公司id',
  `pid` int(3) DEFAULT '0' COMMENT '父id',
  `title` varchar(250) NOT NULL DEFAULT '' COMMENT '标题',
  `english` varchar(80) NOT NULL DEFAULT '' COMMENT '英文标题',
  `sort` int(3) NOT NULL DEFAULT '99' COMMENT '排序',
  `keyword` varchar(255) NOT NULL DEFAULT '' COMMENT '关键字',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `seo_title` varchar(255) NOT NULL DEFAULT '',
  `seo_keyword` varchar(255) NOT NULL DEFAULT '',
  `seo_description` text,
  `content` text COMMENT '内容',
  `url` varchar(80) NOT NULL DEFAULT '' COMMENT '地址',
  `img` varchar(80) NOT NULL DEFAULT '' COMMENT '图片',
  `bckimg` varchar(80) NOT NULL DEFAULT '' COMMENT '背景图',
  `indexImg` varchar(80) NOT NULL DEFAULT '' COMMENT '图片2',
  `drop` int(1) NOT NULL DEFAULT '1' COMMENT '是否下拉',
  `show` int(1) NOT NULL DEFAULT '1' COMMENT '是否显示',
  `additional1` varchar(120) NOT NULL DEFAULT '' COMMENT '附加字段1',
  `additional2` varchar(120) NOT NULL DEFAULT '' COMMENT '附加字段2',
  `zuobiaotu` varchar(120) NOT NULL DEFAULT '',
  `zuobiaodian` varchar(30) NOT NULL DEFAULT '',
  `create_time` int(11) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(11) DEFAULT NULL COMMENT '修改时间',
  `delete_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- 表的结构 `tp_company`
--

CREATE TABLE IF NOT EXISTS `tp_company` (
  `id` int(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_downloadinfo`
--

CREATE TABLE IF NOT EXISTS `tp_downloadinfo` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `company_name` varchar(255) NOT NULL DEFAULT '',
  `province` varchar(50) NOT NULL DEFAULT '',
  `department` varchar(255) NOT NULL DEFAULT '',
  `tel` varchar(200) NOT NULL COMMENT '电话',
  `email` varchar(120) NOT NULL DEFAULT '',
  `hangye` varchar(255) NOT NULL DEFAULT '' COMMENT '所属行业',
  `chanpin` varchar(255) NOT NULL DEFAULT '' COMMENT '产品类型',
  `fengzhuang` varchar(255) NOT NULL DEFAULT '' COMMENT '封装类别',
  `dianya` varchar(255) NOT NULL DEFAULT '' COMMENT '电压',
  `rongliang` varchar(255) NOT NULL DEFAULT '' COMMENT '容量',
  `chicun` varchar(255) NOT NULL DEFAULT '' COMMENT '尺寸',
  `zhengji` varchar(255) NOT NULL DEFAULT '' COMMENT '应用的整机名称',
  `ip` varchar(20) NOT NULL DEFAULT '',
  `create_time` int(12) DEFAULT NULL,
  `update_time` int(12) DEFAULT NULL,
  `delete_time` int(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_download_ips`
--

CREATE TABLE IF NOT EXISTS `tp_download_ips` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `resource_id` int(11) NOT NULL COMMENT '资源ID',
  `ip_address` varchar(45) NOT NULL COMMENT '下载IP地址',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '下载时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_resource_id` (`resource_id`) USING BTREE,
  KEY `idx_ip_address` (`ip_address`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='资源下载IP记录表' ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- 表的结构 `tp_file`
--

CREATE TABLE IF NOT EXISTS `tp_file` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `group_id` int(4) DEFAULT NULL,
  `src` varchar(120) NOT NULL DEFAULT '',
  `_src` varchar(120) NOT NULL DEFAULT '',
  `size` varchar(10) NOT NULL DEFAULT '',
  `name` varchar(120) NOT NULL DEFAULT '',
  `mime` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_file_group`
--

CREATE TABLE IF NOT EXISTS `tp_file_group` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_good`
--

CREATE TABLE IF NOT EXISTS `tp_good` (
  `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `column_id` int(5) DEFAULT NULL,
  `site_id` int(3) DEFAULT NULL,
  `xl` varchar(120) NOT NULL DEFAULT '' COMMENT '系列',
  `td` text NOT NULL COMMENT '特点',
  `file` text COMMENT '规格书',
  `dymin` varchar(20) NOT NULL DEFAULT '0.0000' COMMENT 'min电压',
  `dymax` decimal(10,4) NOT NULL DEFAULT '0.0000' COMMENT 'max电压',
  `drmin` varchar(20) NOT NULL DEFAULT '0.0000' COMMENT 'min电容',
  `drmax` decimal(10,4) NOT NULL DEFAULT '0.0000' COMMENT 'max电容',
  `wdmin` decimal(10,4) NOT NULL DEFAULT '0.0000' COMMENT 'min温度',
  `wdmax` decimal(10,4) NOT NULL DEFAULT '0.0000' COMMENT 'max温度',
  `smmin` decimal(10,4) NOT NULL DEFAULT '0.0000' COMMENT '寿命最小值',
  `smmax` decimal(10,4) NOT NULL DEFAULT '0.0000' COMMENT '寿命最大值',
  `esrmin` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `esrmax` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `sort` int(20) NOT NULL DEFAULT '99' COMMENT '排序',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `delete_time` int(11) DEFAULT NULL,
  `img` text,
  `liaohao` varchar(255) DEFAULT NULL,
  `edingdianya` varchar(255) DEFAULT NULL,
  `piancha` varchar(255) DEFAULT NULL,
  `slong` varchar(255) DEFAULT NULL,
  `swidth` varchar(255) DEFAULT NULL,
  `sheight` varchar(255) DEFAULT NULL,
  `shouming` varchar(255) DEFAULT NULL,
  `shouming2` varchar(255) DEFAULT NULL,
  `bowen` varchar(255) DEFAULT NULL,
  `zhuangtai` varchar(255) DEFAULT NULL,
  `aec` varchar(255) DEFAULT NULL,
  `pinxing` varchar(255) DEFAULT NULL,
  `biaoshi` text,
  `chicun` text,
  `wenduxishu` text,
  `xiuzhengyinzi` text,
  `content` text,
  `szhijing` varchar(255) DEFAULT NULL,
  `huiliuhan` varchar(512) DEFAULT NULL,
  `loudianliu` varchar(512) DEFAULT NULL,
  `xingzhuang` varchar(255) DEFAULT NULL,
  `rongliang` varchar(255) DEFAULT NULL,
  `canshu` text,
  `tedian` varchar(512) DEFAULT NULL,
  `link4` varchar(255) DEFAULT NULL,
  `lbdy` varchar(11) DEFAULT NULL,
  `bcrl` varchar(11) DEFAULT NULL,
  `lbwd` varchar(11) DEFAULT NULL,
  `langyong` varchar(512) DEFAULT NULL,
  `huaqiu` varchar(255) DEFAULT NULL,
  `lichuang` varchar(255) DEFAULT NULL,
  `yunhan` varchar(255) DEFAULT NULL,
  `lingyu` varchar(255) DEFAULT NULL COMMENT '领域',
  `xl_name` varchar(255) DEFAULT NULL COMMENT '规格',
  `tz_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_job`
--

CREATE TABLE IF NOT EXISTS `tp_job` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `type1` int(11) NOT NULL DEFAULT '0',
  `type2` int(11) NOT NULL DEFAULT '0',
  `type3` int(11) NOT NULL DEFAULT '0',
  `type4` int(11) NOT NULL DEFAULT '0',
  `sort` int(11) NOT NULL DEFAULT '0',
  `keyword` varchar(50) NOT NULL DEFAULT '',
  `description` varchar(100) NOT NULL DEFAULT '',
  `date` varchar(22) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_jobreq`
--

CREATE TABLE IF NOT EXISTS `tp_jobreq` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL DEFAULT '0',
  `jobid` int(11) NOT NULL DEFAULT '0',
  `name` varchar(30) NOT NULL DEFAULT '',
  `school` varchar(50) NOT NULL DEFAULT '',
  `sex` enum('男','女') DEFAULT NULL,
  `hkxz` enum('农业户口','非农户口') DEFAULT NULL,
  `edu` varchar(30) NOT NULL DEFAULT '',
  `huji` varchar(50) NOT NULL DEFAULT '',
  `identify` varchar(200) NOT NULL DEFAULT '',
  `phone` varchar(20) NOT NULL DEFAULT '',
  `fqzy` varchar(100) NOT NULL,
  `mqzy` varchar(100) NOT NULL,
  `reqtime` varchar(22) NOT NULL DEFAULT '',
  `resume` varchar(100) NOT NULL DEFAULT '',
  `xqah` varchar(200) NOT NULL,
  `techang` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL DEFAULT '',
  `age` int(11) NOT NULL DEFAULT '0',
  `zlxy` enum('是','否') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_jobtype`
--

CREATE TABLE IF NOT EXISTS `tp_jobtype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL DEFAULT '0',
  `icon` varchar(20) NOT NULL DEFAULT '',
  `title` varchar(30) NOT NULL DEFAULT '',
  `sort` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_language`
--

CREATE TABLE IF NOT EXISTS `tp_language` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `title` varchar(10) NOT NULL DEFAULT '',
  `en_title` varchar(30) NOT NULL DEFAULT '',
  `zh_short_title` varchar(10) NOT NULL,
  `en_short_title` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_member`
--

CREATE TABLE IF NOT EXISTS `tp_member` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL DEFAULT '',
  `openid` varchar(32) NOT NULL DEFAULT '',
  `email` varchar(30) NOT NULL DEFAULT '',
  `phone` varchar(15) NOT NULL DEFAULT '',
  `createtime` int(11) NOT NULL DEFAULT '0',
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `pwd` varchar(32) NOT NULL DEFAULT '',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_region`
--

CREATE TABLE IF NOT EXISTS `tp_region` (
  `code` varchar(10) NOT NULL DEFAULT '',
  `name` varchar(120) NOT NULL DEFAULT '',
  `pcode` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`code`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_resources`
--

CREATE TABLE IF NOT EXISTS `tp_resources` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '资源ID',
  `category_id` int(11) NOT NULL COMMENT '类别ID',
  `name` varchar(255) NOT NULL COMMENT '资源名称',
  `description` text COMMENT '资源描述',
  `url` varchar(512) NOT NULL COMMENT '资源URL',
  `image` varchar(255) DEFAULT NULL COMMENT '资源图片路径',
  `download_count` int(11) NOT NULL DEFAULT '0' COMMENT '下载次数',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_category_id` (`category_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='资源表' ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- 表的结构 `tp_role`
--

CREATE TABLE IF NOT EXISTS `tp_role` (
  `id` int(4) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `role_detail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_site`
--

CREATE TABLE IF NOT EXISTS `tp_site` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `site_name` varchar(255) NOT NULL DEFAULT '' COMMENT '站点名称',
  `site_url` varchar(50) NOT NULL COMMENT '网址',
  `company_id` int(3) DEFAULT NULL COMMENT '网站名称',
  `language_id` int(3) DEFAULT NULL COMMENT '语言-1：中文。2：英文（如果语言多的话改成语言id）',
  `keyword` varchar(255) NOT NULL DEFAULT '' COMMENT '关键字',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `wx_qrcode` varchar(255) NOT NULL DEFAULT '' COMMENT '公众号二维码地址',
  `qq` int(15) DEFAULT NULL COMMENT 'QQ号',
  `address` varchar(255) NOT NULL DEFAULT '' COMMENT '地址',
  `phone` varchar(40) NOT NULL DEFAULT '' COMMENT '电话',
  `email` varchar(40) NOT NULL DEFAULT '' COMMENT 'email',
  `fax` varchar(40) NOT NULL DEFAULT '' COMMENT '传真',
  `hlogo` varchar(255) NOT NULL DEFAULT '' COMMENT '头部logo',
  `flogo` varchar(255) NOT NULL DEFAULT '' COMMENT '尾部logo',
  `public_img` varchar(255) NOT NULL DEFAULT '' COMMENT '公共图片',
  `content` text COMMENT 'html格式内容',
  `record` varchar(255) NOT NULL DEFAULT '' COMMENT '备案信息',
  `browsing` int(20) NOT NULL DEFAULT '0' COMMENT '浏览记录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_system_menu`
--

CREATE TABLE IF NOT EXISTS `tp_system_menu` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` int(11) UNSIGNED NOT NULL DEFAULT '0' COMMENT '父ID',
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '名称',
  `icon` varchar(100) NOT NULL DEFAULT '' COMMENT '菜单图标',
  `href` varchar(100) NOT NULL DEFAULT '' COMMENT '链接',
  `target` varchar(20) NOT NULL DEFAULT '_self' COMMENT '链接打开方式',
  `sort` int(11) DEFAULT '0' COMMENT '菜单排序',
  `status` tinyint(1) UNSIGNED NOT NULL DEFAULT '1' COMMENT '状态(0:禁用,1:启用)',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注信息',
  `create_time` int(12) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(12) DEFAULT NULL COMMENT '更新时间',
  `delete_time` int(12) DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  KEY `title` (`title`),
  KEY `href` (`href`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统菜单表' ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- 表的结构 `tp_user`
--

CREATE TABLE IF NOT EXISTS `tp_user` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `nickname` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `role_group` int(3) DEFAULT NULL,
  `role_detail` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_wxpublic`
--

CREATE TABLE IF NOT EXISTS `tp_wxpublic` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `gzhmc` varchar(120) NOT NULL DEFAULT '',
  `welcome` varchar(255) NOT NULL DEFAULT '',
  `guanzhu2` varchar(255) NOT NULL DEFAULT '',
  `token` varchar(120) NOT NULL DEFAULT '',
  `appid` varchar(120) NOT NULL DEFAULT '',
  `appsecret` varchar(120) NOT NULL DEFAULT '',
  `access_token` varchar(255) NOT NULL DEFAULT '',
  `expires_time` int(10) NOT NULL DEFAULT '0',
  `default` varchar(255) NOT NULL DEFAULT '',
  `gzhid` varchar(70) NOT NULL DEFAULT '',
  `menu` text,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- 表的结构 `tp_xilie`
--

CREATE TABLE IF NOT EXISTS `tp_xilie` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `title` varchar(120) DEFAULT NULL,
  `description` varchar(120) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `column_id` int(4) DEFAULT NULL,
  `site_id` int(3) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `delete_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_xilie_detail`
--

CREATE TABLE IF NOT EXISTS `tp_xilie_detail` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT '',
  `lr` varchar(50) DEFAULT '',
  `to` varchar(50) DEFAULT '',
  `tx` varchar(50) DEFAULT '',
  `lx` varchar(50) DEFAULT '',
  `i` varchar(50) DEFAULT '',
  `ff` varchar(50) DEFAULT '',
  `vx` varchar(50) DEFAULT '',
  `vw` varchar(50) DEFAULT '',
  `xilie_id` int(3) DEFAULT NULL,
  `site_id` int(3) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `delete_time` int(11) DEFAULT NULL,
  `img` varchar(512) DEFAULT NULL,
  `sizeimg` varchar(512) DEFAULT NULL,
  `cpml` varchar(512) DEFAULT NULL,
  `gnjs` varchar(512) DEFAULT NULL,
  `aec200` varchar(512) DEFAULT NULL,
  `rohsbg` varchar(512) DEFAULT NULL,
  `syzyd` varchar(512) DEFAULT NULL,
  `zxbzdw` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_yangpinsuoqu`
--

CREATE TABLE IF NOT EXISTS `tp_yangpinsuoqu` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(150) NOT NULL DEFAULT '',
  `phone` varchar(12) NOT NULL DEFAULT '0',
  `email` varchar(60) NOT NULL DEFAULT '',
  `drzdyy` varchar(255) NOT NULL DEFAULT '',
  `voltage` varchar(255) NOT NULL DEFAULT '',
  `capacity` varchar(255) NOT NULL DEFAULT '',
  `size` varchar(255) NOT NULL DEFAULT '',
  `category` varchar(255) NOT NULL DEFAULT '',
  `temperature` varchar(255) NOT NULL DEFAULT '',
  `life` varchar(255) NOT NULL DEFAULT '',
  `other` varchar(255) NOT NULL DEFAULT '',
  `ip` varchar(18) NOT NULL DEFAULT '',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `delete_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tp_youshang`
--

CREATE TABLE IF NOT EXISTS `tp_youshang` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `tp_youshang_sn`
--

CREATE TABLE IF NOT EXISTS `tp_youshang_sn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `good_id` int(11) NOT NULL,
  `youshang_id` int(11) NOT NULL,
  `sn` varchar(255) NOT NULL,
  `youshi` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
