-- ============================================
-- 官网流量分析智能体 — 数据库建表 SQL
-- 在 yongming 库中执行（PHPMyAdmin → SQL 窗口）
-- ============================================

-- 表1：每日流量明细（百度统计拉取数据）
CREATE TABLE IF NOT EXISTS `traffic_daily` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `date` date NOT NULL COMMENT '日期',
  `page_url` varchar(500) NOT NULL COMMENT '页面URL',
  `page_type` varchar(50) DEFAULT NULL COMMENT '产品页/文章/FAQ/设计工具',
  `pv` int DEFAULT 0 COMMENT '页面浏览量',
  `uv` int DEFAULT 0 COMMENT '独立访客',
  `avg_stay` int DEFAULT 0 COMMENT '平均停留秒数',
  `bounce_rate` decimal(5,2) DEFAULT 0 COMMENT '跳出率%',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_date_url` (`date`, `page_url`(200)),
  KEY `idx_date` (`date`),
  KEY `idx_page_type` (`page_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='每日流量明细';

-- 表2：搜索词数据
CREATE TABLE IF NOT EXISTS `traffic_search_terms` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `date` date NOT NULL COMMENT '日期',
  `keyword` varchar(300) NOT NULL COMMENT '搜索词',
  `pv` int DEFAULT 0 COMMENT '搜索次数',
  `landing_url` varchar(500) DEFAULT NULL COMMENT '着陆页',
  `source` varchar(50) DEFAULT 'baidu' COMMENT '来源',
  `app_domain` varchar(100) DEFAULT NULL COMMENT '自动匹配的应用领域',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  KEY `idx_date` (`date`),
  KEY `idx_keyword` (`keyword`(100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='搜索词数据';

-- 表3：预警记录
CREATE TABLE IF NOT EXISTS `traffic_alerts` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `alert_time` datetime NOT NULL COMMENT '预警时间',
  `alert_type` enum('surge','decay','zero_traffic') NOT NULL COMMENT '飙升/衰减/僵尸',
  `target_name` varchar(300) NOT NULL COMMENT '产品名或文章名',
  `target_url` varchar(500) DEFAULT NULL COMMENT '目标URL',
  `change_rate` varchar(50) DEFAULT NULL COMMENT '变化率',
  `reason_hint` text COMMENT '推测原因（DeepSeek生成）',
  `status` enum('new','read','resolved') DEFAULT 'new',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  KEY `idx_alert_time` (`alert_time`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='预警记录';

-- 表4：应用领域关键词映射
CREATE TABLE IF NOT EXISTS `traffic_app_keywords` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `keyword` varchar(100) NOT NULL COMMENT '匹配关键词',
  `app_domain` varchar(100) NOT NULL COMMENT '应用领域',
  UNIQUE KEY `uk_keyword` (`keyword`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='应用领域关键词映射';

-- ===== 预填应用领域关键词 =====
INSERT IGNORE INTO `traffic_app_keywords` (`keyword`, `app_domain`) VALUES
-- 汽车电子
('车载OBC', '汽车电子'), ('AEC-Q200', '汽车电子'), ('车规', '汽车电子'),
('车载', '汽车电子'), ('ECU', '汽车电子'), ('BMS', '汽车电子'),
('车载充电机', '汽车电子'), ('EPS', '汽车电子'), ('安全气囊', '汽车电子'),
('智能驾驶', '汽车电子'), ('汽车电子', '汽车电子'), ('48V轻混', '汽车电子'),
('车载DC-DC', '汽车电子'), ('OBC', '汽车电子'), ('车灯', '汽车电子'),
-- 储能
('光伏', '储能'), ('逆变器', '储能'), ('储能变流器', '储能'),
('DC-Link', '储能'), ('储能', '储能'), ('光伏逆变器', '储能'),
('PCS', '储能'), ('户用储能', '储能'), ('工商业储能', '储能'),
('光伏储能', '储能'), ('微逆', '储能'), ('风电', '储能'),
-- AI服务器
('GPU', 'AI服务器'), ('服务器电源', 'AI服务器'), ('AI服务器', 'AI服务器'),
('数据中心', 'AI服务器'), ('加速卡', 'AI服务器'), ('服务器', 'AI服务器'),
('算力', 'AI服务器'), ('HPC', 'AI服务器'),
-- 无人机
('电调', '无人机'), ('无人机', '无人机'), ('飞控', '无人机'),
('多旋翼', '无人机'), ('航拍', '无人机'),
-- 机器人
('关节驱动', '机器人'), ('伺服驱动', '机器人'), ('机器人', '机器人'),
('机械臂', '机器人'), ('AGV', '机器人'), ('伺服电机', '机器人'),
-- 新型伺服驱动
('伺服', '新型伺服驱动'), ('变频器', '新型伺服驱动'), ('驱动器', '新型伺服驱动'),
('电机控制', '新型伺服驱动'), ('电机驱动', '新型伺服驱动'), ('工业电源', '新型伺服驱动'),
-- 军工
('军工', '军工'), ('航天', '军工'), ('雷达', '军工'),
('弹载', '军工'), ('机载', '军工'),
-- 智能照明
('智能照明', '智能照明'), ('LED驱动', '智能照明'), ('照明', '智能照明'),
-- PD快充
('PD快充', 'PD快充'), ('快充', 'PD快充'), ('充电器', 'PD快充'),
('GaN', 'PD快充'), ('氮化镓', 'PD快充'), ('适配器', 'PD快充'),
-- 通讯基站
('基站', '通讯基站'), ('5G', '通讯基站'), ('通讯', '通讯基站'),
('射频', '通讯基站');

-- ===== 创建视图：产品-产品线-应用领域关联视图 =====
CREATE OR REPLACE VIEW `v_product_line` AS
SELECT 
  g.id,
  g.liaohao AS part_number,
  g.pinxing AS model,
  g.xl AS series,
  c.title AS product_line,
  g.column_id,
  g.lingyu,
  g.rongliang AS capacity,
  g.edingdianya AS voltage,
  g.aec,
  g.xl_name,
  g.delete_time
FROM tp_good g
LEFT JOIN tp_column c ON g.column_id = c.id
WHERE g.delete_time IS NULL;
