
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Searchbar, Card, ActivityIndicator, Text } from 'react-native-paper';
import axios from 'axios';

// 사용자 데이터 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

// const API_URL = 'http://localhost:3001'; // 안드로이드 에뮬레이터용 localhost
// const API_URL = 'http://jsonplaceholder.typicode.com'; // 안드로이드 에뮬레이터용 localhost
const API_URL = 'http://10.0.2.2:3001'; // 안드로이드 에뮬레이터용 localhost

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${API_URL}/users`);
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('오류', '사용자 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const newData = users.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredUsers(newData);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleDelete = (userToDelete: User) => {
    Alert.alert(
      '사용자 삭제',
      `정말로 '${userToDelete.name}' 님을 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await axios.delete(`${API_URL}/users/${userToDelete.id}`);
              if (response.status === 200) {
                setUsers(prev => prev.filter(user => user.id !== userToDelete.id));
                setFilteredUsers(prev => prev.filter(user => user.id !== userToDelete.id));
                Alert.alert('성공', '사용자가 삭제되었습니다.');
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

  const renderItem = ({ item }: { item: User }) => (
    <Card style={styles.cardContainer}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="person" size={32} color="white" />
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.itemName}>{item.name} (@{item.username})</Text>
          <Text style={styles.itemEmail}>{item.email}</Text>
        </View>
        <View style={styles.actionsContainer}>
          <Pressable onPress={() => router.push(`/user/edit/${item.id}`)} style={styles.iconButton}>
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
        placeholder="사용자 이름으로 검색..."
        onChangeText={handleSearch}
        value={search}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredUsers}
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
    borderRadius: 25,
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfoContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
  },
  itemEmail: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconButton: {
    padding: 5,
    marginLeft: 5,
  },
});
