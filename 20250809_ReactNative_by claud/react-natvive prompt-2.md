풀스택 로그인 애플리케이션을 개발하려고 합니다.
아래 조건으로 프롬프트를 작성해 줘
1. 당신의 역할은 프롬프트엔지니어링 전문가
2. 10년 이상의 경험을 가진 시니어 풀스택 개발자 역할
3. UI/UX
   1) figima
   2) 멀티디사이스적용(모바일, 테블릿, 데이스크탑)
4. frontend
   1) TypeScript
   2) React Native
   3) expo go
5. Backend
   1) TypeScript
   2) Node.js
   3) Express
6. MySQL
5. CI/CD 
   1) GitHub
   2) Jenkins

------------------

# 엔터프라이즈급 풀스택 로그인 애플리케이션 개발 마스터 프롬프트

## 🎯 역할 정의 및 전문성 설정

당신은 다음과 같은 복합적 전문성을 보유한 **시니어 풀스택 아키텍트**입니다:

### 핵심 역할
- **10년+ 시니어 풀스택 개발자**: React Native, Node.js, 대규모 시스템 설계 전문
- **UI/UX 아키텍트**: Figma 기반 디자인 시스템 구축 및 멀티디바이스 대응 전문  
- **DevOps 엔지니어**: GitHub Actions + Jenkins 기반 CI/CD 파이프라인 설계 전문
- **보안 컨설턴트**: 엔터프라이즈급 인증/인가 시스템 설계 전문
- **성능 최적화 전문가**: 확장 가능한 아키텍처 및 성능 튜닝 전문

### 품질 기준
- **프로덕션 레디**: 실제 서비스 배포 가능한 수준
- **엔터프라이즈 그레이드**: 대기업 수준의 보안, 확장성, 안정성
- **미래 지향적**: 향후 5년간 기술 발전을 고려한 설계
- **글로벌 스탠다드**: 국제적 베스트 프랙티스 준수

---

## 🎨 UI/UX 설계 요구사항

### Figma 디자인 시스템 구축
```
디자인 시스템 구성 요소:
1. Foundation Layer
   - Color Palette (Light/Dark Theme)
   - Typography Scale (14가지 텍스트 스타일)
   - Spacing System (4pt Grid System)
   - Border Radius & Shadow System
   - Icon Library (Feather Icons 기반)

2. Component Library  
   - Atomic Design 방법론 적용
   - 32개 기본 컴포넌트 (Button, Input, Card 등)
   - 상호작용 상태별 바리에이션
   - 접근성 가이드라인 (WCAG 2.1 AA) 준수

3. Template & Layout
   - 8가지 레이아웃 템플릿 (Authentication, Dashboard 등)
   - Auto-layout 및 Constraints 활용
   - Component Override 시스템

4. Prototype & Flow
   - 사용자 여정 맵핑 (20+ 화면)
   - 마이크로 인터랙션 정의
   - 에러 상태 및 엣지 케이스 시나리오
```

### 멀티디바이스 반응형 설계
```
디바이스별 최적화 전략:

📱 Mobile First (320px ~ 768px)
   - 터치 친화적 44dp 최소 터치 영역
   - 한 손 사용성 고려한 하단 네비게이션
   - 스와이프 제스처 및 햅틱 피드백
   - 세로/가로 모드 모두 최적화

📱 Tablet (768px ~ 1024px)  
   - Split View 및 Multitasking 지원
   - 더 큰 화면을 활용한 정보 밀도 증가
   - 키보드 단축키 지원
   - Drag & Drop 인터랙션

🖥️ Desktop (1024px+)
   - 키보드 네비게이션 완전 지원
   - 호버 상태 및 툴팁 시스템
   - 컨텍스트 메뉴 지원
   - 창 크기 변경에 따른 동적 레이아웃

반응형 브레이크포인트:
- xs: 0-575px (모바일 세로)
- sm: 576-767px (모바일 가로)  
- md: 768-991px (태블릿)
- lg: 992-1199px (소형 데스크톱)
- xl: 1200px+ (대형 데스크톱)
```

---

## 📱 프론트엔드 아키텍처 (React Native + Expo + TypeScript)

### 기술 스택 및 설계 원칙
```
핵심 기술 구성:
- React Native 0.72+ with New Architecture (Fabric + TurboModules)
- Expo SDK 49+ (Development Build 활용)
- TypeScript 5.0+ (Strict Mode)
- React Navigation v6 (Type-safe navigation)
- Redux Toolkit + RTK Query (상태 관리 & 데이터 페칭)
- React Hook Form + Zod (폼 관리 & 스키마 검증)
- React Native Reanimated v3 (고성능 애니메이션)
- Expo Router (File-based routing)

아키텍처 패턴:
- Clean Architecture (Presentation → Domain → Data)
- Feature-First 폴더 구조
- Dependency Injection Pattern
- Repository Pattern (API 추상화)
- Observer Pattern (실시간 업데이트)
```

### 프로젝트 구조 (고도화)
```
apps/mobile/ (Expo 앱)
├── app/                    # Expo Router 기반 라우팅
│   ├── (auth)/            # 인증 관련 화면 그룹
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/            # 탭 네비게이션 그룹
│   │   ├── home.tsx
│   │   ├── profile.tsx
│   │   └── settings.tsx
│   ├── _layout.tsx        # 루트 레이아웃
│   └── index.tsx          # 앱 진입점
│
├── src/
│   ├── components/        # 재사용 컴포넌트
│   │   ├── ui/           # 기본 UI 컴포넌트
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.styles.ts
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   └── index.ts
│   │   ├── forms/        # 폼 관련 컴포넌트
│   │   │   ├── LoginForm/
│   │   │   ├── RegisterForm/
│   │   │   └── index.ts
│   │   └── layout/       # 레이아웃 컴포넌트
│   │       ├── SafeAreaWrapper/
│   │       ├── KeyboardAvoidingWrapper/
│   │       └── index.ts
│   │
│   ├── features/          # 기능별 모듈
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── user/
│   │   └── dashboard/
│   │
│   ├── shared/           # 공통 모듈
│   │   ├── api/          # API 클라이언트
│   │   │   ├── client.ts
│   │   │   ├── interceptors.ts
│   │   │   └── endpoints.ts
│   │   ├── hooks/        # 공통 훅
│   │   │   ├── useAuth.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   └── index.ts
│   │   ├── utils/        # 유틸리티
│   │   │   ├── validation.ts
│   │   │   ├── formatters.ts
│   │   │   ├── constants.ts
│   │   │   └── helpers.ts
│   │   ├── types/        # 글로벌 타입
│   │   │   ├── api.types.ts
│   │   │   ├── auth.types.ts
│   │   │   └── index.ts
│   │   └── styles/       # 글로벌 스타일
│   │       ├── theme.ts
│   │       ├── colors.ts
│   │       ├── typography.ts
│   │       └── index.ts
│   │
│   └── store/            # Redux 상태 관리
│       ├── slices/
│       │   ├── authSlice.ts
│       │   ├── userSlice.ts
│       │   └── index.ts
│       ├── api/          # RTK Query API
│       │   ├── authApi.ts
│       │   ├── userApi.ts
│       │   └── index.ts
│       ├── middleware/
│       └── store.ts
│
├── assets/               # 정적 리소스
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── lottie/          # Lottie 애니메이션
│
├── __tests__/           # 테스트 파일
│   ├── components/
│   ├── features/
│   ├── utils/
│   └── setup.ts
│
├── docs/                # 문서
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
│
├── app.json            # Expo 설정
├── babel.config.js     # Babel 설정
├── metro.config.js     # Metro 번들러 설정
├── tsconfig.json       # TypeScript 설정
├── jest.config.js      # Jest 설정
├── .eslintrc.js        # ESLint 설정
├── .prettierrc.js      # Prettier 설정
└── eas.json           # EAS Build 설정
```

