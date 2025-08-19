import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Searchbar, Card, ActivityIndicator, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

// 게시글 데이터 타입 정의
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// const API_URL = 'http://localhost:3001'; // 안드로이드 에뮬레이터용 localhost
const API_URL = 'http://10.0.2.2:3001'; // 안드로이드 에뮬레이터용 localhost

export default function BoardScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(`${API_URL}/posts`);
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('오류', '데이터를 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const newData = posts.filter(item => {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredPosts(newData);
    } else {
      setFilteredPosts(posts);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // 게시글 수정 후 돌아왔을 때만 새로고침
      const refreshData = async () => {
        try {
          const response = await axios.get<Post[]>(`${API_URL}/posts`);
          setPosts(response.data);
          
          // 검색어가 있는 경우 필터링된 목록도 업데이트
          if (search) {
            const filtered = response.data.filter(post => 
              post.title.toUpperCase().includes(search.toUpperCase())
            );
            setFilteredPosts(filtered);
          } else {
            setFilteredPosts(response.data);
          }
        } catch (error) {
          console.error('게시글 목록 새로고침 중 오류:', error);
        }
      };
      
      refreshData();
    }, [search])
  );

  const handleDelete = (postToDelete: Post) => {
    Alert.alert(
      '게시글 삭제',
      `'${postToDelete.title}' 게시글을 정말로 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await axios.delete(`${API_URL}/posts/${postToDelete.id}`);
              if (response.status === 200) {
                setPosts(prev => prev.filter(post => post.id !== postToDelete.id));
                setFilteredPosts(prev => prev.filter(post => post.id !== postToDelete.id));
                Alert.alert('성공', '게시글이 삭제되었습니다.');
              } else {
                Alert.alert('오류', '삭제에 실패했습니다.');
              }
            } catch (error) {
              console.error(error);
              Alert.alert('오류', '삭제 중 문제가 발생했습니다.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Post }) => (
    <Card style={styles.cardContainer}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="article" size={30} color="white" />
        </View>
        <View style={styles.postInfoContainer}>
          <Text style={styles.itemId}>글번호: {item.id}</Text>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemBody} numberOfLines={2}>{item.body}</Text>
        </View>
        <View style={styles.actionsContainer}>
          <Pressable onPress={() => router.push(`/post/edit/${item.id}`)} style={styles.iconButton}>
            <MaterialIcons name="edit" size={20} color="#555" />
          </Pressable>
          <Pressable onPress={() => handleDelete(item)} style={styles.iconButton}>
            <MaterialIcons name="delete" size={20} color="#ff4444" />
          </Pressable>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="게시글 제목으로 검색..."
        onChangeText={handleSearch}
        value={search}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredPosts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbar: {
    margin: 16,
  },
  cardContainer: {
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2, // Shadow for Android
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    position: 'relative',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#a5d6a7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  postInfoContainer: {
    flex: 1,
  },
  itemId: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'gray',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemBody: {
    fontSize: 14,
    color: 'gray',
  },
  actionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconButton: {
    paddingTop: 5,
    marginLeft: 5,
  },
});