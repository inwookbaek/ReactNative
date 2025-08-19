import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
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

export default function UserDetail() {
    const { id } = useLocalSearchParams();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
            setUser(data);
        } catch (error) {
            Alert.alert('오류', '사용자 정보를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async () => {
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
                            Alert.alert('성공', '사용자가 삭제되었습니다.', [
                                { text: '확인', onPress: () => router.back() }
                            ]);
                        } catch (error) {
                            Alert.alert('오류', '삭제에 실패했습니다.');
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <StatusBar style="light" />
                <MaterialIcons name="person" size={60} color="#ffffff" />
                <Text style={styles.loadingText}>사용자 정보 로딩 중...</Text>
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.errorContainer}>
                <StatusBar style="light" />
                <MaterialIcons name="error" size={60} color="#ffffff" />
                <Text style={styles.errorText}>사용자를 찾을 수 없습니다.</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>돌아가기</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.userContainer}>
                    <View style={styles.userHeader}>
                        <View style={styles.userAvatar}>
                            <MaterialIcons name="person" size={50} color="#9C27B0" />
                        </View>
                        <View style={styles.userBasicInfo}>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.userUsername}>@{user.username}</Text>
                            <Text style={styles.userId}>ID: {user.id}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>연락처 정보</Text>
                        <View style={styles.infoRow}>
                            <MaterialIcons name="email" size={20} color="#9C27B0" />
                            <Text style={styles.infoText}>{user.email}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <MaterialIcons name="phone" size={20} color="#9C27B0" />
                            <Text style={styles.infoText}>{user.phone}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <MaterialIcons name="language" size={20} color="#9C27B0" />
                            <Text style={styles.infoText}>{user.website}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>회사 정보</Text>
                        <View style={styles.infoRow}>
                            <MaterialIcons name="business" size={20} color="#9C27B0" />
                            <Text style={styles.infoText}>{user.company.name}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <MaterialIcons name="format-quote" size={20} color="#9C27B0" />
                            <Text style={styles.infoText}>{user.company.catchPhrase}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>주소 정보</Text>
                        <View style={styles.infoRow}>
                            <MaterialIcons name="location-on" size={20} color="#9C27B0" />
                            <Text style={styles.infoText}>
                                {user.address.street}, {user.address.suite}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <MaterialIcons name="location-city" size={20} color="#9C27B0" />
                            <Text style={styles.infoText}>
                                {user.address.city} {user.address.zipcode}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.editButton]}
                            onPress={() => router.push(`/(users)/edit/${user.id}`)}
                        >
                            <MaterialIcons name="edit" size={20} color="#ffffff" />
                            <Text style={styles.actionButtonText}>수정</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.deleteButton]}
                            onPress={deleteUser}
                        >
                            <MaterialIcons name="delete" size={20} color="#ffffff" />
                            <Text style={styles.actionButtonText}>삭제</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9C27B0',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#ffffff',
        marginTop: 20,
        marginBottom: 30,
        textAlign: 'center',
    },
    backButton: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#9C27B0',
    },
    content: {
        flex: 1,
    },
    userContainer: {
        backgroundColor: '#ffffff',
        margin: 15,
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    userHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    userAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E1BEE7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    userBasicInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    userUsername: {
        fontSize: 16,
        color: '#9C27B0',
        marginBottom: 5,
    },
    userId: {
        fontSize: 12,
        color: '#999',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 5,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 10,
        flex: 1,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 10,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
    },
    editButton: {
        backgroundColor: '#4CAF50',
    },
    deleteButton: {
        backgroundColor: '#F44336',
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});
