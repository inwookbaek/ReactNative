// app/index.tsx
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  const [isIdHovered, setIsIdHovered] = useState(false);
  const [isPwHovered, setIsPwHovered] = useState(false);

  const handleLoginPress = () => {
    // 로그인 로직 처리 후
    router.replace('/(tabs)/index'); // 탭 네비게이션으로 이동
  };

  const handleFindIdPress = () => {
    console.log('Find ID pressed');
  };

  const handleFindPwPress = () => {
    console.log('Find PW pressed');
  };

  const handleSignupPress = () => {
    console.log('Signup pressed');
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <View style={styles.text}>
          <Pressable
            onPress={handleFindIdPress}
            onHoverIn={() => setIsIdHovered(true)}
            onHoverOut={() => setIsIdHovered(false)}
          >
            <Text style={[styles.link, isIdHovered && styles.linkHover]}>아이디찾기</Text>
          </Pressable>
          <Text> / </Text>
          <Pressable
            onPress={handleFindPwPress}
            onHoverIn={() => setIsPwHovered(true)}
            onHoverOut={() => setIsPwHovered(false)}
          >
            <Text style={[styles.link, isPwHovered && styles.linkHover]}>비밀번호찾기</Text>
          </Pressable>
        </View>
        <View style={styles.text}>
          <Text>계정이 없으신가요? </Text>
          <Pressable onPress={handleSignupPress}>
            <Text style={styles.link}>회원가입</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'mediumseagreen',
    borderRadius: 5,
    minWidth: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  link: {
    color: '#007AFF',
  },
  linkHover: {
    textDecorationLine: 'underline',
  },
});