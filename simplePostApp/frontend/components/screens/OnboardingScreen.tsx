import CreateAccountForm from "@/components/forms/CreateAccountForm";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  // 시작하기 버튼 클릭 시 실행될 함수
  const handleCreateAccount = () => {
    setShowCreateAccount(true);
  };

  // 로그인 텍스트 클릭 시 실행될 함수
  const handleLogin = () => {
    console.log("로그인");
  };

  if (showCreateAccount) {
    return (
      <CreateAccountForm
        onBack={() => setShowCreateAccount(false)}
        onSuccess={() => setShowCreateAccount(false)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* 로고 영역 */}
        <View style={styles.logoContainer}>
          {/* 당근 로고 - SVG 대신 View로 구현 */}
          <View style={styles.logoWrapper}>
            <View style={styles.carrotBody}>
              <View style={styles.carrotInner} />
            </View>
            <View style={styles.carrotLeaf} />
          </View>
        </View>

        {/* 텍스트 영역 */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>당신 근처의 당근마켓</Text>
          <Text style={styles.description}>
            중고 거래부터 동네 정보까지,{"\n"}
            지금 내 동네를 선택하고 시작해보세요!
          </Text>
        </View>
      </View>

      {/* 버튼 영역 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleCreateAccount}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>시작하기</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>이미 계정이 있나요? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginLink}>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoWrapper: {
    alignItems: "center",
  },
  carrotBody: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FF8A3D",
    justifyContent: "center",
    alignItems: "center",
  },
  carrotInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
  },
  carrotLeaf: {
    position: "absolute",
    top: -15,
    width: 30,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#20C997",
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#212529",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    color: "#495057",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  startButton: {
    backgroundColor: "#FF8A3D",
    borderRadius: 6,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  startButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#868E96",
    fontSize: 14,
  },
  loginLink: {
    color: "#FF8A3D",
    fontSize: 14,
    fontWeight: "500",
  },
});
