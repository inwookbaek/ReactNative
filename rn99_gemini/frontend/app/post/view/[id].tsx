import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Card, ActivityIndicator, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

interface Post {
  data: any;
  id: number;
  title: string;
  body: string;
  userId: number;
}

// const API_URL = 'http://localhost:3001'; // 안드로이드 에뮬레이터용 localhost
const API_URL = 'http://10.0.2.2:3001'; // 안드로이드 에뮬레이터용 localhost

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(`${API_URL}/posts/${id}`);
        setPost(response.data.data);
      } catch (error) {
        console.error('게시글을 불러오는 중 오류 발생:', error);
        Alert.alert('오류', '게시글을 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.centered}>
        <Text>게시글을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Text style={styles.meta}>작성자: {post.userId}</Text>
            <Text style={styles.title}>{post.title}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.body}>{post.body}</Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  headerContainer: {
    marginBottom: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    color: '#666',
    fontSize: 14,
  },
  content: {
    marginBottom: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
});
