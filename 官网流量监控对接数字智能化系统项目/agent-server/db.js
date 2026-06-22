// MySQL 连接池
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || '127.0.0.1',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'yongming',
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4'
});

// 执行查询
async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

// 获取数据库时间
async function dbTime() {
  const rows = await query('SELECT NOW() as now');
  return rows[0].now;
}

module.exports = { pool, query, dbTime };
