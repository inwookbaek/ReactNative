# 1. 데이터베이스 설계 (MySQL)
```sql
-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS auth_app;
USE auth_app;

-- 사용자 테이블 생성
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 리프레시 토큰 테이블 (토큰 갱신용)
CREATE TABLE refresh_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(500) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
```

# 2. 백엔드 구현 (Node.js + Express + TypeScript)
## 2.1 package.json
* Backend package.json
```json
{
  "name": "auth-backend",
  "version": "1.0.0",
  "description": "Authentication backend with Express, TypeScript, and MySQL",
  "main": "dist/server.js",
  "scripts": {
    "start": "node dist/server.js",
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.5",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-validator": "^7.0.1",
    "express-rate-limit": "^7.1.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.5",
    "@types/bcrypt": "^5.0.2",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/cors": "^2.8.17",
    "typescript": "^5.3.3",
    "nodemon": "^3.0.2",
    "ts-node": "^10.9.2",
    "@types/jest": "^29.5.8",
    "jest": "^29.7.0"
  }
}
```

## 2.2 TypeScript 설정
* tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 2.3 환경변수 설정환경변수 예시 (.env.example)코드 # 서버 설정
```yaml
# 서버 설정
PORT=3000
NODE_ENV=development

# 데이터베이스 설정
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=auth_app

# JWT 설정
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here-different-from-jwt
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS 설정
CORS_ORIGIN=http://localhost:19006
```

## 2.4 데이터베이스 연결
* 데이터베이스 설정 (src/config/database.ts)
```ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// 데이터베이스 연결 풀 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // 최대 연결 수
  queueLimit: 0,
  acquireTimeout: 60000, // 연결 획득 타임아웃
  timeout: 60000, // 쿼리 타임아웃
  reconnect: true
});

// 데이터베이스 연결 테스트 함수
export const testConnection = async (): Promise<void> => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL 데이터베이스 연결 성공');
    connection.release();
  } catch (error) {
    console.error('❌ MySQL 데이터베이스 연결 실패:', error);
    throw error;
  }
};

export default pool;
```

## 2.5 타입 정의
* 타입 정의 (src/types/index.ts)코드 

```ts
import { Request } from 'express';

// 사용자 인터페이스
export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  created_at: Date;
  updated_at: Date;
}

// 사용자 생성을 위한 타입 (비밀번호 제외)
export interface UserResponse {
  id: number;
  email: string;
  name?: string;
  created_at: Date;
  updated_at: Date;
}

// 회원가입 요청 타입
export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

// 로그인 요청 타입
export interface LoginRequest {
  email: string;
  password: string;
}

// JWT 페이로드 타입
export interface JWTPayload {
  userId: number;
  email: string;
}

// 인증된 요청 타입 (Request 확장)
export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// 리프레시 토큰 인터페이스
export interface RefreshToken {
  id: number;
  user_id: number;
  token: string;
  expires_at: Date;
  created_at: Date;
}
```

## 2.5 타입 정의
* 타입 정의 (src/types/index.ts)코드 
```ts
import { Request } from 'express';

// 사용자 인터페이스
export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  created_at: Date;
  updated_at: Date;
}

// 사용자 생성을 위한 타입 (비밀번호 제외)
export interface UserResponse {
  id: number;
  email: string;
  name?: string;
  created_at: Date;
  updated_at: Date;
}

// 회원가입 요청 타입
export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

// 로그인 요청 타입
export interface LoginRequest {
  email: string;
  password: string;
}

// JWT 페이로드 타입
export interface JWTPayload {
  userId: number;
  email: string;
}

// 인증된 요청 타입 (Request 확장)
export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// 리프레시 토큰 인터페이스
export interface RefreshToken {
  id: number;
  user_id: number;
  token: string;
  expires_at: Date;
  created_at: Date;
}
```

## 2.6 유틸리티 함수들
* JWT 유틸리티 (src/utils/jwt.ts)
```ts
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types';

// JWT 토큰 생성
export const generateAccessToken = (payload: JWTPayload): string => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    { 
      expiresIn: process.env.JWT_EXPIRES_IN || '15m',
      issuer: 'auth-app',
      audience: 'auth-app-users'
    }
  );
};

// 리프레시 토큰 생성
export const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET as string,
    { 
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
      issuer: 'auth-app',
      audience: 'auth-app-users'
    }
  );
};

// 액세스 토큰 검증
export const verifyAccessToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string, {
      issuer: 'auth-app',
      audience: 'auth-app-users'
    }) as JWTPayload;
  } catch (error) {
    throw new Error('유효하지 않은 토큰입니다.');
  }
};

// 리프레시 토큰 검증
export const verifyRefreshToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string, {
      issuer: 'auth-app',
      audience: 'auth-app-users'
    }) as JWTPayload;
  } catch (error) {
    throw new Error('유효하지 않은 리프레시 토큰입니다.');
  }
};
```

## 2.7 비밀번호 유틸리티
* 비밀번호 유틸리티 (src/utils/password.ts)
```ts
import bcrypt from 'bcrypt';

// 비밀번호 해싱 라운드 수 (보안 강도)
const SALT_ROUNDS = 12;

/**
 * 비밀번호를 해시화합니다.
 * @param password 원본 비밀번호
 * @returns 해시화된 비밀번호
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    throw new Error('비밀번호 해싱 중 오류가 발생했습니다.');
  }
};

/**
 * 비밀번호를 검증합니다.
 * @param password 입력받은 비밀번호
 * @param hashedPassword 저장된 해시화된 비밀번호
 * @returns 비밀번호 일치 여부
 */
export const comparePassword = async (
  password: string, 
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error('비밀번호 검증 중 오류가 발생했습니다.');
  }
};
```

## 2.8 유효성 검사 미들웨어
* 유효성 검사 미들웨어 (src/middlewares/validation.ts)
```ts
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { ApiResponse } from '../types';

// 유효성 검사 결과 처리 미들웨어
export const handleValidationErrors = (
  req: Request, 
  res: Response<ApiResponse>, 
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: '입력값이 유효하지 않습니다.',
      error: errors.array().map(error => error.msg).join(', ')
    });
    return;
  }
  next();
};

// 회원가입 유효성 검사 규칙
export const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('올바른 이메일 형식을 입력해주세요.')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('이메일은 255자를 초과할 수 없습니다.'),
  
  body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('비밀번호는 8자 이상 128자 이하여야 합니다.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('비밀번호는 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.'),
  
  body('name')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('이름은 1자 이상 100자 이하여야 합니다.')
    .trim()
    .escape(), // XSS 방지
  
  handleValidationErrors
];

// 로그인 유효성 검사 규칙
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('올바른 이메일 형식을 입력해주세요.')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('비밀번호를 입력해주세요.')
    .isLength({ max: 128 })
    .withMessage('비밀번호가 너무 깁니다.'),
  
  handleValidationErrors
];
```

## 2.9 인증 미들웨어
* 인증 미들웨어 (src/middlewares/auth.ts)
```ts
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, ApiResponse } from '../types';
import { verifyAccessToken } from '../utils/jwt';

/**
 * JWT 토큰 인증 미들웨어
 * Authorization: Bearer <token> 헤더에서 토큰을 추출하여 검증
 */
export const authenticateToken = (
  req: AuthenticatedRequest, 
  res: Response<ApiResponse>, 
  next: NextFunction
): void => {
  try {
    // Authorization 헤더 확인
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: '인증 토큰이 필요합니다.',
        error: 'Authorization 헤더가 없습니다.'
      });
      return;
    }

    // Bearer 토큰 형식 확인
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      res.status(401).json({
        success: false,
        message: '올바른 토큰 형식이 아닙니다.',
        error: 'Bearer 토큰 형식을 사용해주세요.'
      });
      return;
    }

    const token = tokenParts[1];

    // 토큰 검증
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    
    next();
  } catch (error: any) {
    // 토큰 만료 등의 오류 처리
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: '토큰이 만료되었습니다.',
        error: 'TOKEN_EXPIRED'
      });
      return;
    }

    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        success: false,
        message: '유효하지 않은 토큰입니다.',
        error: 'INVALID_TOKEN'
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: '토큰 인증에 실패했습니다.',
      error: error.message
    });
  }
};
```

