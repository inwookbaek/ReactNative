import { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Alert } from "react-native";
import { useUser } from "../contexts/UserContext";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export default function Users() {

  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = async () => {
    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(data);
    } catch (error) {
        Alert.alert('오류', '사용자 목록을 불러오는데 실패했습니다.');
    } finally {
        setLoading(false);
        setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  }

  if (!user.isLoggedIn) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>    
        <MaterialIcons name="account-circle" size={100} color="#ffffff" />
        <Text style={styles.title}>로그인을 해주세요.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" />
        <MaterialIcons name="people" size={60} color="#ffffff" />
        <Text style={styles.loadingText}>사용자 로딩 중...</Text>
      </View>
      );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
        <View style={styles.header}>
            <Text style={styles.headerTitle}>사용자 관리</Text>
            <TouchableOpacity
                style={styles.addButton} 
                onPress={() => router.navigate('/(users)/create')}
            >
                <MaterialIcons name="person-add" size={24} color="#ffffff" />
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9C27B0',
  },   
  title: {   
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9C27B0',
  },
  loadingText: {
      fontSize: 18,
      color: '#ffffff',
      marginTop: 20,
  },  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#9C27B0',
  },  
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 8,
  },
});