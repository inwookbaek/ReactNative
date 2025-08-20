import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import PostForm, { PostFormData } from '../../components/PostForm';
import { Button, ActivityIndicator, Text } from 'react-native-paper';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

const API_URL = 'http://10.0.2.2:3001'; // 안드로이드 에뮬레이터용 localhost

export default function EditPostScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [postData, setPostData] = useState<PostFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const response = await axios.get(`${API_URL}/posts/${id}`);
          const data = response.data.data;
          setPostData({ 
            title: data.title, 
            body: data.body 
          });

        } catch (error) {
          console.error(error);
          Alert.alert('오류', '게시글 정보를 불러오는 데 실패했습니다.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPost();
  }, [id]);

  const handleSave = async (data: PostFormData) => {
    try {
      const response = await axios.put(`${API_URL}/posts/${id}`, data);
      if (response.data) {
        // Update the local state with the edited post
        setPostData(data);
        Alert.alert('성공', '게시글이 성공적으로 수정되었습니다.');
        
        // 게시글 목록 업데이트를 위한 이벤트 전달
        router.back();
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '수정 중 문제가 발생했습니다.');
    }
  };

  const handleInputChange = (field: keyof PostFormData, value: string) => {
    setPostData(prev => (prev ? { ...prev, [field]: value } : null));
  };

  if (loading) {
    return <ActivityIndicator size="large" animating={true} color="#0000ff" style={{ flex: 1 }} />;
  }

  if (!postData) {
    return <View><Text>게시글 정보를 찾을 수 없습니다.</Text></View>;
  }

  return (
    <>
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
        onInputChange={handleInputChange}
        onSubmit={handleSave}
        buttonText="수정 완료"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    marginBottom: 16,
  },  
  backButton: {
    alignSelf: 'flex-start',
  },  
});