## 2.10 모델 (데이터베이스 접근 계층)사용자 모델 (src/models/User.ts)
```ts
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, ApiResponse } from '../types';
import { verifyAccessToken } from '../utils/jwt';

/**
 * JWT 토큰 인증 미들웨어
 * Authorization: Bearer <token> 헤더에서 토큰을 추출하여 검증
 */
export const authenticateToken = (
  req: AuthenticatedRequest, 
  res: Response<ApiResponse>, 
  next: NextFunction
): void => {
  try {
    // Authorization 헤더 확인
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: '인증 토큰이 필요합니다.',
        error: 'Authorization 헤더가 없습니다.'
      });
      return;
    }

    // Bearer 토큰 형식 확인
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      res.status(401).json({
        success: false,
        message: '올바른 토큰 형식이 아닙니다.',
        error: 'Bearer 토큰 형식을 사용해주세요.'
      });
      return;
    }

    const token = tokenParts[1];

    // 토큰 검증
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    
    next();
  } catch (error: any) {
    // 토큰 만료 등의 오류 처리
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: '토큰이 만료되었습니다.',
        error: 'TOKEN_EXPIRED'
      });
      return;
    }

    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        success: false,
        message: '유효하지 않은 토큰입니다.',
        error: 'INVALID_TOKEN'
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: '토큰 인증에 실패했습니다.',
      error: error.message
    });
  }
};
```

## 2.11 리프레시 토큰 모델리프레시 토큰 모델 (src/models/RefreshToken.ts)
```ts
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../config/database';
import { RefreshToken } from '../types';

/**
 * 리프레시 토큰 데이터베이스 모델
 */
export class RefreshTokenModel {
  
  /**
   * 리프레시 토큰 저장
   * @param userId 사용자 ID
   * @param token 리프레시 토큰
   * @param expiresAt 만료 시간
   */
  static async create(userId: number, token: string, expiresAt: Date): Promise<void> {
    try {
      await pool.execute(
        'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
        [userId, token, expiresAt]
      );
    } catch (error) {
      console.error('리프레시 토큰 저장 오류:', error);
      throw new Error('리프레시 토큰 저장 중 오류가 발생했습니다.');
    }
  }

  /**
   * 토큰으로 리프레시 토큰 찾기
   * @param token 리프레시 토큰
   * @returns 리프레시 토큰 정보 또는 null
   */
  static async findByToken(token: string): Promise<RefreshToken | null> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()',
        [token]
      );
      
      if (rows.length === 0) {
        return null;
      }
      
      return rows[0] as RefreshToken;
    } catch (error) {
      console.error('리프레시 토큰 조회 오류:', error);
      throw new Error('리프레시 토큰 조회 중 오류가 발생했습니다.');
    }
  }

  /**
   * 사용자의 모든 리프레시 토큰 삭제 (로그아웃)
   * @param userId 사용자 ID
   */
  static async deleteByUserId(userId: number): Promise<void> {
    try {
      await pool.execute(
        'DELETE FROM refresh_tokens WHERE user_id = ?',
        [userId]
      );
    } catch (error) {
      console.error('사용자 리프레시 토큰 삭제 오류:', error);
      throw new Error('리프레시 토큰 삭제 중 오류가 발생했습니다.');
    }
  }

  /**
   * 특정 리프레시 토큰 삭제
   * @param token 리프레시 토큰
   */
  static async deleteByToken(token: string): Promise<void> {
    try {
      await pool.execute(
        'DELETE FROM refresh_tokens WHERE token = ?',
        [token]
      );
    } catch (error) {
      console.error('리프레시 토큰 삭제 오류:', error);
      throw new Error('리프레시 토큰 삭제 중 오류가 발생했습니다.');
    }
  }

  /**
   * 만료된 토큰들 정리
   */
  static async cleanupExpiredTokens(): Promise<void> {
    try {
      await pool.execute(
        'DELETE FROM refresh_tokens WHERE expires_at <= NOW()'
      );
    } catch (error) {
      console.error('만료된 토큰 정리 오류:', error);
      throw new Error('만료된 토큰 정리 중 오류가 발생했습니다.');
    }
  }
}
```

## 2.12 컨트롤러 구현인증 컨트롤러 (src/controllers/authController.ts)
```ts
import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { RefreshTokenModel } from '../models/RefreshToken';
import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { RegisterRequest, LoginRequest, ApiResponse, AuthenticatedRequest } from '../types';

/**
 * 인증 관련 컨트롤러
 */
export class AuthController {
  
  /**
   * 회원가입
   */
  static async register(req: Request<{}, ApiResponse, RegisterRequest>, res: Response<ApiResponse>): Promise<void> {
    try {
      const { email, password, name } = req.body;

      // 비밀번호 해싱
      const hashedPassword = await hashPassword(password);

      // 사용자 생성
      const newUser = await UserModel.create({
        email,
        password: hashedPassword,
        name
      });

      res.status(201).json({
        success: true,
        message: '회원가입이 완료되었습니다.',
        data: {
          user: newUser
        }
      });

    } catch (error: any) {
      console.error('회원가입 오류:', error);
      
      res.status(400).json({
        success: false,
        message: '회원가입에 실패했습니다.',
        error: error.message
      });
    }
  }

  /**
   * 로그인
   */
  static async login(req: Request<{}, ApiResponse, LoginRequest>, res: Response<ApiResponse>): Promise<void> {
    try {
      const { email, password } = req.body;

      // 사용자 존재 확인
      const user = await UserModel.findByEmail(email);
      if (!user) {
        res.status(401).json({
          success: false,
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          error: 'INVALID_CREDENTIALS'
        });
        return;
      }

      // 비밀번호 검증
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          error: 'INVALID_CREDENTIALS'
        });
        return;
      }

      // JWT 토큰 생성
      const tokenPayload = { userId: user.id, email: user.email };
      const accessToken = generateAccessToken(tokenPayload);
      const refreshToken = generateRefreshToken(tokenPayload);

      // 리프레시 토큰을 데이터베이스에 저장
      const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7일 후
      await RefreshTokenModel.create(user.id, refreshToken, refreshExpiresAt);

      // 사용자 정보에서 비밀번호 제외
      const { password: _, ...userResponse } = user;

      res.status(200).json({
        success: true,
        message: '로그인이 완료되었습니다.',
        data: {
          user: userResponse,
          tokens: {
            accessToken,
            refreshToken,
            expiresIn: process.env.JWT_EXPIRES_IN || '15m'
          }
        }
      });

    } catch (error: any) {
      console.error('로그인 오류:', error);
      
      res.status(500).json({
        success: false,
        message: '로그인 처리 중 오류가 발생했습니다.',
        error: error.message
      });
    }
  }

  /**
   * 토큰 갱신
   */
  static async refreshToken(req: Request<{}, ApiResponse, { refreshToken: string }>, res: Response<ApiResponse>): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(401).json({
          success: false,
          message: '리프레시 토큰이 필요합니다.',
          error: 'REFRESH_TOKEN_REQUIRED'
        });
        return;
      }

      // 리프레시 토큰 검증
      const decoded = verifyRefreshToken(refreshToken);

      // 데이터베이스에서 리프레시 토큰 확인
      const storedToken = await RefreshTokenModel.findByToken(refreshToken);
      if (!storedToken) {
        res.status(401).json({
          success: false,
          message: '유효하지 않은 리프레시 토큰입니다.',
          error: 'INVALID_REFRESH_TOKEN'
        });
        return;
      }

      // 사용자 존재 확인
      const user = await UserModel.findById(decoded.userId);
      if (!user) {
        res.status(401).json({
          success: false,
          message: '사용자를 찾을 수 없습니다.',
          error: 'USER_NOT_FOUND'
        });
        return;
      }

      // 새로운 토큰 생성
      const tokenPayload = { userId: user.id, email: user.email };
      const newAccessToken = generateAccessToken(tokenPayload);
      const newRefreshToken = generateRefreshToken(tokenPayload);

      // 기존 리프레시 토큰 삭제 및 새 토큰 저장
      await RefreshTokenModel.deleteByToken(refreshToken);
      const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await RefreshTokenModel.create(user.id, newRefreshToken, refreshExpiresAt);

      res.status(200).json({
        success: true,
        message: '토큰이 갱신되었습니다.',
        data: {
          tokens: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            expiresIn: process.env.JWT_EXPIRES_IN || '15m'
          }
        }
      });

    } catch (error: any) {
      console.error('토큰 갱신 오류:', error);
      
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({
          success: false,
          message: '리프레시 토큰이 만료되었습니다.',
          error: 'REFRESH_TOKEN_EXPIRED'
        });
        return;
      }

      res.status(401).json({
        success: false,
        message: '토큰 갱신에 실패했습니다.',
        error: error.message
      });
    }
  }

  /**
   * 로그아웃
   */
  static async logout(req: AuthenticatedRequest, res: Response<ApiResponse>): Promise<void> {
    try {
      const userId = req.user?.userId;
      
      if (!userId) {
        res.status(401).json({
          success: false,
          message: '인증이 필요합니다.',
          error: 'UNAUTHORIZED'
        });
        return;
      }

      // 사용자의 모든 리프레시 토큰 삭제
      await RefreshTokenModel.deleteByUserId(userId);

      res.status(200).json({
        success: true,
        message: '로그아웃이 완료되었습니다.'
      });

    } catch (error: any) {
      console.error('로그아웃 오류:', error);
      
      res.status(500).json({
        success: false,
        message: '로그아웃 처리 중 오류가 발생했습니다.',
        error: error.message
      });
    }
  }

  /**
   * 현재 사용자 정보 조회
   */
  static async getProfile(req: AuthenticatedRequest, res: Response<ApiResponse>): Promise<void> {
    try {
      const userId = req.user?.userId;
      
      if (!userId) {
        res.status(401).json({
          success: false,
          message: '인증이 필요합니다.',
          error: 'UNAUTHORIZED'
        });
        return;
      }

      // 사용자 정보 조회
      const user = await UserModel.findById(userId);
      if (!user) {
        res.status(404).json({
          success: false,
          message: '사용자를 찾을 수 없습니다.',
          error: 'USER_NOT_FOUND'
        });
        return;
      }

      // 비밀번호 제외하고 반환
      const { password, ...userResponse } = user;

      res.status(200).json({
        success: true,
        message: '사용자 정보를 조회했습니다.',
        data: {
          user: userResponse
        }
      });

    } catch (error: any) {
      console.error('프로필 조회 오류:', error);
      
      res.status(500).json({
        success: false,
        message: '사용자 정보 조회 중 오류가 발생했습니다.',
        error: error.message
      });
    }
  }
}
```