### 고급 기능 구현 요구사항
```
🔐 인증 & 보안
- Biometric Authentication (지문, 얼굴 인식)
- Multi-Factor Authentication (2FA/MFA)
- Device Trust & Device Fingerprinting
- Session Management (다중 디바이스 세션)
- Auto-logout on Background (보안 설정)
- Certificate Pinning (API 통신 보안)

🚀 성능 최적화  
- Image Optimization (WebP, 지연 로딩)
- Bundle Splitting & Code Splitting
- Memoization 전략 (React.memo, useMemo, useCallback)
- Virtual Lists (대용량 데이터)
- Background Tasks (Background Sync)
- Offline First Architecture

🎯 사용자 경험
- Skeleton Loading States
- Pull-to-Refresh 패턴
- Infinite Scrolling
- Haptic Feedback 시스템
- Voice Over & Screen Reader 지원
- 다국어 지원 (i18n) - 10개 언어
- Real-time Notifications (Push, In-app)

🔧 개발자 경험
- Hot Reloading & Fast Refresh
- TypeScript Strict Mode
- ESLint + Prettier + Husky 통합
- Storybook (컴포넌트 문서화)
- Detox E2E Testing
- Flipper 디버깅 도구 연동
```

---

## ⚡ 백엔드 아키텍처 (Node.js + Express + TypeScript)

### 아키텍처 설계 원칙
```
🏗️ 아키텍처 패턴:
- Hexagonal Architecture (Port & Adapters)
- Domain-Driven Design (DDD)
- CQRS (Command Query Responsibility Segregation)
- Event-Driven Architecture
- Microservice Ready Monolith

🛡️ 보안 아키텍처:
- OAuth 2.0 + OpenID Connect
- JWT with RSA256 Signing
- Rate Limiting (Redis-based)
- RBAC (Role-Based Access Control)
- API Gateway Pattern
- Request/Response Encryption (AES-256)

📊 성능 아키텍처:
- Multi-layer Caching (Memory, Redis, CDN)
- Database Query Optimization
- Connection Pooling
- Asynchronous Processing (Bull Queue)
- Horizontal Scaling Ready
- Health Check & Circuit Breaker Pattern
```

### 프로젝트 구조 (엔터프라이즈급)
```
apps/api/ (Express 백엔드)
├── src/
│   ├── domain/           # 도메인 레이어 (비즈니스 로직)
│   │   ├── entities/     # 도메인 엔티티
│   │   │   ├── User.ts
│   │   │   ├── Auth.ts
│   │   │   └── index.ts
│   │   ├── repositories/ # 리포지토리 인터페이스
│   │   │   ├── IUserRepository.ts
│   │   │   ├── IAuthRepository.ts
│   │   │   └── index.ts
│   │   ├── services/     # 도메인 서비스
│   │   │   ├── AuthService.ts
│   │   │   ├── UserService.ts
│   │   │   └── index.ts
│   │   └── events/       # 도메인 이벤트
│   │       ├── UserCreatedEvent.ts
│   │       ├── LoginAttemptEvent.ts
│   │       └── index.ts
│   │
│   ├── application/      # 애플리케이션 레이어 (유스케이스)
│   │   ├── commands/     # Command 패턴
│   │   │   ├── auth/
│   │   │   │   ├── LoginCommand.ts
│   │   │   │   ├── RegisterCommand.ts
│   │   │   │   └── index.ts
│   │   │   └── user/
│   │   ├── queries/      # Query 패턴
│   │   │   ├── auth/
│   │   │   └── user/
│   │   ├── handlers/     # Command/Query 핸들러
│   │   │   ├── auth/
│   │   │   └── user/
│   │   └── validators/   # 입력값 검증
│   │       ├── AuthValidators.ts
│   │       ├── UserValidators.ts
│   │       └── index.ts
│   │
│   ├── infrastructure/   # 인프라스트럭처 레이어
│   │   ├── database/     # 데이터베이스 관련
│   │   │   ├── migrations/
│   │   │   ├── seeders/
│   │   │   ├── repositories/
│   │   │   │   ├── UserRepository.ts
│   │   │   │   ├── AuthRepository.ts
│   │   │   │   └── index.ts
│   │   │   ├── models/   # ORM 모델
│   │   │   │   ├── User.model.ts
│   │   │   │   ├── Session.model.ts
│   │   │   │   └── index.ts
│   │   │   └── connection.ts
│   │   ├── cache/        # 캐시 레이어
│   │   │   ├── RedisClient.ts
│   │   │   ├── CacheService.ts
│   │   │   └── index.ts
│   │   ├── queue/        # 작업 큐
│   │   │   ├── EmailQueue.ts
│   │   │   ├── NotificationQueue.ts
│   │   │   └── index.ts
│   │   ├── external/     # 외부 서비스 연동
│   │   │   ├── EmailService.ts
│   │   │   ├── SMSService.ts
│   │   │   ├── PushNotificationService.ts
│   │   │   └── index.ts
│   │   └── security/     # 보안 관련
│   │       ├── JWTService.ts
│   │       ├── EncryptionService.ts
│   │       ├── HashingService.ts
│   │       └── index.ts
│   │
│   ├── presentation/     # 프레젠테이션 레이어
│   │   ├── controllers/  # 컨트롤러
│   │   │   ├── AuthController.ts
│   │   │   ├── UserController.ts
│   │   │   ├── HealthController.ts
│   │   │   └── index.ts
│   │   ├── routes/       # 라우터
│   │   │   ├── auth.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── health.routes.ts
│   │   │   └── index.ts
│   │   ├── middlewares/  # 미들웨어
│   │   │   ├── auth.middleware.ts
│   │   │   ├── validation.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   ├── rate-limiting.middleware.ts
│   │   │   ├── cors.middleware.ts
│   │   │   └── index.ts
│   │   └── dto/          # 데이터 전송 객체
│   │       ├── auth/
│   │       │   ├── LoginDto.ts
│   │       │   ├── RegisterDto.ts
│   │       │   └── index.ts
│   │       └── user/
│   │
│   ├── shared/           # 공통 모듈
│   │   ├── config/       # 설정 관리
│   │   │   ├── database.config.ts
│   │   │   ├── redis.config.ts
│   │   │   ├── jwt.config.ts
│   │   │   ├── email.config.ts
│   │   │   └── index.ts
│   │   ├── constants/    # 상수 정의
│   │   │   ├── errors.constants.ts
│   │   │   ├── messages.constants.ts
│   │   │   ├── roles.constants.ts
│   │   │   └── index.ts
│   │   ├── types/        # 타입 정의
│   │   │   ├── api.types.ts
│   │   │   ├── auth.types.ts
│   │   │   ├── user.types.ts
│   │   │   └── index.ts
│   │   ├── utils/        # 유틸리티
│   │   │   ├── logger.util.ts
│   │   │   ├── validator.util.ts
│   │   │   ├── crypto.util.ts
│   │   │   └── index.ts
│   │   └── exceptions/   # 커스텀 예외
│   │       ├── BaseException.ts
│   │       ├── ValidationException.ts
│   │       ├── AuthenticationException.ts
│   │       └── index.ts
│   │
│   ├── app.ts           # Express 애플리케이션 설정
│   └── server.ts        # 서버 실행 파일
│
├── __tests__/           # 테스트 파일
│   ├── unit/           # 유닛 테스트
│   ├── integration/    # 통합 테스트
│   ├── e2e/           # E2E 테스트
│   ├── fixtures/      # 테스트 데이터
│   └── setup.ts       # 테스트 설정
│
├── docs/               # API 문서
│   ├── swagger/       # Swagger 문서
│   ├── postman/      # Postman 컬렉션
│   └── architecture/ # 아키텍처 다이어그램
│
├── scripts/           # 스크립트
│   ├── build.sh
│   ├── deploy.sh
│   ├── migration.sh
│   └── seed.sh
│
├── docker/           # Docker 관련
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── docker-compose.prod.yml
│   └── .dockerignore
│
├── .env.example      # 환경변수 예제
├── tsconfig.json     # TypeScript 설정
├── jest.config.js    # Jest 설정
├── .eslintrc.js      # ESLint 설정
├── .prettierrc.js    # Prettier 설정
└── package.json      # 패키지 설정
```

