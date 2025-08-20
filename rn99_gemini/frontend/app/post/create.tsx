import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import PostForm, { PostFormData } from '../components/PostForm';
import axios from 'axios';
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../contexts/UserContext';

const API_URL = 'http://10.0.2.2:3001'; // 안드로이드 에뮬레이터용 localhost

export default function CreatePostScreen() {
  const router = useRouter();
  const { user } = useUser();
  const [postData, setPostData] = useState<PostFormData>({
    title: '',
    body: '',
  });

  const handleSave = async (data: PostFormData) => {
    if (!data.title || !data.body) {
        Alert.alert('입력 오류', '제목과 내용은 필수 항목입니다.');
        return;
    }
    
    if (!user?.id) {
        Alert.alert('오류', '로그인이 필요합니다.');
        return;
    }

    try {
      const postDataWithUser = {
        ...data,
        userId: user.id
      };
      
      const response = await axios.post(`${API_URL}/posts`, postDataWithUser);
      console.log(response);

      Alert.alert('성공', `새로운 게시글 '${data.title}'(이)가 생성되었습니다.`);
      router.push('/(tabs)/board');
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '게시글 생성 중 문제가 발생했습니다.');
    }
  };

  const handleInputChange = (field: keyof PostFormData, value: string) => {
    setPostData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Stack.Screen options={{ title: '새 게시글 작성' }} />
      <View style={styles.headerContainer}>
        <Button 
          mode="text" 
          onPress={() => router.back()}
          icon={() => <MaterialIcons name="arrow-back" size={24} color="#000" />}
          style={styles.backButton}
        >
          뒤로가기
        </Button>
      </View>
      <PostForm
        initialValues={postData}
        onSubmit={handleSave}
        onInputChange={handleInputChange}
        buttonText="작성 완료"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 8,
  },
});