## 2.13 라우터 구현
### 인증 라우터 (src/routes/auth.ts)
```ts
import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateRegister, validateLogin } from '../middlewares/validation';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

/**
 * 회원가입
 * POST /api/auth/register
 */
router.post('/register', validateRegister, AuthController.register);

/**
 * 로그인
 * POST /api/auth/login
 */
router.post('/login', validateLogin, AuthController.login);

/**
 * 토큰 갱신
 * POST /api/auth/refresh
 */
router.post('/refresh', AuthController.refreshToken);

/**
 * 로그아웃 (인증 필요)
 * POST /api/auth/logout
 */
router.post('/logout', authenticateToken, AuthController.logout);

export default router;
```

코드 

### 사용자 라우터 (src/routes/user.ts)
```ts
import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

/**
 * 현재 사용자 정보 조회
 * GET /api/user/me
 */
router.get('/me', authenticateToken, AuthController.getProfile);

export default router;
```

## 2.14 메인 서버 파일메인 서버 (src/server.ts)
```ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { testConnection } from './config/database';
import { RefreshTokenModel } from './models/RefreshToken';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import { ApiResponse } from './types';

// 환경변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 보안 미들웨어
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS 설정
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:19006',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate Limiting (속도 제한)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 최대 100개 요청
  message: {
    success: false,
    message: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
    error: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 로그인 관련 엄격한 Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 5, // 최대 5개 요청
  message: {
    success: false,
    message: '로그인 시도가 너무 많습니다. 15분 후 다시 시도해주세요.',
    error: 'AUTH_RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// 바디 파서 미들웨어
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 라우터 등록
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/user', userRoutes);

// 헬스 체크 엔드포인트
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '서버가 정상적으로 작동 중입니다.',
    data: {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

// 기본 라우트
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Auth API 서버에 오신 것을 환영합니다!',
    data: {
      version: '1.0.0',
      endpoints: {
        auth: '/api/auth',
        user: '/api/user',
        health: '/health'
      }
    }
  });
});

// 404 에러 핸들링
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: '요청하신 리소스를 찾을 수 없습니다.',
    error: 'NOT_FOUND'
  } as ApiResponse);
});

// 전역 에러 핸들링 미들웨어
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('전역 에러:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: '서버 내부 오류가 발생했습니다.',
    error: process.env.NODE_ENV === 'development' ? error.message : 'INTERNAL_SERVER_ERROR'
  } as ApiResponse);
});

// 만료된 토큰 정리 스케줄러 (1시간마다 실행)
const cleanupExpiredTokens = async () => {
  try {
    await RefreshTokenModel.cleanupExpiredTokens();
    console.log('만료된 리프레시 토큰 정리 완료');
  } catch (error) {
    console.error('토큰 정리 오류:', error);
  }
};

// 서버 시작
const startServer = async () => {
  try {
    // 데이터베이스 연결 테스트
    await testConnection();
    
    // 서버 시작
    app.listen(PORT, () => {
      console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
      console.log(`🌍 환경: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📋 API 문서: http://localhost:${PORT}/`);
      
      // 토큰 정리 스케줄러 시작
      setInterval(cleanupExpiredTokens, 60 * 60 * 1000); // 1시간마다
    });
    
  } catch (error) {
    console.error('❌ 서버 시작 실패:', error);
    process.exit(1);
  }
};

// 우아한 종료 처리
process.on('SIGTERM', () => {
  console.log('SIGTERM 신호를 받았습니다. 서버를 종료합니다...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT 신호를 받았습니다. 서버를 종료합니다...');
  process.exit(0);
});

// 처리되지 않은 예외 처리
process.on('uncaughtException', (error) => {
  console.error('처리되지 않은 예외:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('처리되지 않은 Promise 거부:', reason);
  process.exit(1);
});

startServer();
```

# 3. React Native 프론트엔드 구현
## 3.1 package.json (React Native)React Native package.json
```json
{
  "name": "auth-mobile-app",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx"
  },
  "dependencies": {
    "expo": "~49.0.0",
    "react": "18.2.0",
    "react-native": "0.72.0",
    "@react-navigation/native": "^6.1.7",
    "@react-navigation/stack": "^6.3.17",
    "react-native-screens": "~3.22.0",
    "react-native-safe-area-context": "4.6.3",
    "react-native-gesture-handler": "~2.12.0",
    "@react-native-async-storage/async-storage": "1.18.2",
    "react-native-vector-icons": "^10.0.0",
    "react-hook-form": "^7.45.4",
    "axios": "^1.5.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.14",
    "@types/react-native": "~0.72.2",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.44.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "typescript": "^5.1.3",
    "jest": "^29.2.1",
    "@types/jest": "^29.4.0"
  },
  "private": true
}
```

## 3.2 TypeScript 설정 (React Native)React Native tsconfig.json
```json
{
  "compilerOptions": {
    "target": "esnext",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src", "App.tsx"],
  "exclude": ["node_modules"]
}
```

## 3.3 타입 정의 (React Native)React Native 타입 정의 (src/types/index.ts)
```ts
// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// 사용자 인터페이스
export interface User {
  id: number;
  email: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

// 로그인 폼 데이터
export interface LoginFormData {
  email: string;
  password: string;
}

// 회원가입 폼 데이터
export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

// 토큰 정보
export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

// 로그인 응답 데이터
export interface LoginResponse {
  user: User;
  tokens: TokenInfo;
}

// 인증 컨텍스트 상태
export interface AuthState {
  user: User | null;
  tokens: TokenInfo | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// 네비게이션 타입
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
};

// 폼 에러 타입
export interface FormErrors {
  [key: string]: string;
}
```

## 3.4 API 서비스API 서비스 (src/services/api.ts)
```ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResponse, LoginFormData, RegisterFormData, LoginResponse, User } from '../types';

// API 기본 URL (개발 환경에 맞게 수정 필요)
const BASE_URL = 'http://localhost:3000/api';

// AsyncStorage 키 상수
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
} as const;

/**
 * API 클라이언트 클래스
 */
class ApiService {
  private client: AxiosInstance;

