import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import UserForm, { UserFormData } from '../components/UserForm';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:3001'; // 안드로이드 에뮬레이터용 localhost

export default function CreateUserScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserFormData>({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
  });

  const handleSave = async (data: UserFormData) => {
    if (!data.name || !data.email) {
        Alert.alert('입력 오류', '이름과 이메일은 필수 항목입니다.');
        return;
    }

    try {
      const response = await axios.post(`${API_URL}/users`, data);
      const newUser = response.data;
      Alert.alert('성공', `새로운 사용자 '${newUser.name}'(이)가 생성되었습니다.`);
      router.push('/(tabs)/users');
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '사용자 생성 중 문제가 발생했습니다.');
    }
  };

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Stack.Screen options={{ title: '새 사용자 생성' }} />
      <UserForm 
        initialValues={userData}
        onInputChange={handleInputChange}
        onSubmit={handleSave}
        buttonText="새 사용자 추가"
      />
    </>
  );
}