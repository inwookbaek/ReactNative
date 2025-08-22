import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import axios from 'axios';

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
    };

    const deleteUser = async (id: number) => {
        Alert.alert(
            '삭제 확인',
            '이 사용자를 삭제하시겠습니까?',
            [
                { text: '취소', style: 'cancel' },
                {
                    text: '삭제',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
                            setUsers(users.filter(user => user.id !== id));
                            Alert.alert('성공', '사용자가 삭제되었습니다.');
                        } catch (error) {
                            Alert.alert('오류', '삭제에 실패했습니다.');
                        }
                    }
                }
            ]
        );
    };

    const renderUser = ({ item }: { item: User }) => (
        <TouchableOpacity 
            style={styles.userItem}
            onPress={() => router.push(`/(users)/detail/${item.id}`)}
        >
            <View style={styles.userHeader}>
                <View style={styles.userAvatar}>
                    <MaterialIcons name="person" size={30} color="#9C27B0" />
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userUsername}>@{item.username}</Text>
                    <Text style={styles.userEmail}>{item.email}</Text>
                </View>
                <View style={styles.userActions}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => router.push(`/(users)/edit/${item.id}`)}
                    >
                        <MaterialIcons name="edit" size={20} color="#4CAF50" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deleteUser(item.id)}
                    >
                        <MaterialIcons name="delete" size={20} color="#F44336" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.userDetails}>
                <View style={styles.detailRow}>
                    <MaterialIcons name="phone" size={16} color="#666" />
                    <Text style={styles.detailText}>{item.phone}</Text>
                </View>
                <View style={styles.detailRow}>
                    <MaterialIcons name="business" size={16} color="#666" />
                    <Text style={styles.detailText}>{item.company.name}</Text>
                </View>
                <View style={styles.detailRow}>
                    <MaterialIcons name="location-city" size={16} color="#666" />
                    <Text style={styles.detailText}>{item.address.city}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <StatusBar style="light" />
                <MaterialIcons name="people" size={60} color="#ffffff" />
                <Text style={styles.loadingText}>사용자 로딩 중...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>사용자 관리</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push('/(users)/create')}
                >
                    <MaterialIcons name="person-add" size={24} color="#ffffff" />
                </TouchableOpacity>
            </View>
            
            <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={(item) => item.id.toString()}
                style={styles.usersList}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9C27B0',
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
    usersList: {
        flex: 1,
        paddingHorizontal: 15,
    },
    userItem: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    userHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E1BEE7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    },
    userUsername: {
        fontSize: 14,
        color: '#9C27B0',
        marginBottom: 2,
    },
    userEmail: {
        fontSize: 12,
        color: '#666',
    },
    userActions: {
        flexDirection: 'row',
        gap: 5,
    },
    editButton: {
        padding: 5,
    },
    deleteButton: {
        padding: 5,
    },
    userDetails: {
        paddingLeft: 65,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    detailText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 8,
    },
});