  constructor() {
    // Axios 인스턴스 생성
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 10000, // 10초 타임아웃
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 요청 인터셉터 설정
    this.setupRequestInterceptor();
    
    // 응답 인터셉터 설정
    this.setupResponseInterceptor();
  }

  /**
   * 요청 인터셉터 설정 - 자동으로 토큰을 헤더에 추가
   */
  private setupRequestInterceptor(): void {
    this.client.interceptors.request.use(
      async (config) => {
        // 토큰이 필요한 요청에 자동으로 토큰 추가
        const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        console.log(`[API 요청] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[API 요청 오류]', error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * 응답 인터셉터 설정 - 토큰 만료시 자동 갱신
   */
  private setupResponseInterceptor(): void {
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`[API 응답] ${response.status} ${response.config.url}`);
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        // 토큰 만료 에러 (401) 처리
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // 리프레시 토큰으로 새 토큰 발급
            const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
            if (refreshToken) {
              const response = await this.refreshTokens(refreshToken);
              
              // 새 토큰 저장
              await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.tokens.accessToken);
              await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.tokens.refreshToken);
              
              // 원래 요청 재시도
              originalRequest.headers.Authorization = `Bearer ${response.data.tokens.accessToken}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            // 리프레시 실패시 로그아웃 처리
            await this.clearStorage();
            console.error('[토큰 갱신 실패]', refreshError);
          }
        }

        console.error('[API 응답 오류]', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * 회원가입
   */
  async register(userData: RegisterFormData): Promise<ApiResponse<{ user: User }>> {
    const response = await this.client.post<ApiResponse<{ user: User }>>(
      '/auth/register',
      {
        email: userData.email,
        password: userData.password,
        name: userData.name,
      }
    );
    return response.data;
  }

  /**
   * 로그인
   */
  async login(credentials: LoginFormData): Promise<ApiResponse<LoginResponse>> {
    const response = await this.client.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      credentials
    );

    // 로그인 성공시 토큰과 사용자 정보 저장
    if (response.data.success && response.data.data) {
      await AsyncStorage.setItem(
        STORAGE_KEYS.ACCESS_TOKEN,
        response.data.data.tokens.accessToken
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.REFRESH_TOKEN,
        response.data.data.tokens.refreshToken
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER_DATA,
        JSON.stringify(response.data.data.user)
      );
    }

    return response.data;
  }

  /**
   * 토큰 갱신
   */
  async refreshTokens(refreshToken: string): Promise<ApiResponse<{ tokens: any }>> {
    const response = await this.client.post<ApiResponse<{ tokens: any }>>(
      '/auth/refresh',
      { refreshToken }
    );
    return response.data;
  }

  /**
   * 로그아웃
   */
  async logout(): Promise<ApiResponse> {
    try {
      const response = await this.client.post<ApiResponse>('/auth/logout');
      await this.clearStorage();
      return response.data;
    } catch (error) {
      // 로그아웃 실패해도 로컬 데이터는 삭제
      await this.clearStorage();
      throw error;
    }
  }

  /**
   * 현재 사용자 정보 조회
   */
  async getProfile(): Promise<ApiResponse<{ user: User }>> {
    const response = await this.client.get<ApiResponse<{ user: User }>>('/user/me');
    return response.data;
  }

  /**
   * 로컬 스토리지 정리
   */
  private async clearStorage(): Promise<void> {
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
      AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
      AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA),
    ]);
  }

  /**
   * 저장된 토큰 확인
   */
  async hasValidToken(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      return !!token;
    } catch (error) {
      console.error('토큰 확인 오류:', error);
      return false;
    }
  }

  /**
   * 저장된 사용자 정보 조회
   */
  async getStoredUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('저장된 사용자 정보 조회 오류:', error);
      return null;
    }
  }
}

// API 서비스 인스턴스 생성 및 내보내기
export const apiService = new ApiService();
export default apiService;
```

## 3.5 인증 컨텍스트인증 컨텍스트 (src/contexts/AuthContext.tsx)
```tsx
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, User, TokenInfo, LoginFormData, RegisterFormData } from '../types';
import apiService from '../services/api';

// 액션 타입 정의
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; tokens: TokenInfo } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User };

// 초기 상태
const initialState: AuthState = {
  user: null,
  tokens: null,
  isLoading: true,
  isAuthenticated: false,
};

// 리듀서 함수
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

// 컨텍스트 타입 정의
interface AuthContextType extends AuthState {
  login: (credentials: LoginFormData) => Promise<void>;
  register: (userData: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 프로바이더 컴포넌트
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 앱 시작시 저장된 인증 정보 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * 저장된 인증 상태 확인
   */
  const checkAuthStatus = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const hasToken = await apiService.hasValidToken();
      if (!hasToken) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

      // 저장된 사용자 정보 확인
      const storedUser = await apiService.getStoredUser();
      if (storedUser) {
        // 서버에서 최신 사용자 정보 조회
        try {
          const response = await apiService.getProfile();
          if (response.success && response.data) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                user: response.data.user,
                tokens: {
                  accessToken: '',
                  refreshToken: '',
                  expiresIn: '',
                }, // 토큰 정보는 API 서비스에서 관리
              },
            });
          }
        } catch (error) {
          console.error('프로필 조회 실패:', error);
          // 토큰이 유효하지 않은 경우 로그아웃 처리
          await apiService.logout();
        }
      }
    } catch (error) {
      console.error('인증 상태 확인 오류:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  /**
   * 로그인
   */
  const login = async (credentials: LoginFormData): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await apiService.login(credentials);

      if (response.success && response.data) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: response.data.user,
            tokens: response.data.tokens,
          },
        });
      } else {
        throw new Error(response.message || '로그인에 실패했습니다.');
      }
    } catch (error: any) {
      console.error('로그인 오류:', error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        '로그인 중 오류가 발생했습니다.'
      );
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  /**
   * 회원가입
   */
  const register = async (userData: RegisterFormData): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await apiService.register(userData);

      if (!response.success) {
        throw new Error(response.message || '회원가입에 실패했습니다.');
      }

      // 회원가입 성공 후 자동 로그인은 하지 않음
      // 사용자가 직접 로그인하도록 유도
    } catch (error: any) {
      console.error('회원가입 오류:', error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        '회원가입 중 오류가 발생했습니다.'
      );
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  /**
   * 로그아웃
   */
  const logout = async (): Promise<void> => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('로그아웃 오류:', error);
    } finally {
      dispatch({ type: 'LOGOUT' });
    }
  };

  /**
   * 사용자 프로필 새로고침
   */
  const refreshProfile = async (): Promise<void> => {
    try {
      const response = await apiService.getProfile();
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_USER', payload: response.data.user });
      }
    } catch (error) {
      console.error('프로필 새로고침 오류:', error);
      // 프로필 조회 실패시 로그아웃 처리
      await logout();
    }
  };

  // 컨텍스트 값
  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## 3.6 유틸리티 함수들유효성 검사 유틸리티 (src/utils/validation.ts)
