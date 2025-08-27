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
    // console.log(rows[0]);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } 
});

// 사용자 목록 조회
app.get('/users', async (req, res) => {
  try {
      const [rows] = await pool.query('SELECT * FROM users order by name');
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

// 사용자 정보 조회
app.get('/users/:email', async (req, res) => {
  try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [req.params.email]);
      res.json(rows[0]);
  } catch (error) {
      console.error('사용자 조회 오류:', error);
      res.status(500).json({ 
          success: false,
          message: '사용자 정보를 불러오는 중 오류가 발생했습니다.',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
});

// 이메일 중복 확인
app.get('/users/dup/:email', async (req, res) => {
  try {
      const [rows] = await pool.query('SELECT count(email) as count FROM users WHERE email = ?', [req.params.email]);
      res.json(rows[0]);
  } catch (error) {
      console.error('사용자 조회 오류:', error);
      res.status(500).json({ 
          success: false,
          message: '사용자 정보를 불러오는 중 오류가 발생했습니다.',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
});

// 별명 중복 확인
app.get('/users/dupUsername/:username', async (req, res) => {
  // console.log("username ====> ", req.params.username);
  try {
      const [rows] = await pool.query('SELECT count(username) as count FROM users WHERE username = ?', [req.params.username]);
      // console.log(rows[0]);
      res.json(rows[0]);
  } catch (error) {
      console.error('사용자 조회 오류:', error);
      res.status(500).json({ 
          success: false,
          message: '사용자 정보를 불러오는 중 오류가 발생했습니다.',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
});

// 사용자 정보 수정
app.put('/users/:email', async (req, res) => {
  try {
    const companyJson = JSON.stringify(req.body.company); // 객체를 JSON 문자열로 변환
    const addressJson = JSON.stringify(req.body.address); // 주소도 마찬가지로 처리
    
    const [rows] = await pool.query(`
        UPDATE users 
        SET name = ?, 
            username = ?, 
            email = ?, 
            phone = ?, 
            website = ?, 
            company = ?,
            address = ?
        WHERE email = ?`,
        [
          req.body.name, 
          req.body.username, 
          req.body.email, 
          req.body.phone, 
          req.body.website, 
          companyJson, // JSON 문자열로 변환된 company
          addressJson, // JSON 문자열로 변환된 address
          req.params.email
        ]
    );
    
    res.json({ success: true, message: '사용자 정보가 성공적으로 수정되었습니다.' });
  } catch (error) {
      console.error('사용자 수정 오류:', error);
      res.status(500).json({ 
          success: false,
          message: '사용자 정보를 수정 중 오류가 발생했습니다.',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
});

// 사용자 정보 삭제
app.delete('/users/:email', async (req, res) => {
  try {
    const [rows] = await pool.query('DELETE FROM users WHERE email = ?', [req.params.email]);
    res.json({ success: true, message: '사용자 정보가 성공적으로 삭제되었습니다.' });
  } catch (error) {
      console.error('사용자 삭제 오류:', error);
      res.status(500).json({ 
          success: false,
          message: '사용자 정보를 삭제 중 오류가 발생했습니다.',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
});

// 사용자 신규 등록
app.post('/users/:email', async (req, res) => {
  try {
    const companyJson = JSON.stringify(req.body.company || {}); // company가 없을 경우 빈 객체로 초기화
    const addressJson = JSON.stringify(req.body.address || {}); // address가 없을 경우 빈 객체로 초기화

    const [rows] = await pool.query('SELECT MAX(id) + 1 as maxId FROM users');
    const maxID = rows[0].maxId;

    const [result] = await pool.query(
      `INSERT INTO users 
       (id, name, username, email, phone, website, company, address) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        maxID,
        req.body.name, 
        req.body.username, 
        req.body.email, 
        req.body.phone, 
        req.body.website, 
        companyJson,
        addressJson
      ]
    );
    
    res.json({ success: true, message: '사용자 정보가 성공적으로 등록되었습니다.' });
  } catch (error) {
      console.error('사용자 등록 오류:', error);
      res.status(500).json({ 
          success: false,
          message: '사용자 정보 등록 중 오류가 발생했습니다.',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
});