### API 설계 명세 (RESTful + GraphQL Hybrid)
```
🔌 인증 API 엔드포인트:
POST   /api/v1/auth/register          # 회원가입
POST   /api/v1/auth/login             # 로그인  
POST   /api/v1/auth/logout            # 로그아웃
POST   /api/v1/auth/refresh           # 토큰 갱신
POST   /api/v1/auth/forgot-password   # 비밀번호 재설정 요청
POST   /api/v1/auth/reset-password    # 비밀번호 재설정
POST   /api/v1/auth/verify-email      # 이메일 인증
POST   /api/v1/auth/resend-verification # 인증 메일 재전송

🔐 MFA (Multi-Factor Auth) API:
POST   /api/v1/auth/mfa/setup         # MFA 설정
POST   /api/v1/auth/mfa/verify        # MFA 인증
POST   /api/v1/auth/mfa/backup-codes  # 백업 코드 생성
DELETE /api/v1/auth/mfa/disable       # MFA 비활성화

👤 사용자 관리 API:
GET    /api/v1/users/me              # 내 정보 조회
PUT    /api/v1/users/me              # 내 정보 수정
DELETE /api/v1/users/me              # 계정 삭제
GET    /api/v1/users/me/sessions     # 활성 세션 조회
DELETE /api/v1/users/me/sessions/:id # 특정 세션 종료
POST   /api/v1/users/me/change-password # 비밀번호 변경
POST   /api/v1/users/me/upload-avatar   # 프로필 이미지 업로드

🔍 관리자 API:
GET    /api/v1/admin/users           # 사용자 목록 (페이징)
GET    /api/v1/admin/users/:id       # 특정 사용자 조회
PUT    /api/v1/admin/users/:id       # 사용자 정보 수정
DELETE /api/v1/admin/users/:id       # 사용자 계정 삭제
POST   /api/v1/admin/users/:id/lock  # 계정 잠금
POST   /api/v1/admin/users/:id/unlock # 계정 잠금 해제

📊 분석 & 로깅 API:
GET    /api/v1/analytics/login-stats  # 로그인 통계
GET    /api/v1/analytics/user-activity # 사용자 활동 통계
GET    /api/v1/logs/audit            # 감사 로그
GET    /api/v1/health                # 헬스체크
GET    /api/v1/metrics               # 성능 메트릭

응답 형식 표준화:
{
  "success": boolean,
  "message": string,
  "data": any,
  "meta": {
    "timestamp": string,
    "requestId": string,
    "pagination": { // 필요한 경우
      "page": number,
      "limit": number,
      "total": number
    }
  },
  "errors": [ // 에러 발생 시
    {
      "field": string,
      "message": string,
      "code": string
    }
  ]
}
```

---

## 🗄️ 데이터베이스 설계 (MySQL 8.0+)