```ts
import { FormErrors } from '../types';

/**
 * 이메일 형식 검증
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 비밀번호 강도 검증
 * - 최소 8자 이상
 * - 대문자, 소문자, 숫자, 특수문자 각각 하나 이상 포함
 */
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * 비밀번호 강도 체크 (상세)
 */
export const getPasswordStrengthErrors = (password: string): string[] => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('비밀번호는 8자 이상이어야 합니다.');
  }

  if (password.length > 128) {
    errors.push('비밀번호는 128자 이하여야 합니다.');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('소문자를 하나 이상 포함해야 합니다.');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('대문자를 하나 이상 포함해야 합니다.');
  }

  if (!/\d/.test(password)) {
    errors.push('숫자를 하나 이상 포함해야 합니다.');
  }

  if (!/[@$!%*?&]/.test(password)) {
    errors.push('특수문자(@$!%*?&)를 하나 이상 포함해야 합니다.');
  }

  return errors;
};

/**
 * 이름 검증
 */
export const validateName = (name: string): boolean => {
  return name.trim().length >= 1 && name.trim().length <= 100;
};

/**
 * 로그인 폼 검증
 */
export const validateLoginForm = (email: string, password: string): FormErrors => {
  const errors: FormErrors = {};

  // 이메일 검증
  if (!email.trim()) {
    errors.email = '이메일을 입력해주세요.';
  } else if (!validateEmail(email)) {
    errors.email = '올바른 이메일 형식을 입력해주세요.';
  }

  // 비밀번호 검증
  if (!password.trim()) {
    errors.password = '비밀번호를 입력해주세요.';
  }

  return errors;
};

/**
 * 회원가입 폼 검증
 */
export const validateRegisterForm = (
  email: string,
  password: string,
  confirmPassword: string,
  name: string
): FormErrors => {
  const errors: FormErrors = {};

  // 이메일 검증
  if (!email.trim()) {
    errors.email = '이메일을 입력해주세요.';
  } else if (!validateEmail(email)) {
    errors.email = '올바른 이메일 형식을 입력해주세요.';
  }

  // 비밀번호 검증
  if (!password.trim()) {
    errors.password = '비밀번호를 입력해주세요.';
  } else {
    const passwordErrors = getPasswordStrengthErrors(password);
    if (passwordErrors.length > 0) {
      errors.password = passwordErrors[0]; // 첫 번째 오류만 표시
    }
  }

  // 비밀번호 확인 검증
  if (!confirmPassword.trim()) {
    errors.confirmPassword = '비밀번호 확인을 입력해주세요.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
  }

  // 이름 검증
  if (!name.trim()) {
    errors.name = '이름을 입력해주세요.';
  } else if (!validateName(name)) {
    errors.name = '이름은 1자 이상 100자 이하여야 합니다.';
  }

  return errors;
};

/**
 * XSS 방지를 위한 HTML 이스케이프
 */
export const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

/**
 * 입력값 정제 (트림 및 이스케이프)
 */
export const sanitizeInput = (input: string): string => {
  return escapeHtml(input.trim());
};
```

## 3.7 공통 컴포넌트들공통 컴포넌트 (src/components/common/index.tsx)
```tsx
import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInputProps,
  TouchableOpacityProps,
} from 'react-native';

// 색상 상수
export const COLORS = {
  primary: '#007bff',
  primaryDark: '#0056b3',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
  white: '#ffffff',
  black: '#000000',
  gray: '#6c757d',
  lightGray: '#f5f5f5',
  border: '#dee2e6',
} as const;

// 공통 스타일
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 30,
    textAlign: 'center',
  },
});

// 커스텀 입력 필드 인터페이스
interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
  containerStyle?: any;
}

/**
 * 커스텀 입력 필드 컴포넌트
 */
export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[inputStyles.container, containerStyle]}>
      <Text style={inputStyles.label}>{label}</Text>
      <TextInput
        style={[
          inputStyles.input,
          error ? inputStyles.inputError : null,
          style,
        ]}
        placeholderTextColor={COLORS.gray}
        {...props}
      />
      {error && <Text style={inputStyles.errorText}>{error}</Text>}
    </View>
  );
};

// 입력 필드 스타일
const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: COLORS.white,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.danger,
    marginTop: 5,
  },
});

// 커스텀 버튼 인터페이스
interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

/**
 * 커스텀 버튼 컴포넌트
 */
export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  loading = false,
  variant = 'primary',
  size = 'medium',
  style,
  disabled,
  ...props
}) => {
  const buttonStyle = [
    buttonStyles.base,
    buttonStyles[variant],
    buttonStyles[size],
    disabled && buttonStyles.disabled,
    style,
  ];

  const textStyle = [
    buttonStyles.text,
    buttonStyles[`${variant}Text`],
    buttonStyles[`${size}Text`],
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? COLORS.primary : COLORS.white}
          size="small"
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

// 버튼 스타일
const buttonStyles = StyleSheet.create({
  base: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  primary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  danger: {
    backgroundColor: COLORS.danger,
    borderColor: COLORS.danger,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: COLORS.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: COLORS.white,
    fontSize: 16,
  },
  secondaryText: {
    color: COLORS.white,
    fontSize: 16,
  },
  dangerText: {
    color: COLORS.white,
    fontSize: 16,
  },
  outlineText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});

/**
 * 로딩 스피너 컴포넌트
 */
interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = COLORS.primary,
  message,
}) => {
  return (
    <View style={spinnerStyles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={spinnerStyles.message}>{message}</Text>}
    </View>
  );
};

const spinnerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  message: {
    marginTop: 15,
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
  },
});

/**
 * 에러 알림 표시
 */
export const showErrorAlert = (title: string, message: string): void => {
  Alert.alert(title, message, [{ text: '확인', style: 'default' }]);
};

/**
 * 성공 알림 표시
 */
export const showSuccessAlert = (title: string, message: string): void => {
  Alert.alert(title, message, [{ text: '확인', style: 'default' }]);
};

/**
 * 확인 대화상자 표시
 */
export const showConfirmAlert = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
): void => {
  Alert.alert(
    title,
    message,
    [
      { text: '취소', style: 'cancel', onPress: onCancel },
      { text: '확인', style: 'default', onPress: onConfirm },
    ]
  );
};
```

## 3.8 로그인 화면로그인 화면 (src/screens/LoginScreen.tsx)
```tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import {
  CustomInput,
  CustomButton,
  LoadingSpinner,
  showErrorAlert,
  COLORS,
  commonStyles,
} from '../components/common';
import { validateLoginForm, sanitizeInput } from '../utils/validation';
import { LoginFormData, FormErrors, RootStackParamList } from '../types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

/**
 * 로그인 화면 컴포넌트
 */
const LoginScreen: React.FC<Props> = ({ navigation }) => {
  // 상태 관리
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 인증 컨텍스트
  const { login, isLoading, isAuthenticated } = useAuth();

  // 이미 로그인된 경우 홈으로 이동
  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, [isAuthenticated, navigation]);

  /**
   * 입력값 변경 처리
   */
  const handleInputChange = (field: keyof LoginFormData, value: string): void => {
    // 입력값 정제
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [field]: sanitizedValue,
    }));

    // 해당 필드의 에러 제거
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  /**
   * 로그인 폼 제출
   */
  const handleSubmit = async (): Promise<void> => {
    try {
      setIsSubmitting(true);

      // 폼 유효성 검사
      const validationErrors = validateLoginForm(formData.email, formData.password);
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // 로그인 시도
      await login(formData);

      // 로그인 성공시 홈으로 이동 (useEffect에서 처리됨)
    } catch (error: any) {
      console.error('로그인 실패:', error);
      showErrorAlert('로그인 실패', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * 회원가입 화면으로 이동
   */
  const navigateToRegister = (): void => {
    navigation.navigate('Register');
  };

  // 로딩 중일 때 스피너 표시
  if (isLoading) {
    return <LoadingSpinner message="로그인 상태를 확인하고 있습니다..." />;
  }

  return (
    <KeyboardAvoidingView
      style={commonStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          {/* 헤더 */}
          <View style={styles.header}>
            <Text style={commonStyles.title}>로그인</Text>
            <Text style={commonStyles.subtitle}>
              계정에 로그인하여 앱을 이용해보세요
            </Text>
          </View>

          {/* 로그인 폼 */}
          <View style={styles.form}>
            <CustomInput
              label="이메일"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              error={errors.email}
              placeholder="이메일을 입력해주세요"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
            />

            <CustomInput
              label="비밀번호"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              error={errors.password}
              placeholder="비밀번호를 입력해주세요"
              secureTextEntry
              textContentType="password"
            />

            <CustomButton
              title="로그인"
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
              style={styles.loginButton}
            />
          </View>

          {/* 회원가입 링크 */}
          <View style={styles.registerSection}>
            <Text style={styles.registerText}>아직 계정이 없으신가요?</Text>
            <TouchableOpacity onPress={navigateToRegister}>
              <Text style={styles.registerLink}>회원가입하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 40,
  },
  form: {
    marginBottom: 30,
  },
  loginButton: {
    marginTop: 10,
  },
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  registerText: {
    fontSize: 16,
    color: COLORS.gray,
    marginRight: 5,
  },
  registerLink: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;
```

