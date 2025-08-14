import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import axios from 'axios';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export default function PostDetail() {
    const { id } = useLocalSearchParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            setPost(data);
        } catch (error) {
            Alert.alert('오류', '게시글을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async () => {
        Alert.alert(
            '삭제 확인',
            '이 게시글을 삭제하시겠습니까?',
            [
                { text: '취소', style: 'cancel' },
                {
                    text: '삭제',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
                            Alert.alert('성공', '게시글이 삭제되었습니다.', [
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
                <MaterialIcons name="article" size={60} color="#ffffff" />
                <Text style={styles.loadingText}>게시글 로딩 중...</Text>
            </View>
        );
    }

    if (!post) {
        return (
            <View style={styles.errorContainer}>
                <StatusBar style="light" />
                <MaterialIcons name="error" size={60} color="#ffffff" />
                <Text style={styles.errorText}>게시글을 찾을 수 없습니다.</Text>
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
                <View style={styles.postContainer}>
                    <View style={styles.postHeader}>
                        <Text style={styles.postId}>#{post.id}</Text>
                        <Text style={styles.userId}>작성자 ID: {post.userId}</Text>
                    </View>

                    <Text style={styles.title}>{post.title}</Text>
                    <Text style={styles.body}>{post.body}</Text>

                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.editButton]}
                            onPress={() => router.push(`/(board)/edit/${post.id}`)}
                        >
                            <MaterialIcons name="edit" size={20} color="#ffffff" />
                            <Text style={styles.actionButtonText}>수정</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.deleteButton]}
                            onPress={deletePost}
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
        backgroundColor: '#FF4500',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF4500',
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
        backgroundColor: '#FF4500',
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
        color: '#FF4500',
    },
    content: {
        flex: 1,
    },
    postContainer: {
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
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    postId: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF4500',
    },
    userId: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        lineHeight: 28,
    },
    body: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 30,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
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