### ERD 및 테이블 설계
```sql
-- 사용자 테이블 (핵심 테이블)
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    uuid CHAR(36) UNIQUE NOT NULL DEFAULT (UUID()),
    email VARCHAR(320) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    username VARCHAR(50) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    phone_verified_at TIMESTAMP NULL,
    avatar_url VARCHAR(500),
    birth_date DATE,
    gender ENUM('male', 'female', 'other', 'prefer_not_to_say'),
    language_code CHAR(5) DEFAULT 'ko-KR',
    timezone VARCHAR(50) DEFAULT 'Asia/Seoul',
    status ENUM('active', 'inactive', 'suspended', 'pending') DEFAULT 'pending',
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(32),
    backup_codes JSON,
    last_login_at TIMESTAMP NULL,
    last_login_ip VARCHAR(45),
    login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP NULL,
    password_changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    terms_accepted_at TIMESTAMP,
    privacy_accepted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_last_login_at (last_login_at),
    INDEX idx_deleted_at (deleted_at)
);

-- 사용자 세션 테이블
CREATE TABLE user_sessions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    refresh_token VARCHAR(255) UNIQUE NOT NULL,
    device_id VARCHAR(100),
    device_name VARCHAR(200),
    device_type ENUM('mobile', 'tablet', 'desktop', 'unknown') DEFAULT 'unknown',
    platform VARCHAR(50),
    browser VARCHAR(100),
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    location_country CHAR(2),
    location_city VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP NOT NULL,
    last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_session_token (session_token),
    INDEX idx_refresh_token (refresh_token),
    INDEX idx_expires_at (expires_at),
    INDEX idx_is_active (is_active),
    INDEX idx_last_activity_at (last_activity_at)
);

-- 역할 및 권한 테이블 (RBAC)
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    display_name VARCHAR(150) NOT NULL,
    description TEXT,
    resource VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role_permissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id INT NOT NULL,
    assigned_by BIGINT,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_expires_at (expires_at)
);

-- 감사 로그 테이블
CREATE TABLE audit_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(100),
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    session_id BIGINT,
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (session_id) REFERENCES user_sessions(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_resource_type (resource_type),
    INDEX idx_created_at (created_at),
    INDEX idx_success (success)
);

-- 이메일 인증 토큰 테이블
CREATE TABLE email_verification_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(320) NOT NULL,
    type ENUM('registration', 'email_change', 'password_reset') NOT NULL,
    used_at TIMESTAMP NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_expires_at (expires_at)
);

-- 로그인 시도 로그 테이블
CREATE TABLE login_attempts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(320) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    success BOOLEAN NOT NULL,
    failure_reason ENUM('invalid_credentials', 'account_locked', 'account_suspended', 'email_not_verified', 'mfa_failed') NULL,
    user_id BIGINT NULL,
    session_id BIGINT NULL,
    country_code CHAR(2),
    city VARCHAR(100),
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (session_id) REFERENCES user_sessions(id) ON DELETE SET NULL,
    INDEX idx_email (email),
    INDEX idx_ip_address (ip_address),
    INDEX idx_success (success),
    INDEX idx_attempted_at (attempted_at),
    INDEX idx_user_id (user_id)
);

-- 사용자 활동 로그 테이블
CREATE TABLE user_activity_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    session_id BIGINT,
    activity_type VARCHAR(50) NOT NULL,
    activity_details JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES user_sessions(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_session_id (session_id),
    INDEX idx_activity_type (activity_type),
    INDEX idx_created_at (created_at)
);

-- 푸시 알림 토큰 테이블
CREATE TABLE push_notification_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    device_id VARCHAR(100) NOT NULL,
    platform ENUM('ios', 'android', 'web') NOT NULL,
    token VARCHAR(500) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_device (user_id, device_id),
    INDEX idx_user_id (user_id),
    INDEX idx_platform (platform),
    INDEX idx_is_active (is_active)
);

-- 시스템 설정 테이블
CREATE TABLE system_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    updated_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_setting_key (setting_key),
    INDEX idx_is_public (is_public)
);

-- 기본 데이터 삽입
INSERT INTO roles (name, display_name, description, is_system) VALUES
('super_admin', '최고 관리자', '시스템 전체 권한', TRUE),
('admin', '관리자', '사용자 관리 권한', TRUE),
('user', '일반 사용자', '기본 사용자 권한', TRUE);

INSERT INTO permissions (name, display_name, description, resource, action) VALUES
('users.create', '사용자 생성', '새 사용자 계정 생성', 'users', 'create'),
('users.read', '사용자 조회', '사용자 정보 조회', 'users', 'read'),
('users.update', '사용자 수정', '사용자 정보 수정', 'users', 'update'),
('users.delete', '사용자 삭제', '사용자 계정 삭제', 'users', 'delete'),
('users.manage', '사용자 관리', '사용자 계정 관리 (잠금/해제)', 'users', 'manage'),
('auth.login', '로그인', '시스템 로그인', 'auth', 'login'),
('auth.logout', '로그아웃', '시스템 로그아웃', 'auth', 'logout'),
('profile.read', '프로필 조회', '자신의 프로필 조회', 'profile', 'read'),
('profile.update', '프로필 수정', '자신의 프로필 수정', 'profile', 'update');

-- 역할별 권한 할당
INSERT INTO role_permissions (role_id, permission_id) 
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'super_admin'; -- 슈퍼 관리자는 모든 권한

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'admin' AND p.name IN ('users.read', 'users.update', 'users.manage', 'auth.login', 'auth.logout', 'profile.read', 'profile.update');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'user' AND p.name IN ('auth.login', 'auth.logout', 'profile.read', 'profile.update');

-- 인덱스 최적화를 위한 복합 인덱스
CREATE INDEX idx_users_email_status ON users(email, status);
CREATE INDEX idx_users_status_created ON users(status, created_at);
CREATE INDEX idx_sessions_user_active ON user_sessions(user_id, is_active, expires_at);
CREATE INDEX idx_audit_user_action_created ON audit_logs(user_id, action, created_at);
CREATE INDEX idx_login_attempts_email_ip_time ON login_attempts(email, ip_address, attempted_at);
```

### 데이터베이스 최적화 전략
```
🚀 성능 최적화:
- InnoDB 엔진 사용 (트랜잭션 지원)
- 적절한 인덱스 설계 (단일 + 복합 인덱스)
- 파티셔닝 전략 (월별 로그 테이블 파티션)
- 쿼리 최적화 (EXPLAIN 분석)
- 커넥션 풀 설정 (최대 연결 수 제한)

🔒 보안 강화:
- 데이터 암호화 (AES-256)
- 개인정보 마스킹 (전화번호, 이메일 부분 마스킹)
- 데이터 익명화 (통계 목적)
- 정기적 백업 및 복구 테스트
- 접근 권한 최소화 원칙

📊 모니터링 및 분석:
- Slow Query 로깅
- 성능 메트릭 수집 (Prometheus + Grafana)
- 데이터베이스 상태 모니터링
- 자동 알림 시스템 (임계치 도달 시)
```

---

## 🚀 CI/CD 파이프라인 (GitHub + Jenkins)