## 3.9 회원가입 화면회원가입 화면 (src/screens/RegisterScreen.tsx)
```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import {
  CustomInput,
  CustomButton,
  showErrorAlert,
  showSuccessAlert,
  COLORS,
  commonStyles,
} from '../components/common';
import { validateRegisterForm, sanitizeInput } from '../utils/validation';
import { RegisterFormData, FormErrors, RootStackParamList } from '../types';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

/**
 * 회원가입 화면 컴포넌트
 */
const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  // 상태 관리
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 인증 컨텍스트
  const { register } = useAuth();

  /**
   * 입력값 변경 처리
   */
  const handleInputChange = (field: keyof RegisterFormData, value: string): void => {
    // 입력값 정제
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [field]: sanitizedValue,
    }));

    // 해당 필드의 에러 제거
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  /**
   * 회원가입 폼 제출
   */
  const handleSubmit = async (): Promise<void> => {
    try {
      setIsSubmitting(true);

      // 폼 유효성 검사
      const validationErrors = validateRegisterForm(
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.name
      );
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // 회원가입 시도
      await register(formData);

      // 회원가입 성공
      showSuccessAlert(
        '회원가입 완료',
        '회원가입이 완료되었습니다. 로그인해주세요.',
        () => navigation.navigate('Login')
      );

    } catch (error: any) {
      console.error('회원가입 실패:', error);
      showErrorAlert('회원가입 실패', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * 로그인 화면으로 이동
   */
  const navigateToLogin = (): void => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={commonStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          {/* 헤더 */}
          <View style={styles.header}>
            <Text style={commonStyles.title}>회원가입</Text>
            <Text style={commonStyles.subtitle}>
              새 계정을 만들어 앱을 시작해보세요
            </Text>
          </View>

          {/* 회원가입 폼 */}
          <View style={styles.form}>
            <CustomInput
              label="이름"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              error={errors.name}
              placeholder="이름을 입력해주세요"
              autoCapitalize="words"
              textContentType="name"
            />

            <CustomInput
              label="이메일"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              error={errors.email}
              placeholder="이메일을 입력해주세요"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
            />

            <CustomInput
              label="비밀번호"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              error={errors.password}
              placeholder="비밀번호를 입력해주세요"
              secureTextEntry
              textContentType="newPassword"
            />

            <CustomInput
              label="비밀번호 확인"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              error={errors.confirmPassword}
              placeholder="비밀번호를 다시 입력해주세요"
              secureTextEntry
              textContentType="newPassword"
            />

            {/* 비밀번호 요구사항 안내 */}
            <View style={styles.passwordHint}>
              <Text style={styles.passwordHintText}>
                비밀번호는 8자 이상이며, 대문자, 소문자, 숫자, 특수문자(@$!%*?&)를 각각 하나 이상 포함해야 합니다.
              </Text>
            </View>

            <CustomButton
              title="회원가입"
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
              style={styles.registerButton}
            />
          </View>

          {/* 로그인 링크 */}
          <View style={styles.loginSection}>
            <Text style={styles.loginText}>이미 계정이 있으신가요?</Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginLink}>로그인하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 40,
  },
  form: {
    marginBottom: 30,
  },
  passwordHint: {
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  passwordHintText: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
  },
  registerButton: {
    marginTop: 10,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  loginText: {
    fontSize: 16,
    color: COLORS.gray,
    marginRight: 5,
  },
  loginLink: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default RegisterScreen;
```

## 3.10 홈 화면홈 화면 (src/screens/HomeScreen.tsx)
```tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import {
  CustomButton,
  LoadingSpinner,
  showConfirmAlert,
  COLORS,
  commonStyles,
} from '../components/common';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

/**
 * 홈 화면 컴포넌트
 */
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // 인증 컨텍스트
  const { user, isLoading, logout } = useAuth();

  /**
   * 로그아웃 확인 및 처리
   */
  const handleLogout = (): void => {
    showConfirmAlert(
      '로그아웃',
      '정말 로그아웃하시겠습니까?',
      async () => {
        try {
          await logout();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        } catch (error) {
          console.error('로그아웃 오류:', error);
        }
      }
    );
  };

  /**
   * 프로필 화면으로 이동
   */
  const navigateToProfile = (): void => {
    navigation.navigate('Profile');
  };

  // 로딩 중일 때 스피너 표시
  if (isLoading) {
    return <LoadingSpinner message="사용자 정보를 불러오고 있습니다..." />;
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>안녕하세요!</Text>
          <Text style={styles.userNameText}>
            {user?.name || user?.email || '사용자'}님
          </Text>
          <Text style={styles.subText}>
            로그인이 완료되었습니다. 앱을 자유롭게 이용해보세요.
          </Text>
        </View>

        {/* 메인 컨텐츠 */}
        <View style={styles.content}>
          <View style={styles.userInfoCard}>
            <Text style={styles.cardTitle}>사용자 정보</Text>
            <View style={styles.userInfo}>
              <Text style={styles.infoLabel}>이메일:</Text>
              <Text style={styles.infoValue}>{user?.email}</Text>
            </View>
            {user?.name && (
              <View style={styles.userInfo}>
                <Text style={styles.infoLabel}>이름:</Text>
                <Text style={styles.infoValue}>{user.name}</Text>
              </View>
            )}
            <View style={styles.userInfo}>
              <Text style={styles.infoLabel}>가입일:</Text>
              <Text style={styles.infoValue}>
                {user?.created_at ? new Date(user.created_at).toLocaleDateString('ko-KR') : '-'}
              </Text>
            </View>
          </View>

          {/* 액션 버튼들 */}
          <View style={styles.actions}>
            <CustomButton
              title="프로필 보기"
              onPress={navigateToProfile}
              variant="outline"
              style={styles.actionButton}
            />

            <CustomButton
              title="로그아웃"
              onPress={handleLogout}
              variant="danger"
              style={styles.actionButton}
            />
          </View>
        </View>

        {/* 푸터 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Auth App v1.0.0</Text>
          <Text style={styles.footerSubText}>
            안전한 인증 시스템으로 보호받고 있습니다
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 10,
  },
  userNameText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 15,
  },
  subText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    flex: 1,
  },
  userInfoCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.dark,
    flex: 1,
    textAlign: 'right',
  },
  actions: {
    gap: 15,
  },
  actionButton: {
    marginBottom: 0,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
    marginBottom: 5,
  },
  footerSubText: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
  },
});

export default HomeScreen;
```

## 3.11 프로필 화면프로필 화면 (src/screens/ProfileScreen.tsx)
```tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import {
  CustomButton,
  LoadingSpinner,
  showErrorAlert,
  showConfirmAlert,
  COLORS,
  commonStyles,
} from '../components/common';
import { RootStackParamList } from '../types';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

/**
 * 프로필 화면 컴포넌트
 */
const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  // 상태 관리
  const [refreshing, setRefreshing] = useState(false);

  // 인증 컨텍스트
  const { user, isLoading, logout, refreshProfile } = useAuth();

  // 화면 포커스시 프로필 새로고침
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleRefresh();
    });

    return unsubscribe;
  }, [navigation]);

  /**
   * 프로필 새로고침
   */
  const handleRefresh = async (): Promise<void> => {
    try {
      setRefreshing(true);
      await refreshProfile();
    } catch (error: any) {
      console.error('프로필 새로고침 오류:', error);
      showErrorAlert('오류', '프로필 정보를 불러오는데 실패했습니다.');
    } finally {
      setRefreshing(false);
    }
  };

  /**
   * 로그아웃 확인 및 처리
   */
  const handleLogout = (): void => {
    showConfirmAlert(
      '로그아웃',
      '정말 로그아웃하시겠습니까?',
      async () => {
        try {
          await logout();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        } catch (error) {
          console.error('로그아웃 오류:', error);
        }
      }
    );
  };

  /**
   * 홈으로 돌아가기
   */
  const navigateToHome = (): void => {
    navigation.navigate('Home');
  };

  // 로딩 중일 때 스피너 표시
  if (isLoading && !user) {
    return <LoadingSpinner message="프로필 정보를 불러오고 있습니다..." />;
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={commonStyles.title}>프로필</Text>
          <Text style={commonStyles.subtitle}>
            계정 정보를 확인하고 관리하세요
          </Text>
        </View>

        {/* 프로필 정보 카드 */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
            <Text style={styles.userName}>
              {user?.name || '이름 없음'}
            </Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>

          <View style={styles.profileDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>사용자 ID</Text>
              <Text style={styles.detailValue}>{user?.id}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>이메일</Text>
              <Text style={styles.detailValue}>{user?.email}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>이름</Text>
              <Text style={styles.detailValue}>{user?.name || '설정되지 않음'}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>가입일</Text>
              <Text style={styles.detailValue}>
                {user?.created_at 
                  ? new Date(user.created_at).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : '-'
                }
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>최종 수정일</Text>
              <Text style={styles.detailValue}>
                {user?.updated_at 
                  ? new Date(user.updated_at).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : '-'
                }
              </Text>
            </View>
          </View>
        </View>

        {/* 액션 버튼들 */}
        <View style={styles.actions}>
          <CustomButton
            title="홈으로 돌아가기"
            onPress={navigateToHome}
            variant="outline"
            style={styles.actionButton}
          />

          <CustomButton
            title="프로필 새로고침"
            onPress={handleRefresh}
            variant="secondary"
            loading={refreshing}
            disabled={refreshing}
            style={styles.actionButton}
          />

          <CustomButton
            title="로그아웃"
            onPress={handleLogout}
            variant="danger"
            style={styles.actionButton}
          />
        </View>

        {/* 개발 정보 */}
        <View style={styles.devInfo}>
          <Text style={styles.devInfoTitle}>개발 정보</Text>
          <Text style={styles.devInfoText}>
            이 앱은 React Native, TypeScript, Node.js, Express, MySQL을 사용하여 개발되었습니다.
          </Text>
          <Text style={styles.devInfoText}>
            JWT 기반 인증과 bcrypt 해싱을 통해 보안을 강화했습니다.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: COLORS.gray,
  },
  profileDetails: {
    gap: 0,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: COLORS.dark,
    flex: 2,
    textAlign: 'right',
  },
  actions: {
    gap: 15,
    marginBottom: 30,
  },
  actionButton: {
    marginBottom: 0,
  },
  devInfo: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  devInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 10,
  },
  devInfoText: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
    marginBottom: 5,
  },
});

export default ProfileScreen;
```

