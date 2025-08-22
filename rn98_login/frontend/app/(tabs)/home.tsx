import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "axios";
import { API_URL } from "../contexts/appConfig";
import { useUser } from "../contexts/UserContext";

export default function Index() {

  const { user, login, logout } = useUser()

  const [isIdHovered, setIsIdHovered] = useState(false);
  const [isPwHovered, setIsPwHovered] = useState(false);
  const [isRegisterHovered, setIsRegisterHovered] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isIdFocused, setIsIdFocused] = useState(false);
  const [isPwFocused, setIsPwFocused] = useState(false);

  const handleLoginPress = async () => {

    if (!userEmail || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login`, { userEmail, password });
      const userData = response.data;

      login({
        email: userData.email,
        name: userData.name,  
        phone: userData.phone,
      });

      console.log('Login successful:', userData);

      // 로그인 로직 구현
      console.log('Login attempt with:', user.name, user.email, password);
      // 로그인 성공 시 홈 화면으로 이동
      router.replace('/(tabs)/home');

    } catch (error) {
      console.error(error);
      alert('로그인에 실패했습니다.');
    }

  };

  const handleFindIdPress = () => {
    console.log('Find ID pressed');
    // 아이디 찾기 화면으로 이동
  };

  const handleFindPasswordPress = () => {
    console.log('Find Password pressed');
    // 비밀번호 찾기 화면으로 이동
  };

  const handleRegisterPress = () => {
    console.log('Register pressed');
    // 회원가입 화면으로 이동
  };

  const handleLogoutPress = () => {
    logout();
    console.log('Logout pressed');
  };

  return (
    <View style={styles.container}>
      {!user.isLoggedIn ? (
        <View style={styles.formContainer}>
          <TextInput
            style={[
              styles.input,
              isIdFocused && styles.inputFocused
            ]}
            placeholder="이메일"
            value={userEmail}
            onChangeText={setUserEmail}
            onFocus={() => setIsIdFocused(true)}
            onBlur={() => setIsIdFocused(false)}
            autoCapitalize="none"
          />
          <TextInput
            style={[
              styles.input,
              isPwFocused && styles.inputFocused,
              { marginTop: 10 }
            ]}
            placeholder="비밀번호"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onFocus={() => setIsPwFocused(true)}
            onBlur={() => setIsPwFocused(false)}
          />

          <Pressable style={[styles.loginButton, (!userEmail || !password) && styles.loginButtonDisabled]} 
            onPress={handleLoginPress}
            disabled={!userEmail || !password}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <View style={styles.loginText}>
            {/* onHoverIn/Out은 Desktop에서만 작동 */}
            <Pressable
              onPress={handleFindIdPress}
              onHoverIn={() => setIsIdHovered(true)}
              onHoverOut={() => setIsIdHovered(false)}>
              <Text style={[styles.link, isIdHovered && styles.linkHover]}>아이디찾기</Text>
            </Pressable>
            <Text> / </Text>
            <Pressable 
              onPress={handleFindPasswordPress}
              onHoverIn={() => setIsPwHovered(true)}
              onHoverOut={() => setIsPwHovered(false)}
            >
              <Text style={[styles.link, isPwHovered && styles.linkHover]}>비밀번호찾기</Text>
            </Pressable>
            <Text> / </Text>
            <Pressable 
              onPress={handleRegisterPress}
              onHoverIn={() => setIsRegisterHovered(true)}
              onHoverOut={() => setIsRegisterHovered(false)}
            >
              <Text style={[styles.link, isRegisterHovered && styles.linkHover]}>회원가입</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.loginSuccessText}>{user.name}님! 환영합니다!</Text>
          <Pressable style={styles.logoutButton} onPress={handleLogoutPress}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'mediumseagreen',
  },
  formContainer: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    margin: 10,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputFocused: {
    borderColor: '#4a90e2',
    borderWidth: 2,
  },
  loginButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "mediumseagreen",
    borderRadius: 5,
    minWidth: 260,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonDisabled: {
    backgroundColor: '#a0c4ff',
  },
  logoutButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "mediumseagreen",
    borderRadius: 5,
    minWidth: 260,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loginText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  loginSuccessText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingLeft: 20,
  },
  link: {
    color: "#007AFF",
    padding: 5,
    borderRadius: 4,
  },
  linkHover: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
});