// App.tsx - Posts CRUD 앱
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Axios 기본 설정
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1,
  });

  // 게시글 목록 조회
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/posts');
      setPosts(response.data.slice(0, 10)); // 처음 10개만 표시
    } catch (error) {
      Alert.alert('오류', '게시글을 불러오는데 실패했습니다.');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // 새 게시글 작성
  const createPost = async () => {
    try {
      if (!formData.title.trim() || !formData.body.trim()) {
        Alert.alert('알림', '제목과 내용을 모두 입력해주세요.');
        return;
      }

      const response = await api.post('/posts', formData);
      const newPost = response.data;
      
      // 새 게시글을 목록 맨 앞에 추가
      setPosts(prevPosts => [{
        ...newPost,
        id: Date.now(), // 임시 ID (실제로는 서버에서 생성됨)
      }, ...prevPosts]);

      setFormData({ title: '', body: '', userId: 1 });
      setModalVisible(false);
      Alert.alert('성공', '게시글이 작성되었습니다.');
    } catch (error) {
      Alert.alert('오류', '게시글 작성에 실패했습니다.');
      console.error('Error creating post:', error);
    }
  };

  // 게시글 수정
  const updatePost = async () => {
    if (!editingPost) return;

    try {
      if (!formData.title.trim() || !formData.body.trim()) {
        Alert.alert('알림', '제목과 내용을 모두 입력해주세요.');
        return;
      }

      const response = await api.put(`/posts/${editingPost.id}`, {
        id: editingPost.id,
        ...formData,
      });

      const updatedPost = response.data;

      // 목록에서 해당 게시글 업데이트
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === editingPost.id
            ? { ...updatedPost, id: editingPost.id }
            : post
        )
      );

      setFormData({ title: '', body: '', userId: 1 });
      setEditingPost(null);
      setModalVisible(false);
      Alert.alert('성공', '게시글이 수정되었습니다.');
    } catch (error) {
      Alert.alert('오류', '게시글 수정에 실패했습니다.');
      console.error('Error updating post:', error);
    }
  };

  // 게시글 삭제
  const deletePost = async (post: Post) => {
    Alert.alert(
      '삭제 확인',
      `"${post.title}" 게시글을 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/posts/${post.id}`);

              setPosts(prevPosts => prevPosts.filter(p => p.id !== post.id));
              Alert.alert('성공', '게시글이 삭제되었습니다.');
            } catch (error) {
              Alert.alert('오류', '게시글 삭제에 실패했습니다.');
              console.error('Error deleting post:', error);
            }
          },
        },
      ]
    );
  };

  // 모달 열기 (새 글 작성)
  const openCreateModal = () => {
    setEditingPost(null);
    setFormData({ title: '', body: '', userId: 1 });
    setModalVisible(true);
  };

  // 모달 열기 (게시글 수정)
  const openEditModal = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      body: post.body,
      userId: post.userId,
    });
    setModalVisible(true);
  };

  // 새로고침
  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 게시글 아이템 렌더링
  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody} numberOfLines={3}>
        {item.body}
      </Text>
      <View style={styles.postActions}>
        <Text style={styles.userId}>사용자 ID: {item.userId}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => openEditModal(item)}
          >
            <Text style={styles.actionButtonText}>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => deletePost(item)}
          >
            <Text style={styles.actionButtonText}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>게시글 관리</Text>
        <TouchableOpacity style={styles.addButton} onPress={openCreateModal}>
          <Text style={styles.addButtonText}>+ 새 글</Text>
        </TouchableOpacity>
      </View>

      {/* 게시글 목록 */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>게시글을 불러오는 중...</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPost}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>게시글이 없습니다.</Text>
          }
        />
      )}

      {/* 작성/수정 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                {editingPost ? '게시글 수정' : '새 게시글 작성'}
              </Text>

              <Text style={styles.label}>제목</Text>
              <TextInput
                style={styles.input}
                value={formData.title}
                onChangeText={(text) =>
                  setFormData(prev => ({ ...prev, title: text }))
                }
                placeholder="게시글 제목을 입력하세요"
                multiline
              />

              <Text style={styles.label}>내용</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.body}
                onChangeText={(text) =>
                  setFormData(prev => ({ ...prev, body: text }))
                }
                placeholder="게시글 내용을 입력하세요"
                multiline
                numberOfLines={5}
              />

              <Text style={styles.label}>사용자 ID</Text>
              <TextInput
                style={styles.input}
                value={formData.userId.toString()}
                onChangeText={(text) =>
                  setFormData(prev => ({
                    ...prev,
                    userId: parseInt(text) || 1,
                  }))
                }
                placeholder="사용자 ID"
                keyboardType="numeric"
              />

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={editingPost ? updatePost : createPost}
                >
                  <Text style={styles.submitButtonText}>
                    {editingPost ? '수정' : '작성'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff4500',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 15,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  postBody: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userId: {
    fontSize: 12,
    color: '#999',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#34C759',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f8f8',
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});