### GitHub Actions 워크플로우
```yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

env:
  NODE_VERSION: '18.x'
  MYSQL_VERSION: '8.0'

jobs:
  # 프론트엔드 빌드 및 테스트
  frontend-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./apps/mobile
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        cache-dependency-path: './apps/mobile/package-lock.json'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Type checking
      run: npm run type-check
    
    - name: Linting
      run: npm run lint
    
    - name: Unit tests
      run: npm run test:unit
    
    - name: Build
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v4
      with:
        name: mobile-build
        path: ./apps/mobile/dist
        retention-days: 1

  # 백엔드 빌드 및 테스트
  backend-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./apps/api
    
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: password
          MYSQL_DATABASE: test_db
        ports:
          - 3306:3306
        options: --health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3
      
      redis:
        image: redis:alpine
        ports:
          - 6379:6379
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        cache-dependency-path: './apps/api/package-lock.json'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Type checking
      run: npm run type-check
    
    - name: Linting
      run: npm run lint
    
    - name: Database migration
      run: npm run migrate:test
      env:
        DATABASE_URL: mysql://root:password@localhost:3306/test_db
    
    - name: Unit tests
      run: npm run test:unit
      env:
        DATABASE_URL: mysql://root:password@localhost:3306/test_db
        REDIS_URL: redis://localhost:6379
    
    - name: Integration tests
      run: npm run test:integration
      env:
        DATABASE_URL: mysql://root:password@localhost:3306/test_db
        REDIS_URL: redis://localhost:6379
    
    - name: E2E tests
      run: npm run test:e2e
      env:
        DATABASE_URL: mysql://root:password@localhost:3306/test_db
        REDIS_URL: redis://localhost:6379
    
    - name: Build
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v4
      with:
        name: api-build
        path: ./apps/api/dist
        retention-days: 1

  # 보안 스캔
  security-scan:
    runs-on: ubuntu-latest
    needs: [frontend-test, backend-test]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        scan-type: 'fs'
        scan-ref: '.'
        format: 'sarif'
        output: 'trivy-results.sarif'
    
    - name: Upload Trivy scan results
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'
    
    - name: OWASP Dependency Check
      uses: dependency-check/Dependency-Check_Action@main
      with:
        project: 'login-app'
        path: '.'
        format: 'JSON'
    
    - name: Upload dependency check results
      uses: actions/upload-artifact@v4
      with:
        name: dependency-check-report
        path: reports

  # 코드 품질 분석
  code-quality:
    runs-on: ubuntu-latest
    needs: [frontend-test, backend-test]
    
    steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
    
    - name: SonarCloud Scan
      uses: SonarSource/sonarcloud-github-action@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

  # Docker 이미지 빌드 (main 브랜치만)
  docker-build:
    runs-on: ubuntu-latest
    needs: [frontend-test, backend-test, security-scan, code-quality]
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
    
    - name: Login to DockerHub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}
    
    - name: Build and push API image
      uses: docker/build-push-action@v5
      with:
        context: ./apps/api
        push: true
        tags: |
          ${{ secrets.DOCKERHUB_USERNAME }}/login-app-api:latest
          ${{ secrets.DOCKERHUB_USERNAME }}/login-app-api:${{ github.sha }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
    
    - name: Build and push Mobile image (for web build)
      uses: docker/build-push-action@v5
      with:
        context: ./apps/mobile
        push: true
        tags: |
          ${{ secrets.DOCKERHUB_USERNAME }}/login-app-mobile:latest
          ${{ secrets.DOCKERHUB_USERNAME }}/login-app-mobile:${{ github.sha }}
        cache-from: type=gha
        cache-to: type=gha,mode=max

  # Jenkins 트리거
  trigger-jenkins:
    runs-on: ubuntu-latest
    needs: [docker-build]
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Trigger Jenkins Deploy Pipeline
      run: |
        curl -X POST \
          ${{ secrets.JENKINS_URL }}/job/deploy-login-app/build \
          --user ${{ secrets.JENKINS_USER }}:${{ secrets.JENKINS_TOKEN }} \
          --data-urlencode json='{"parameter": [{"name":"GIT_COMMIT", "value":"${{ github.sha }}"}]}'
```

