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

app.get('/',  () => {
    console.log('Hello World!');
});

app.get('/hello',  (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/hello/:name',  (req, res) => {
  res.send(`<h1>Hello ${req.params.name}! </h1>`);
});

app.get('/login/:email/:password',  (req, res) => {
  res.send(`<h1>Login : ${req.params.email}! / ${req.params.password}</h1>`);
});

app.post('/login', async (req, res) => {
 // console.log(req.body);

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [req.body.userEmail]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log(rows[0]);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } 
});