# React Native 첫 걸음
## 1. 환경설정
### 1.1 Node.js 설치
* https://nodejs.orf
```bash
node -v
npm -v
nnpm install --global yarn
```

### 1.2 Chocolatery 설치 및 제거
* 관리자권한으로 PowerShell에서 실행

```powershell
Remove-Item -Recurse -Force "C:\ProgramData\chocolatey"

Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

choco --version

choco
```

### 1.3 Android Studio
* https://developer.android.com/studio?hl=ko
* 설치폴더 : C:\Users\<사용자명>\AppData\Local\Android
* 환경변수
  - ANDROID_HOME
  - C:\Users\gilba\AppData\Local\Android\Sdk

## 2. New ReactNative Project

```powershell
# 구버전방식 : 1) 
npx @react-native-community/cli init RN01_LearnReactNativeLearn
# 신버전방식(Expo)npx create-expo-app RN02

npx @react-native-community/cli init RN02
```
### 🧩 명령어 구성 설명
| 구성 요소      \                   | 설명                                                        |
| ----------------------------- | --------------------------------------------------------- |
| `npx`                         | npm 5.2 이상에서 제공되는 실행 도구로, **글로벌 설치 없이도** 최신 패키지를 일시적으로 실행 |
| `@react-native-community/cli` | React Native 프로젝트 생성을 위한 **공식 CLI 도구** 패키지                |
| `init`                        | 새로운 React Native 프로젝트를 생성하는 명령어                           |
| `RN01_LearnReactNative`       | 생성할 프로젝트 디렉터리 이름 (자유롭게 변경 가능)                             |

### 🔧 실행 시 내부적으로 일어나는 작업
1. RN01_LearnReactNative라는 폴더 생성
1. package.json, App.js, android/, ios/, index.js 등 기본 파일 구조 자동 생성
1. 필요한 npm 패키지 설치 (react, react-native, Babel, metro 등)
1. android/ 폴더에 Gradle 설정 포함, 즉 Android 프로젝트로 바로 빌드 가능

### Expo vs React Native CLI 방식 차이
| 구분                 | Expo                              | React Native CLI (`@react-native-community/cli`) |
| ------------------ | --------------------------------- | ------------------------------------------------ |
| **프로젝트 생성 명령어**    | `npx create-expo-app 프로젝트명`       | `npx @react-native-community/cli init 프로젝트명`     |
| **네이티브 코드 접근**     | 제한적 (네이티브 모듈 직접 수정 불가)            | 가능 (Java, Kotlin, Swift, Obj-C 등 직접 수정 가능)       |
| **사용자 환경**         | 빠른 개발, 초보자에게 적합                   | 네이티브 기능 개발, 복잡한 앱에 적합                            |
| **Android 실행 명령어** | `npx expo start` → `a` (에뮬레이터 실행) | `npx react-native run-android`                   |
| **iOS 실행 명령어**     | `npx expo start` → `i` (에뮬레이터 실행) | `npx react-native run-ios` (macOS 필요)            |
| **에뮬레이터 관리**       | Expo 개발 서버가 자동 처리                 | Android Studio 에뮬레이터 직접 실행                       |
| **빌드 방식**          | Expo 서버 빌드 (간편하지만 커스텀 제약 존재)      | 로컬에서 직접 빌드 (완전한 제어 가능)                           |
| **CLI 명령어 지원**     | 제한적 (Expo 전용 명령어 사용)              | React Native 공식 CLI 명령어 전부 사용 가능                 |
| **커뮤니티 지원**        | 대규모, 빠른 업데이트                      | React Native 커뮤니티 기반, 네이티브 개발자에게 인기              |
| **사용자 추천 대상**      | 빠른 시작과 간편한 개발이 필요한 초보자 및 소규모 앱    | 복잡한 네이티브 기능과 직접 제어가 필요한 개발자 및 대형 프로젝트            |



```powershell
cd RN01_LearnReactNative

# 1. 의존성추가
npm install # or yarn install

# 2, 에뮬레이터 실행
emulator -list-avds
# Medium_Phone_API_36.0

# 에뮬레이터 실행
emulator -avd Medium_Phone_API_36.0

# 🧪 에뮬레이터 실행 확인
adb devices
# 👉 에뮬레이터나 실제 기기가 전혀 인식되지 않은 상태일 경우 결과과
# List of devices attached : 

# ADB 데몬 비정상 상태 해결
adb kill-server
adb start-server

emulator -avd Medium_Phone_API_36.0
adb devices
# List of devices attached
# emulator-5554   device

# 3. @react-native-community/cli를 devDependencies에 추가
npm install --save-dev react-native@latest
npm install

# 4. 앱 실행
npx react-native run-android
```
# ReactNative