### Jenkins 파이프라인 스크립트
```groovy
// Jenkinsfile
pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = credentials('dockerhub-registry')
        KUBECONFIG = credentials('k8s-kubeconfig')
        SLACK_CHANNEL = '#deployments'
        APP_NAME = 'login-app'
    }
    
    parameters {
        string(name: 'GIT_COMMIT', defaultValue: 'latest', description: 'Git commit SHA to deploy')
        choice(name: 'ENVIRONMENT', choices: ['staging', 'production'], description: 'Deployment environment')
        booleanParam(name: 'SKIP_TESTS', defaultValue: false, description: 'Skip deployment tests')
    }
    
    stages {
        stage('Preparation') {
            steps {
                script {
                    // 환경별 설정 로드
                    if (params.ENVIRONMENT == 'production') {
                        env.NAMESPACE = 'login-app-prod'
                        env.REPLICAS = '3'
                        env.RESOURCES_CPU = '500m'
                        env.RESOURCES_MEMORY = '1Gi'
                    } else {
                        env.NAMESPACE = 'login-app-staging'
                        env.REPLICAS = '1'
                        env.RESOURCES_CPU = '200m'
                        env.RESOURCES_MEMORY = '512Mi'
                    }
                }
                
                // Slack 알림 - 배포 시작
                slackSend(
                    channel: env.SLACK_CHANNEL,
                    color: 'warning',
                    message: ":rocket: 배포 시작 - ${env.APP_NAME} to ${params.ENVIRONMENT}\nCommit: ${params.GIT_COMMIT}\nEnvironment: ${params.ENVIRONMENT}"
                )
            }
        }
        
        stage('Pre-deployment Checks') {
            steps {
                script {
                    // 쿠버네티스 클러스터 연결 확인
                    sh 'kubectl cluster-info'
                    
                    // 네임스페이스 존재 확인 및 생성
                    sh """
                        kubectl create namespace ${env.NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -
                    """
                    
                    // 데이터베이스 연결 확인
                    sh """
                        kubectl run db-test --rm -i --restart=Never --image=mysql:8.0-client \
                        --env="MYSQL_PWD=\${DB_PASSWORD}" \
                        -- mysql -h \${DB_HOST} -u \${DB_USER} -e "SELECT 1"
                    """
                }
            }
        }
        
        stage('Database Migration') {
            when {
                expression { params.ENVIRONMENT == 'production' }
            }
            steps {
                script {
                    // 데이터베이스 백업
                    sh """
                        kubectl create job db-backup-\${BUILD_NUMBER} --from=cronjob/db-backup -n ${env.NAMESPACE}
                        kubectl wait --for=condition=complete job/db-backup-\${BUILD_NUMBER} -n ${env.NAMESPACE} --timeout=600s
                    """
                    
                    // 마이그레이션 실행
                    sh """
                        kubectl run migration-\${BUILD_NUMBER} --rm -i --restart=Never \
                        --image=\${DOCKER_REGISTRY}/login-app-api:${params.GIT_COMMIT} \
                        --env-from=configmap/api-config \
                        --env-from=secret/api-secrets \
                        -n ${env.NAMESPACE} \
                        -- npm run migrate:prod
                    """
                }
            }
        }
        
        stage('Deploy API') {
            steps {
                script {
                    // Helm 배포 또는 kubectl 적용
                    sh """
                        helm upgrade --install ${env.APP_NAME}-api ./k8s/helm/api \
                        --namespace ${env.NAMESPACE} \
                        --set image.tag=${params.GIT_COMMIT} \
                        --set replicaCount=${env.REPLICAS} \
                        --set resources.requests.cpu=${env.RESOURCES_CPU} \
                        --set resources.requests.memory=${env.RESOURCES_MEMORY} \
                        --set environment=${params.ENVIRONMENT} \
                        --wait --timeout=600s
                    """
                }
            }
        }
        
        stage('Deploy Mobile Web') {
            steps {
                script {
                    sh """
                        helm upgrade --install ${env.APP_NAME}-web ./k8s/helm/web \
                        --namespace ${env.NAMESPACE} \
                        --set image.tag=${params.GIT_COMMIT} \
                        --set replicaCount=${env.REPLICAS} \
                        --set environment=${params.ENVIRONMENT} \
                        --wait --timeout=600s
                    """
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    // API 헬스 체크
                    sh """
                        kubectl wait --for=condition=available deployment/${env.APP_NAME}-api -n ${env.NAMESPACE} --timeout=300s
                    """
                    
                    // 서비스 엔드포인트 테스트
                    sh """
                        kubectl run health-check --rm -i --restart=Never --image=curlimages/curl \
                        -n ${env.NAMESPACE} \
                        -- curl -f http://${env.APP_NAME}-api.${env.NAMESPACE}.svc.cluster.local:3000/api/v1/health
                    """
                }
            }
        }
        
        stage('Smoke Tests') {
            when {
                not { params.SKIP_TESTS }
            }
            steps {
                script {
                    // API 스모크 테스트 실행
                    sh """
                        kubectl run smoke-tests --rm -i --restart=Never \
                        --image=\${DOCKER_REGISTRY}/login-app-api:${params.GIT_COMMIT} \
                        --env-from=configmap/test-config \
                        -n ${env.NAMESPACE} \
                        -- npm run test:smoke
                    """
                }
            }
        }
        
        stage('Performance Tests') {
            when {
                expression { params.ENVIRONMENT == 'staging' }
            }
            steps {
                script {
                    // K6 성능 테스트
                    sh """
                        kubectl run perf-test --rm -i --restart=Never \
                        --image=grafana/k6 \
                        -n ${env.NAMESPACE} \
                        -- run -e API_URL=http://${env.APP_NAME}-api.${env.NAMESPACE}.svc.cluster.local:3000 \
                        /scripts/performance-test.js
                    """
                }
            }
        }
        
        stage('Update Mobile App') {
            when {
                expression { params.ENVIRONMENT == 'production' }
            }
            steps {
                script {
                    // EAS Build 트리거 (React Native)
                    sh """
                        npx eas-cli build --platform all --non-interactive \
                        --build-number ${BUILD_NUMBER} \
                        --git-commit-hash ${params.GIT_COMMIT}
                    """
                    
                    // 앱스토어 배포 (자동 또는 수동)
                    sh """
                        npx eas-cli submit --platform all --non-interactive \
                        --wait
                    """
                }
            }
        }
        
        stage('Monitoring Setup') {
            steps {
                script {
                    // Prometheus 모니터링 설정
                    sh """
                        kubectl apply -f ./k8s/monitoring/servicemonitor.yaml -n ${env.NAMESPACE}
                    """
                    
                    // Grafana 대시보드 업데이트
                    sh """
                        curl -X POST \$GRAFANA_URL/api/dashboards/db \
                        -H "Authorization: Bearer \$GRAFANA_TOKEN" \
                        -H "Content-Type: application/json" \
                        -d @./monitoring/grafana-dashboard.json
                    """
                }
            }
        }
    }
    
    post {
        success {
            script {
                // 성공 알림
                slackSend(
                    channel: env.SLACK_CHANNEL,
                    color: 'good',
                    message: ":white_check_mark: 배포 성공! ${env.APP_NAME} to ${params.ENVIRONMENT}\nCommit: ${params.GIT_COMMIT}\nBuild: ${env.BUILD_URL}"
                )
                
                // JIRA 티켓 업데이트 (선택사항)
                // jiraAddComment site: 'your-jira', idOrKey: env.CHANGE_ID, comment: "Deployed to ${params.ENVIRONMENT}"
            }
        }
        
        failure {
            script {
                // 실패 알림
                slackSend(
                    channel: env.SLACK_CHANNEL,
                    color: 'danger',
                    message: ":x: 배포 실패! ${env.APP_NAME} to ${params.ENVIRONMENT}\nCommit: ${params.GIT_COMMIT}\nBuild: ${env.BUILD_URL}\n에러 로그를 확인해주세요."
                )
                
                // 자동 롤백 (프로덕션 환경)
                if (params.ENVIRONMENT == 'production') {
                    sh """
                        helm rollback ${env.APP_NAME}-api -n ${env.NAMESPACE}
                        helm rollback ${env.APP_NAME}-web -n ${env.NAMESPACE}
                    """
                }
            }
        }
        
        always {
            // 리소스 정리
            sh """
                kubectl delete pod --field-selector=status.phase==Succeeded -n ${env.NAMESPACE}
                kubectl delete pod --field-selector=status.phase==Failed -n ${env.NAMESPACE}
            """
            
            // 배포 메트릭 수집
            script {
                def deploymentMetrics = [
                    environment: params.ENVIRONMENT,
                    commit: params.GIT_COMMIT,
                    buildNumber: env.BUILD_NUMBER,
                    duration: currentBuild.durationString,
                    result: currentBuild.currentResult
                ]
                
                // InfluxDB에 메트릭 전송 (선택사항)
                // influxDbPublisher selectedTarget: 'deployment-metrics', customData: deploymentMetrics
            }
        }
    }
}
```

---

## 📊 모니터링 및 관찰가능성 (Observability)

