import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import PostForm, { PostFormData } from '../components/PostForm';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:3001'; // 안드로이드 에뮬레이터용 localhost

export default function CreatePostScreen() {
  const router = useRouter();
  const [postData, setPostData] = useState<PostFormData>({
    title: '',
    body: '',
  });

  const handleSave = async (data: PostFormData) => {
    if (!data.title || !data.body) {
        Alert.alert('입력 오류', '제목과 내용은 필수 항목입니다.');
        return;
    }

    try {
      const response = await axios.post(`${API_URL}/posts`, data);
      const newPost = response.data;
      Alert.alert('성공', `새로운 게시글 '${newPost.title}'(이)가 생성되었습니다.`);
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
      <PostForm 
        initialValues={postData}
        onInputChange={handleInputChange}
        onSubmit={handleSave}
        buttonText="새 글 추가"
      />
    </>
  );
}