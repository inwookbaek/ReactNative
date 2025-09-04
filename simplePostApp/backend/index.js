const express = require('express');
const mysql = require('mysql2/promise');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// MySQL 연결 풀 생성
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '12345',
    database: process.env.DB_NAME || 'rn99_gemini',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000
});

// 연결 풀 이벤트 리스너
pool.on('connection', (connection) => {
    console.log('새로운 MySQL 연결이 생성되었습니다.');
});

pool.on('error', (err) => {
    console.error('MySQL 풀 오류:', err);
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});


// 게시글글 목록 조회
app.get('/posts', async (req, res) => {
  try {
      const [rows] = await pool.query('SELECT * FROM posts order by postid desc');
      res.json(rows);
  } catch (error) {
      console.error('사용자 조회 오류:', error);
      res.status(500).json({ 
          success: false,
          message: '사용자 목록을 불러오는 중 오류가 발생했습니다.',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
});