### 메트릭 수집 전략
```
🔍 애플리케이션 메트릭:
- 비즈니스 메트릭: 회원가입율, 로그인 성공률, 일일 활성 사용자
- 성능 메트릭: 응답시간, 처리량, 에러율
- 인프라 메트릭: CPU, 메모리, 디스크, 네트워크 사용률
- 보안 메트릭: 로그인 실패율, 비정상적 접근 시도

📈 대시보드 구성:
1. Executive Dashboard (경영진용)
   - 핵심 비즈니스 지표
   - 사용자 증가 추이
   - 시스템 안정성 지표

2. Operations Dashboard (운영팀용)  
   - 시스템 상태 개요
   - 알람 및 인시던트 상태
   - 성능 트렌드

3. Development Dashboard (개발팀용)
   - 배포 상태
   - 에러 추적
   - 성능 프로파일링

🚨 알림 정책:
- Critical: 시스템 다운, 데이터베이스 연결 실패
- Warning: 높은 응답시간, 디스크 사용률 80% 초과  
- Info: 새로운 배포, 정기 백업 완료
```

---

## 🎯 성공 기준 및 KPI

### 기술적 KPI
```
📊 성능 지표:
- API 응답시간: P95 < 200ms
- 모바일 앱 시작시간: < 2초
- 데이터베이스 쿼리 시간: P95 < 50ms
- 시스템 가용성: 99.9% 이상

🔒 보안 지표:
- 보안 취약점: Critical 0개, High 0개
- 침투 테스트 통과율: 100%
- 데이터 유출 사고: 0건
- 준수 점검 통과율: 100%

🚀 개발 효율성:
- 배포 빈도: 주 2회 이상
- 배포 성공률: 95% 이상
- 평균 복구 시간: < 30분
- 코드 커버리지: 80% 이상
```

### 비즈니스 KPI  
```
👥 사용자 지표:
- 회원가입 전환율: 15% 이상
- 로그인 성공률: 98% 이상  
- 일일 활성 사용자(DAU): 목표치 달성
- 사용자 유지율: 30일 70% 이상

📱 앱 품질 지표:
- 앱 크래시율: < 0.1%
- 앱스토어 평점: 4.5점 이상
- 앱 로딩 시간: < 3초
- 사용자 만족도: 85% 이상

💰 비즈니스 성과:
- 사용자 확보 비용(CAC): 목표 대비 달성
- 사용자 생애 가치(LTV): CAC 대비 3:1 이상
- 매출 기여도: 전년 대비 증가
- 마케팅 전환율: 채널별 목표 달성
```

---

## 🔧 개발 및 운영 가이드라인

### 개발 워크플로우
```
🔄 Git 브랜칭 전략 (GitFlow):
- main: 프로덕션 배포 브랜치
- develop: 개발 통합 브랜치  
- feature/*: 기능 개발 브랜치
- release/*: 릴리즈 준비 브랜치
- hotfix/*: 긴급 수정 브랜치

📝 코드 리뷰 프로세스:
1. Feature 브랜치에서 개발 완료
2. Pull Request 생성 (템플릿 사용)
3. 자동 테스트 및 코드 품질 검사 통과
4. 최소 2명의 시니어 개발자 승인
5. Squash & Merge로 develop에 병합
6. 자동 배포 (스테이징 환경)

🧪 테스팅 전략:
- Unit Tests: 개별 함수/클래스 테스트 (80% 커버리지)
- Integration Tests: API 엔드포인트 테스트
- E2E Tests: 사용자 시나리오 테스트  
- Performance Tests: 부하 및 스트레스 테스트
- Security Tests: 보안 취약점 스캔
- Accessibility Tests: 접근성 자동 테스트

📦 릴리즈 관리:
- Semantic Versioning (MAJOR.MINOR.PATCH)
- 릴리즈 노트 자동 생성
- 변경사항 추적 및 문서화
- 롤백 계획 수립
- A/B 테스트 통한 점진적 배포
```

### 운영 및 유지보수
```
🔍 모니터링 체크리스트:
- [ ] 시스템 리소스 사용률 정상
- [ ] API 응답시간 임계치 내
- [ ] 데이터베이스 연결 상태 정상
- [ ] 에러율 허용 범위 내
- [ ] 보안 이벤트 모니터링
- [ ] 백업 상태 정상
- [ ] SSL 인증서 만료일 확인

🚨 인시던트 대응 절차:
1. 알림 수신 및 우선순위 분류
2. 온콜 엔지니어 배정 및 조사 시작
3. 임시 조치 적용 (서비스 복구)
4. 근본 원인 분석 및 영구 수정
5. 포스트모템 작성 및 개선책 도출
6. 문서 업데이트 및 팀 공유

📋 정기 유지보수:
- 일일: 로그 확인, 시스템 상태 점검
- 주간: 보안 패치 적용, 성능 분석
- 월간: 백업 복구 테스트, 용량 계획
- 분기: 재해복구 훈련, 보안 감사
- 반기: 아키텍처 리뷰, 기술 부채 해결
```

---

## 🚀 미래 확장 계획

### 단계별 로드맵
```
🎯 Phase 1 (MVP - 3개월):
- 기본 회원가입/로그인 기능
- 모바일 앱 (iOS/Android) 출시
- 기본 관리자 패널
- CI/CD 파이프라인 구축

🔥 Phase 2 (Enhanced - 6개월):
- 소셜 로그인 연동 (Google, Apple, Facebook)
- 다중 인증(MFA) 구현
- 고급 사용자 분석
- 실시간 알림 시스템
- API 버전 관리

🌟 Phase 3 (Advanced - 12개월):
- 마이크로서비스 아키텍처 전환
- GraphQL API 도입
- AI/ML 기반 사용자 행동 분석
- 글로벌 CDN 및 다중 리전 지원
- 블록체인 기반 신원 인증 (선택사항)

🚀 Phase 4 (Enterprise - 18개월):
- Kubernetes 네이티브 아키텍처
- 서비스 메시 (Istio) 도입
- 제로 트러스트 보안 모델
- 완전 자동화된 GitOps
- 컨테이너 네이티브 개발 환경
```

### 기술 진화 계획
```
📱 프론트엔드 진화:
- React Native → Expo SDK 업그레이드
- Web3 지갑 연동 준비
- AR/VR 인터페이스 실험
- 음성 인터페이스 통합
- Progressive Web App (PWA) 지원

⚡ 백엔드 진화:  
- Node.js → Deno 2.0 마이그레이션 고려
- REST API → GraphQL Federation
- 이벤트 소싱 아키텍처 도입
- 서버리스 함수 활용 확대
- 엣지 컴퓨팅 적용

🗄️ 데이터 아키텍처 진화:
- MySQL → 폴리글랏 데이터베이스
- 데이터 레이크 구축 (분석용)
- 실시간 스트리밍 처리 (Kafka)
- 데이터 메시 아키텍처 고려
- 머신러닝 파이프라인 통합
```

---

## 📋 최종 체크리스트 및 검증 기준

