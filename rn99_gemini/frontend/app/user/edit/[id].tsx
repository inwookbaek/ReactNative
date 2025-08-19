
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import UserForm, { UserFormData } from '../../components/UserForm';
import { ActivityIndicator, Text } from 'react-native-paper';
import axios from 'axios';


const API_URL = 'http://10.0.2.2:3001'; // 안드로이드 에뮬레이터용 localhost

export default function EditUserScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const response = await axios.get(`${API_URL}/users/${id}`);
          const data = response.data;
          setUserData({ 
            name: data.name, 
            username: data.username, 
            email: data.email, 
            phone: data.phone, 
            website: data.website 
          });
        } catch (error) {
          console.error(error);
          Alert.alert('오류', '사용자 정보를 불러오는 데 실패했습니다.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUser();
  }, [id]);

  const handleSave = async (data: UserFormData) => {
    try {
      await axios.put(`${API_URL}/users/${id}`, data);
      Alert.alert('성공', '사용자 정보가 성공적으로 수정되었습니다.');
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '수정 중 문제가 발생했습니다.');
    }
  };

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setUserData(prev => (prev ? { ...prev, [field]: value } : null));
  };

  if (loading) {
    return <ActivityIndicator size="large" animating={true} color="#0000ff" style={{ flex: 1 }} />;
  }

  if (!userData) {
    return <View><Text>사용자 정보를 찾을 수 없습니다.</Text></View>;
  }

  return (
    <>
      <Stack.Screen options={{ title: `수정: ${userData.name}` }} />
      <UserForm 
        initialValues={userData}
        onInputChange={handleInputChange}
        onSubmit={handleSave}
        buttonText="수정 완료"
      />
    </>
  );
}
