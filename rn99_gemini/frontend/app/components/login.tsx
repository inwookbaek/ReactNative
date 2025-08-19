import React, { useState } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput, Button, Text, Switch } from 'react-native-paper';

// 로그인 UI 컴포넌트
const LoginForm = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = () => {
    // Email regex validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('입력 오류', '올바른 이메일 형식이 아닙니다.');
      return;
    }

    // Password regex validation (at least 8 chars, 1 letter, 1 number)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(
        '입력 오류',
        '비밀번호는 8자 이상이어야 하며, 영문자와 숫자를 모두 포함해야 합니다.'
      );
      return;
    }

    // 실제 로그인 로직 (예: API 호출) 은 여기에 구현합니다.
    Alert.alert('로그인 성공', `이메일: ${email}, 관리자: ${isAdmin}`);
    console.log('Login attempt with:', { email, password, isAdmin });
    onLoginSuccess(); // 로그인 성공 시 콜백 호출
  };

  return (
    <View style={styles.modalContent}>
      <Text style={styles.title}>로그인</Text>
      
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color="gray" style={styles.icon} />
        <TextInput
          label="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          mode="outlined"
          style={styles.paperInput}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="gray" style={styles.icon} />
        <TextInput
          label="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.paperInput}
        />
      </View>

      <Text style={styles.hintText}>
        비밀번호는 8자 이상이어야 하며, 영문자와 숫자를 모두 포함해야 합니다.
      </Text>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>관리자</Text>
        <Switch
          value={isAdmin}
          onValueChange={setIsAdmin}
        />
      </View>

      <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>
        로그인
      </Button>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>닫기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 16,
      },
      icon: {
        marginRight: 10,
      },
      paperInput: {
        flex: 1,
        height: 50, // Paper TextInput has its own height, adjust if needed
        backgroundColor: 'white',
      },
      hintText: {
        width: '100%',
        textAlign: 'left',
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.5)',
        marginBottom: 16,
        paddingHorizontal: 5,
      },
      switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 5,
      },
      switchLabel: {
        fontSize: 16,
      },
      loginButton: {
        width: '100%',
        paddingVertical: 5,
        marginTop: 10,
      },
      closeButton: {
        marginTop: 10,
        padding: 10,
      },
      closeButtonText: {
        color: '#3498db',
        fontSize: 16,
      }
});

export default LoginForm;