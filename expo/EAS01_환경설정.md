# React Native with Expo

```powershell
npx create-expo-app@latest simplePostApp
windsurf .
```

# Expo Application Services(EAS)
* https://docs.expo.dev/develop/development-builds/create-a-build/

```bash
# 1. Install expo-dev-client
# 아래 명령은 실행생략해도 됨
npx expo install expo-dev-client

# 2. Build the native app (Android)
# Prerequisites
# 1) Expo account
# 2) EAS CLI : 
npm install -g eas-cli && eas login
# 3) An Android Emulator (optional)

eas build --platform android --profile development

```
# 빌드전전

```bash
cd .\simplePostApp\
npm run android
# a -> Android 실행

npm run reset-project

npm run android

npm install -g eas-cli
eas login
# 시간이 많이 설림림
# 안드로이드
eas build --platform android --profile development

# IOS(Mac에서만 가능)
eas build --platform ios --profile development 

# 모든 플랫폼
eas build --platform all --profile development
```

# 빌드후

```bash
npm run android # -> expo start --android

npm run reset-project

```
msinfo32.exe