## 3.12 네비게이션 설정네비게이션 설정 (src/navigation/AppNavigator.tsx)
```tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner, COLORS } from '../components/common';
import { RootStackParamList } from '../types';

// 화면 컴포넌트 import
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * 인증되지 않은 사용자를 위한 스택 네비게이터
 */
const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: '로그인',
          headerShown: false, // 로그인 화면에서는 헤더 숨김
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: '회원가입',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

/**
 * 인증된 사용자를 위한 스택 네비게이터
 */
const MainStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          headerShown: false, // 홈 화면에서는 헤더 숨김
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '프로필',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

/**
 * 메인 네비게이션 컴포넌트
 */
const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // 로딩 중일 때 스피너 표시
  if (isLoading) {
    return <LoadingSpinner message="앱을 시작하고 있습니다..." />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
```

## 3.13 메인 App 컴포넌트메인 App 컴포넌트 (App.tsx)
```tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

// 컨텍스트 및 네비게이션
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * 메인 App 컴포넌트
 * 
 * 전체 앱의 진입점이며, 필수 프로바이더들과 네비게이션을 설정합니다.
 * - SafeAreaProvider: 안전한 영역 관리
 * - GestureHandlerRootView: 제스처 처리
 * - AuthProvider: 전역 인증 상태 관리
 * - AppNavigator: 화면 네비게이션
 */
export default function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <AuthProvider>
          {/* 상태바 설정 */}
          <StatusBar style="auto" backgroundColor="#007bff" />
          
          {/* 메인 네비게이션 */}
          <AppNavigator />
        </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

## 3.14 showSuccessAlert 함수 수정공통 컴포넌트 (src/components/common/index.tsx)
```tsx
import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInputProps,
  TouchableOpacityProps,
} from 'react-native';

// 색상 상수
export const COLORS = {
  primary: '#007bff',
  primaryDark: '#0056b3',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
  white: '#ffffff',
  black: '#000000',
  gray: '#6c757d',
  lightGray: '#f5f5f5',
  border: '#dee2e6',
} as const;

// 공통 스타일
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 30,
    textAlign: 'center',
  },
});

// 커스텀 입력 필드 인터페이스
interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
  containerStyle?: any;
}

/**
 * 커스텀 입력 필드 컴포넌트
 */
export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[inputStyles.container, containerStyle]}>
      <Text style={inputStyles.label}>{label}</Text>
      <TextInput
        style={[
          inputStyles.input,
          error ? inputStyles.inputError : null,
          style,
        ]}
        placeholderTextColor={COLORS.gray}
        {...props}
      />
      {error && <Text style={inputStyles.errorText}>{error}</Text>}
    </View>
  );
};

// 입력 필드 스타일
const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: COLORS.white,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.danger,
    marginTop: 5,
  },
});

// 커스텀 버튼 인터페이스
interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

/**
 * 커스텀 버튼 컴포넌트
 */
export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  loading = false,
  variant = 'primary',
  size = 'medium',
  style,
  disabled,
  ...props
}) => {
  const buttonStyle = [
    buttonStyles.base,
    buttonStyles[variant],
    buttonStyles[size],
    disabled && buttonStyles.disabled,
    style,
  ];

  const textStyle = [
    buttonStyles.text,
    buttonStyles[`${variant}Text`],
    buttonStyles[`${size}Text`],
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? COLORS.primary : COLORS.white}
          size="small"
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

// 버튼 스타일
const buttonStyles = StyleSheet.create({
  base: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  primary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  danger: {
    backgroundColor: COLORS.danger,
    borderColor: COLORS.danger,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: COLORS.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: COLORS.white,
    fontSize: 16,
  },
  secondaryText: {
    color: COLORS.white,
    fontSize: 16,
  },
  dangerText: {
    color: COLORS.white,
    fontSize: 16,
  },
  outlineText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});

/**
 * 로딩 스피너 컴포넌트
 */
interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = COLORS.primary,
  message,
}) => {
  return (
    <View style={spinnerStyles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={spinnerStyles.message}>{message}</Text>}
    </View>
  );
};

const spinnerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  message: {
    marginTop: 15,
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
  },
});

/**
 * 에러 알림 표시
 */
export const showErrorAlert = (title: string, message: string): void => {
  Alert.alert(title, message, [{ text: '확인', style: 'default' }]);
};

/**
 * 성공 알림 표시
 */
export const showSuccessAlert = (title: string, message: string, onPress?: () => void): void => {
  Alert.alert(title, message, [{ text: '확인', style: 'default', onPress }]);
};

/**
 * 확인 대화상자 표시
 */
export const showConfirmAlert = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
): void => {
  Alert.alert(
    title,
    message,
    [
      { text: '취소', style: 'cancel', onPress: onCancel },
      { text: '확인', style: 'default', onPress: onConfirm },
    ]
  );
};
```

# 4. 프로젝트 구조 및 설치 가이드

## 4.1 백엔드 프로젝트 구조프로젝트 구조 및 설치 가이드
# 풀스택 로그인 애플리케이션 가이드

## 📁 백엔드 프로젝트 구조

```
auth-backend/
├── src/
│   ├── config/
│   │   └── database.ts          # 데이터베이스 연결 설정
│   ├── controllers/
│   │   └── authController.ts    # 인증 관련 비즈니스 로직
│   ├── middlewares/
│   │   ├── auth.ts             # JWT 인증 미들웨어
│   │   └── validation.ts       # 입력값 유효성 검사
│   ├── models/
│   │   ├── User.ts             # 사용자 데이터 모델
│   │   └── RefreshToken.ts     # 리프레시 토큰 모델
│   ├── routes/
│   │   ├── auth.ts             # 인증 관련 라우터
│   │   └── user.ts             # 사용자 관련 라우터
│   ├── types/
│   │   └── index.ts            # TypeScript 타입 정의
│   ├── utils/
│   │   ├── jwt.ts              # JWT 토큰 관련 유틸리티
│   │   └── password.ts         # 비밀번호 해싱 유틸리티
│   └── server.ts               # 메인 서버 파일
├── .env.example                # 환경변수 예시
├── package.json
└── tsconfig.json
```

## 📁 프론트엔드 프로젝트 구조

```
auth-mobile-app/
├── src/
│   ├── components/
│   │   └── common/
│   │       └── index.tsx       # 공통 컴포넌트들
│   ├── contexts/
│   │   └── AuthContext.tsx     # 전역 인증 상태 관리
│   ├── navigation/
│   │   └── AppNavigator.tsx    # 네비게이션 설정
│   ├── screens/
│   │   ├── LoginScreen.tsx     # 로그인 화면
│   │   ├── RegisterScreen.tsx  # 회원가입 화면
│   │   ├── HomeScreen.tsx      # 홈 화면
│   │   └── ProfileScreen.tsx   # 프로필 화면
│   ├── services/
│   │   └── api.ts              # API 서비스 (HTTP 요청)
│   ├── types/
│   │   └── index.ts            # TypeScript 타입 정의
│   └── utils/
│       └── validation.ts       # 유효성 검사 유틸리티
├── App.tsx                     # 메인 앱 컴포넌트
├── package.json
└── tsconfig.json
```

## 🚀 설치 및 실행 가이드

### 1. 백엔드 설치 및 실행

```bash
# 프로젝트 폴더 생성 및 이동
mkdir auth-backend
cd auth-backend

