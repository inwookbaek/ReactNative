# A. backend

1. setup  
```bash
npm init -y
npm install express mysql2 cors dotenv axios
npm install nodemon --save-dev
```

2. .env 
```txt 
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=12345
DB_NAME=simplPost
NODE_ENV=development
```





# B. frontend

1. setsup

```bash
npx create-expo-app frontend
npm run reset-project
npx expo start
```

2. GBoard 제거
```bash

# 1. 에뮬레이터 실행하기 : 해당 에뮬레이터를 실행합니다:
emulator -avd <에뮬레이터이름>  # 에뮬레이터명 :  Medium_Phone_API_36.0

# 2.연결된 디바이스 확인
adb devices

# 3. GBoard 관련 모든 패키지 확인
adb shell pm list packages | grep -i google
adb shell pm list packages | grep -i keyboard
adb shell pm list packages | grep -i inputmethod
adb shell pm list packages | grep -i gboard

# 4. GBoard 강제 비활성화 실행
adb shell pm disable-user --user 0 com.google.android.inputmethod.latin

# 다른 가능한 패키지명
# adb shell pm disable-user --user 0 com.android.inputmethod.latin
# adb shell pm disable-user --user 0 com.google.android.apps.inputmethod.latin
# adb shell pm disable-user --user 0 com.google.android.inputmethod.latin

# 5. 비활성화 확인
# 비활성화된 패키지 확인
adb shell pm list packages -d | grep -i google
# 또는 특정 패키지 상태 확인
adb shell pm list packages | grep com.google.android.inputmethod.latin
```

(참고사항)
```text
기존 안드로이드 키보드를 사용하기 위한 세팅

settings -> 앱 -> 앱 모두보기 -> Gboard 앱 제거(캐시 삭제, 제거)

ColdBoot : 애뮬레이터 껐다 켜기
emulator -list-avds
emulator @<에뮬레이터 이름> -no-snapshot-load
```