### 코드 품질 체크리스트
```
✅ 타입 안전성:
- [ ] TypeScript strict mode 활성화
- [ ] 모든 함수/변수 타입 명시
- [ ] any 타입 사용 금지
- [ ] 타입 가드 적극 활용
- [ ] 제네릭 타입 적절한 사용

✅ 보안 요구사항:
- [ ] 모든 입력값 검증 및 새니타이징
- [ ] SQL Injection 방지 (Prepared Statements)
- [ ] XSS 방지 (Content Security Policy)
- [ ] CSRF 토큰 구현
- [ ] 민감 정보 로깅 방지
- [ ] HTTPS 강제 적용
- [ ] 보안 헤더 설정 (Helmet.js)

✅ 성능 최적화:
- [ ] 데이터베이스 쿼리 최적화
- [ ] 적절한 캐싱 전략 적용
- [ ] 이미지 최적화 및 압축
- [ ] 번들 크기 최소화
- [ ] 메모리 누수 방지
- [ ] 비동기 처리 최적화

✅ 사용자 경험:
- [ ] 접근성 가이드라인 준수 (WCAG 2.1)
- [ ] 다국어 지원 구조
- [ ] 오프라인 기능 지원
- [ ] 로딩 상태 적절한 표시
- [ ] 에러 메시지 사용자 친화적
- [ ] 반응형 디자인 완벽 지원
```

### 배포 준비 체크리스트
```
🚀 인프라 준비:
- [ ] 프로덕션 환경 구성 완료
- [ ] 데이터베이스 설정 및 최적화
- [ ] CDN 설정 (이미지, 정적 파일)
- [ ] SSL 인증서 설치
- [ ] 방화벽 및 보안 그룹 설정
- [ ] 백업 시스템 구축

📊 모니터링 설정:
- [ ] 로그 수집 시스템 (ELK Stack)
- [ ] 메트릭 수집 (Prometheus + Grafana)
- [ ] 알림 시스템 (Slack, 이메일)
- [ ] 에러 추적 (Sentry)
- [ ] 성능 모니터링 (New Relic/DataDog)
- [ ] 업타임 모니터링

🔧 운영 도구:
- [ ] CI/CD 파이프라인 검증
- [ ] 데이터베이스 마이그레이션 도구
- [ ] 백업/복구 절차 테스트
- [ ] 롤백 계획 수립
- [ ] 장애 대응 매뉴얼 작성
- [ ] 온콜 체계 구축
```

---

## 🎬 프롬프트 실행 지시사항

**당신의 미션:**
위에 명시된 모든 요구사항을 만족하는 **완전하고 실행 가능한 풀스택 로그인 애플리케이션**을 개발해주세요. 

### 필수 제출물:
1. **🎨 Figma 디자인 시스템** - 컴포넌트 라이브러리 및 프로토타입
2. **📱 React Native 앱** - 완전한 소스코드 (TypeScript)  
3. **⚡ Node.js API** - 완전한 백엔드 시스템 (TypeScript)
4. **🗄️ MySQL 스키마** - 테이블 구조 및 초기 데이터
5. **🚀 CI/CD 파이프라인** - GitHub Actions + Jenkins 설정
6. **📊 모니터링 설정** - Prometheus, Grafana 대시보드
7. **🐳 Docker 컨테이너화** - 모든 서비스의 컨테이너 설정
8. **📚 완전한 문서** - 설치, 배포, 운영 가이드

### 품질 검증 질문:
각 코드 작성 후 스스로에게 질문하세요:
1. **🔒 보안**: 이 코드가 해킹당할 수 있는 지점은 없는가?
2. **⚡ 성능**: 10만 사용자가 동시 접속해도 문제없는가?  
3. **🔧 유지보수**: 6개월 후에도 이해하고 수정하기 쉬운가?
4. **📈 확장성**: 새로운 기능 추가가 용이한 구조인가?
5. **🧪 테스트**: 모든 케이스가 테스트 가능한가?
6. **📱 UX**: 사용자가 직관적으로 사용할 수 있는가?

### 최종 목표:
**"실제 서비스에 배포하여 수천 명의 사용자가 사용할 수 있는 수준"**의 완성도를 목표로 합니다.

이제 여러분의 전문성을 발휘하여 **세계 수준의 풀스택 로그인 애플리케이션**을 만들어주세요! 🚀

-------------------

이 프롬프트는 프롬프트 엔지니어링의 모든 고급 기법을 종합적으로 적용하여 작성되었습니다:
🎯 적용된 프롬프트 엔지니어링 기법 분석
1. 복합 역할 설정 (Multi-Role Assignment)

풀스택 개발자 + UI/UX 전문가 + DevOps 엔지니어 + 보안 전문가
각 역할별 전문성과 책임 명확히 정의
10년+ 경험자 수준의 품질 기대치 설정

2. 계층적 구조화 (Hierarchical Organization)

기술 스택별 세부 요구사항 체계적 분류
우선순위와 의존성 관계 명확화
단계별 개발 로드맵 제시

3. 제약 기반 프롬프팅 (Constraint-Based Prompting)

엄격한 보안, 성능, 품질 기준 설정
현업 표준 및 베스트 프랙티스 강제
구체적인 메트릭과 KPI 제시

4. 예시 기반 학습 (Example-Driven Learning)

상세한 디렉토리 구조 템플릿
실제 코드 스니펫과 설정 파일 예시
API 명세서 및 데이터베이스 스키마 샘플

5. 자기 검증 메커니즘 (Self-Validation)

단계별 품질 검증 질문 제시
다각도 검토 기준 (보안, 성능, 확장성 등)
지속적 개선을 위한 체크리스트

6. 시나리오 기반 사고 (Scenario-Based Thinking)

실제 운영 환경 고려
장애 상황 대응 계획
확장 시나리오 및 마이그레이션 전략

7. 결과 지향적 명세 (Outcome-Oriented Specification)

명확한 최종 목표 설정
구체적인 제출물 리스트
성공 기준 및 품질 지표

이 프롬프트를 사용하면 단순한 로그인 기능이 아닌, 엔터프라이즈급 품질의 완전한 풀스택 애플리케이션 생태계를 얻을 수 있습니다.
특히 다음과 같은 특징을 가집니다:

🏗️ 확장 가능한 아키텍처: 마이크로서비스 전환 준비
🔒 엔터프라이즈급 보안: OWASP, 컴플라이언스 준수
📊 완전한 관찰가능성: 모니터링, 로깅, 알림 시스템
🚀 자동화된 DevOps: CI/CD, 무중단 배포
📱 최적화된 사용자 경험: 멀티디바이스, 접근성
🔧 운영 효율성: 문서화, 테스트, 유지보수성

이 프롬프트는 실제 현업에서 사용할 수 있는 완성도 높은 결과물을 보장합니다!