# npm 초기화 및 의존성 설치
npm init -y
npm install express mysql2 bcrypt jsonwebtoken cors helmet express-validator express-rate-limit dotenv
npm install -D @types/express @types/node @types/bcrypt @types/jsonwebtoken @types/cors typescript nodemon ts-node @types/jest jest

# TypeScript 설정
npx tsc --init

# 환경변수 파일 생성
cp .env.example .env
# .env 파일을 편집하여 실제 데이터베이스 정보 입력

# 개발 서버 실행
npm run dev

# 프로덕션 빌드 및 실행
npm run build
npm start
```

### 2. 프론트엔드 설치 및 실행

```bash
# Expo CLI 전역 설치 (없는 경우)
npm install -g @expo/cli

# React Native 프로젝트 생성
npx create-expo-app auth-mobile-app --template blank-typescript
cd auth-mobile-app

# 의존성 설치
npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context react-native-gesture-handler @react-native-async-storage/async-storage react-native-vector-icons react-hook-form axios

# Expo 개발 서버 실행
npm start

# 특정 플랫폼에서 실행
npm run android  # Android
npm run ios      # iOS
npm run web      # 웹 (개발용)
```

### 3. 데이터베이스 설정

```bash
# MySQL 접속
mysql -u root -p

# 제공된 SQL 스크립트 실행
source schema.sql
```

## 🔧 환경변수 설정

### 백엔드 (.env)

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=auth_app

JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here-different-from-jwt
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:19006
```

### 프론트엔드 API 설정

`src/services/api.ts` 파일에서 `BASE_URL`을 실제 백엔드 서버 주소로 수정:

```typescript
const BASE_URL = 'http://YOUR_BACKEND_IP:3000/api';
```

## 📱 API 엔드포인트

### 인증 관련
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/refresh` - 토큰 갱신
- `POST /api/auth/logout` - 로그아웃

### 사용자 관련
- `GET /api/user/me` - 현재 사용자 정보 조회

### 기타
- `GET /health` - 서버 상태 확인
- `GET /` - API 정보

## 🔒 보안 특징

### 백엔드 보안
- **비밀번호 해싱**: bcrypt 사용 (12 라운드)
- **JWT 토큰**: 액세스 토큰(15분) + 리프레시 토큰(7일)
- **Rate Limiting**: 일반 요청 100/15분, 인증 요청 5/15분
- **입력값 검증**: express-validator 사용
- **CORS 설정**: 허용된 도메인만 접근 가능
- **헬멧 미들웨어**: 다양한 보안 헤더 설정
- **SQL Injection 방지**: Prepared Statement 사용

### 프론트엔드 보안
- **토큰 자동 갱신**: 만료 시 자동으로 리프레시
- **입력값 정제**: XSS 방지를 위한 HTML 이스케이프
- **안전한 저장**: AsyncStorage 사용
- **자동 로그아웃**: 토큰 갱신 실패 시 자동 로그아웃

## 🎯 주요 기능

### 사용자 관리
- ✅ 이메일 기반 회원가입/로그인
- ✅ 강력한 비밀번호 정책 적용
- ✅ 중복 이메일 방지
- ✅ 사용자 프로필 조회

### 토큰 관리
- ✅ JWT 액세스 토큰 (짧은 수명)
- ✅ 리프레시 토큰 (긴 수명)
- ✅ 자동 토큰 갱신
- ✅ 안전한 로그아웃 (모든 토큰 무효화)

### 사용자 경험
- ✅ 실시간 입력값 검증
- ✅ 로딩 상태 표시
- ✅ 에러 메시지 처리
- ✅ 직관적인 UI/UX

## 🔄 동작 방식

### 1. 회원가입 프로세스
1. 사용자가 회원가입 폼 입력
2. 프론트엔드에서 입력값 검증
3. 백엔드로 데이터 전송
4. 백엔드에서 재검증 및 비밀번호 해싱
5. 데이터베이스에 사용자 정보 저장
6. 성공 응답 반환

### 2. 로그인 프로세스
1. 사용자가 로그인 폼 입력
2. 백엔드에서 이메일로 사용자 조회
3. 비밀번호 검증 (bcrypt)
4. JWT 토큰 생성 (액세스 + 리프레시)
5. 리프레시 토큰을 데이터베이스에 저장
6. 토큰과 사용자 정보 반환
7. 프론트엔드에서 토큰을 AsyncStorage에 저장

### 3. 인증된 요청 프로세스
1. API 요청 시 자동으로 액세스 토큰 헤더에 추가
2. 백엔드에서 토큰 검증
3. 토큰 만료 시 프론트엔드에서 자동으로 리프레시 토큰 사용
4. 새로운 액세스 토큰 발급 및 재시도
5. 리프레시 토큰도 만료된 경우 로그아웃 처리

### 4. 로그아웃 프로세스
1. 백엔드로 로그아웃 요청
2. 데이터베이스에서 사용자의 모든 리프레시 토큰 삭제
3. 프론트엔드에서 AsyncStorage의 모든 토큰 삭제
4. 로그인 화면으로 리다이렉트

## 🛠️ 개발 팁

### 백엔드 개발
- `npm run dev` 실행 후 `http://localhost:3000/health`에서 서버 상태 확인
- 로그를 통해 API 요청/응답 모니터링
- MySQL Workbench나 phpMyAdmin으로 데이터베이스 상태 확인

### 프론트엔드 개발
- Expo Go 앱을 설치하여 실제 디바이스에서 테스트
- React Native Debugger 사용 권장
- AsyncStorage에 저장된 토큰 상태 확인 가능

### 테스트 방법
1. Postman이나 Insomnia로 API 엔드포인트 테스트
2. 다양한 에러 케이스 테스트 (잘못된 토큰, 만료된 토큰 등)
3. 네트워크 연결 끊김 상황 테스트

## 🚨 주의사항

1. **프로덕션 배포 전 확인사항**:
   - JWT 시크릿 키를 강력하고 고유하게 설정
   - 데이터베이스 접속 정보 보안
   - HTTPS 사용 강제
   - 환경변수 파일(.env) Git에 커밋하지 않기

2. **개발 중 주의사항**:
   - IP 주소 변경 시 프론트엔드 API_BASE_URL 업데이트
   - CORS 설정에서 프론트엔드 주소 확인
   - 토큰 만료 시간을 적절히 설정

3. **보안 고려사항**:
   - 정기적인 의존성 업데이트
   - SQL 쿼리는 항상 Prepared Statement 사용
   - 사용자 입력값은 항상 검증 및 정제
   - 에러 메시지에서 시스템 정보 노출 금지

완성! 🎉
현업 수준의 풀스택 로그인 애플리케이션을 완성했습니다. 주요 특징들을 정리하면:
✨ 핵심 기능

완전한 인증 시스템: 회원가입, 로그인, 토큰 갱신, 로그아웃
보안 강화: bcrypt 해싱, JWT 토큰, Rate Limiting, 입력값 검증
사용자 친화적 UI: 실시간 검증, 로딩 상태, 에러 처리

🛡️ 보안 특징

다층 보안: 프론트엔드 + 백엔드 이중 검증
토큰 관리: 액세스 토큰(짧은 수명) + 리프레시 토큰(긴 수명)
자동화: 토큰 만료 시 자동 갱신, 실패 시 자동 로그아웃

🏗️ 아키텍처

모듈화: 관심사 분리로 유지보수성 향상
타입 안전성: 전체 프로젝트 TypeScript 적용
확장성: 새로운 기능 추가가 용이한 구조

📱 사용자 경험

직관적 네비게이션: React Navigation으로 부드러운 화면 전환
반응형 폼: 실시간 검증과 피드백
에러 처리: 사용자 친화적인 에러 메시지