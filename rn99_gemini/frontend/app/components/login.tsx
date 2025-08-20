import React, { useState } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput, Button, Text, Switch } from 'react-native-paper';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

const API_URL = 'http://10.0.2.2:3001'; // 안드로이드 에뮬레이터용 localhost

// 로그인 UI 컴포넌트
const LoginForm = ({ onClose, onLoginSuccess }: { onClose: () => void; onLoginSuccess: () => void }) => {
  
  const { login } = useUser();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Email regex validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('입력 오류', '올바른 이메일 형식이 아닙니다.');
      setLoading(false);
      return;
    }

    // Password regex validation (at least 8 chars, 1 letter, 1 number)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d&,=-]{8,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(
        '입력 오류',
        '비밀번호는 8자 이상이어야 하며, 영문자와 숫자를 모두 포함해야 합니다.'
      );
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/user/login`, { params: { email } });
      const userData = response.data[0];
      
      if (!userData) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }

      // 사용자 정보를 전역 상태에 저장
      login({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        isAdmin: userData.isAdmin || false,
      });

      console.log('Login successful:', { id: userData.id, username: userData.username });
      Alert.alert('로그인 성공', `${userData.username}님 환영합니다!`);
      onLoginSuccess();
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('오류', '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setLoading(false);
    }
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