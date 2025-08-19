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

// API 엔드포인트
// 사용자 목록 조회
app.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
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

// 게시글 수정
app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({
            success: false,
            message: '제목과 내용은 필수 항목입니다.'
        });
    }

    try {
        const [result] = await pool.query(
            'UPDATE posts SET title = ?, body = ? WHERE id = ?',
            [title, body, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: '해당하는 게시글을 찾을 수 없습니다.'
            });
        }

        // 업데이트된 게시글 조회
        const [updatedPost] = await pool.query(
            'SELECT * FROM posts WHERE id = ?',
            [id]
        );

        res.json({
            success: true,
            data: updatedPost[0],
            message: '게시글이 성공적으로 수정되었습니다.'
        });

    } catch (error) {
        console.error('게시글 수정 오류:', error);
        res.status(500).json({
            success: false,
            message: '게시글 수정 중 오류가 발생했습니다.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});


// 게시글 목록 조회
app.get('/posts', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM posts');
        res.json(rows);
    } catch (error) {
        console.error('게시글 조회 오류:', error);
        res.status(500).json({
            success: false,
            message: '게시글 목록을 불러오는 중 오류가 발생했습니다.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// 특정 게시글 조회
app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const [rows] = await pool.query('SELECT * FROM posts WHERE id = ? order by id desc', [id]);  

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: '해당하는 게시글을 찾을 수 없습니다.'
            });
        }

        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error('게시글 상세 조회 오류:', error);
        res.status(500).json({
            success: false,
            message: '게시글을 불러오는 중 오류가 발생했습니다.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// 게시글 삭제 API
app.delete('/posts/:id', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const { id } = req.params;
        
        // 게시글 존재 여부 확인
        const [existingPost] = await connection.query(
            'SELECT * FROM posts WHERE id = ?',
            [id]
        );

        if (existingPost.length === 0) {
            return res.status(404).json({
                success: false,
                message: '게시글을 찾을 수 없습니다.'
            });
        }

        // 게시글 삭제
        await connection.query(
            'DELETE FROM posts WHERE id = ?',
            [id]
        );

        await connection.commit();
        
        res.status(200).json({
            success: true,
            message: '게시글이 성공적으로 삭제되었습니다.'
        });
    } catch (error) {
        await connection.rollback();
        console.error('게시글 삭제 중 오류 발생:', error);
        res.status(500).json({
            success: false,
            message: '게시글 삭제 중 오류가 발생했습니다.'
        });
    } finally {
        connection.release();
    }
});

// 사용자 데이터 가져오기 및 저장
app.post('/import-users', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;

        await connection.query('SET FOREIGN_KEY_CHECKS = 0');
        await connection.query('TRUNCATE TABLE users');
        await connection.query('SET FOREIGN_KEY_CHECKS = 1');

        const sql = 'INSERT INTO users (id, name, username, email, address, phone, website, company) VALUES ?';
        const values = users.map(user => [
            user.id,
            user.name,
            user.username,
            user.email,
            JSON.stringify(user.address),
            user.phone,
            user.website,
            JSON.stringify(user.company)
        ]);

        await connection.query(sql, [values]);
        await connection.commit();
        
        console.log(`${users.length}명의 사용자 데이터를 성공적으로 가져왔습니다.`);
        res.json({
            success: true,
            message: `${users.length}명의 사용자 데이터를 성공적으로 가져왔습니다.`
        });
    } catch (error) {
        await connection.rollback();
        console.error('사용자 데이터 가져오기 오류:', error);
        res.status(500).json({
            success: false,
            message: '사용자 데이터를 가져오는 중 오류가 발생했습니다.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    } finally {
        connection.release();
    }
});

// 게시글 데이터 가져오기 및 저장
app.post('/import-posts', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = response.data;

        await connection.query('SET FOREIGN_KEY_CHECKS = 0');
        await connection.query('TRUNCATE TABLE posts');
        await connection.query('SET FOREIGN_KEY_CHECKS = 1');

        const sql = 'INSERT INTO posts (id, userId, title, body) VALUES ?';
        const values = posts.map(post => [post.id, post.userId, post.title, post.body]);

        await connection.query(sql, [values]);
        await connection.commit();
        
        console.log(`${posts.length}개의 게시글을 성공적으로 가져왔습니다.`);
        res.json({
            success: true,
            message: `${posts.length}개의 게시글을 성공적으로 가져왔습니다.`
        });
    } catch (error) {
        await connection.rollback();
        console.error('게시글 데이터 가져오기 오류:', error);
        res.status(500).json({
            success: false,
            message: '게시글 데이터를 가져오는 중 오류가 발생했습니다.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    } finally {
        connection.release();
    }
});

// 모든 데이터 삭제
app.delete('/delete-all-records', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        
        await connection.query('SET FOREIGN_KEY_CHECKS = 0');
        await connection.query('TRUNCATE TABLE posts');
        await connection.query('TRUNCATE TABLE users');
        await connection.query('SET FOREIGN_KEY_CHECKS = 1');
        await connection.commit();
        
        console.log('모든 데이터가 성공적으로 삭제되었습니다.');
        res.json({
            success: true,
            message: '모든 데이터가 성공적으로 삭제되었습니다.'
        });
    } catch (error) {
        await connection.rollback();
        console.error('데이터 삭제 오류:', error);
        res.status(500).json({
            success: false,
            message: '데이터 삭제 중 오류가 발생했습니다.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    } finally {
        connection.release();
    }
});

// 404 핸들러
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: '요청하신 API를 찾을 수 없습니다.'
    });
});

// 에러 핸들러
app.use((err, req, res, next) => {
    console.error('서버 오류:', err);
    res.status(500).json({
        success: false,
        message: '서버에서 오류가 발생했습니다.',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

// 프로세스 종료 시 연결 풀 종료
process.on('SIGINT', async () => {
    console.log('애플리케이션을 종료합니다...');
    await pool.end();
    process.exit(0);
});