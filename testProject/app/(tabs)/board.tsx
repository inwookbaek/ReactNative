import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import { router } from "expo-router";
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

export default function Board() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;
    const totalPosts = 100; // JSONPlaceholder는 총 100개 포스트

    // 페이지네이션용 게시글 조회
    const fetchPosts = useCallback(async (page: number = 1) => {
        try {
            setLoading(true);
            
            const { data } = await api.get('/posts');
            
            // 최신순으로 정렬 (id 내림차순)
            const sortedData = data.sort((a: Post, b: Post) => b.id - a.id);
            
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedData = sortedData.slice(startIndex, endIndex);
            
            setPosts(paginatedData);
            setCurrentPage(page);
            setTotalPages(Math.ceil(totalPosts / pageSize));
        } catch (error) {
            Alert.alert('오류', '게시글을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts(1);
    }, [fetchPosts]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchPosts(currentPage);
    };

    const deletePost = async (id: number) => {
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
                            await api.delete(`/posts/${id}`);
                            setPosts(posts.filter(post => post.id !== id));
                            Alert.alert('성공', '게시글이 삭제되었습니다.');
                        } catch (error) {
                            Alert.alert('오류', '삭제에 실패했습니다.');
                        }
                    }
                }
            ]
        );
    };

    // 페이지 이동 함수들
    const goToFirstPage = () => {
        if (currentPage !== 1) {
            fetchPosts(1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            fetchPosts(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            fetchPosts(currentPage + 1);
        }
    };

    const goToLastPage = () => {
        if (currentPage !== totalPages) {
            fetchPosts(totalPages);
        }
    };

    const goToPage = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            fetchPosts(page);
        }
    };

    // 페이지 번호 생성 (현재 페이지 주변 5개 표시)
    const generatePageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        // 끝에서부터 계산해서 start 조정
        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const renderPost = ({ item }: { item: Post }) => (
        <TouchableOpacity 
            style={styles.postItem}
            onPress={() => router.push(`/(board)/detail/${item.id}`)}
        >
            <View style={styles.postHeader}>
                <Text style={styles.postTitle} numberOfLines={1}>
                    <Text style={{ color: '#ccc', fontWeight: '600' }}>[#{item.id}]  </Text>
                    {item.title}
                </Text>
                <View style={styles.postActions}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => router.push(`/(board)/edit/${item.id}`)}
                    >
                        <MaterialIcons name="edit" size={20} color="#4CAF50" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deletePost(item.id)}
                    >
                        <MaterialIcons name="delete" size={20} color="#F44336" />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.postBody} numberOfLines={3}>
                {item.body}
            </Text>
            <Text style={styles.postUser}>작성자 ID: {item.userId}</Text>
        </TouchableOpacity>
    );

    // 페이지네이션 렌더링
    const renderPagination = () => {
        const pageNumbers = generatePageNumbers();

        return (
            <View style={styles.paginationContainer}>
                {/* 처음 버튼 */}
                <TouchableOpacity
                    style={[
                        styles.paginationButton,
                        styles.iconButton,
                        currentPage === 1 && styles.paginationButtonDisabled
                    ]}
                    onPress={goToFirstPage}
                    disabled={currentPage === 1}
                >
                    <MaterialIcons 
                        name="first-page" 
                        size={14} 
                        color={currentPage === 1 ? '#ccc' : '#333'} 
                    />
                </TouchableOpacity>

                {/* 이전 버튼 */}
                <TouchableOpacity
                    style={[
                        styles.paginationButton,
                        styles.iconButton,
                        currentPage === 1 && styles.paginationButtonDisabled
                    ]}
                    onPress={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    <MaterialIcons 
                        name="chevron-left" 
                        size={16} 
                        color={currentPage === 1 ? '#ccc' : '#333'} 
                    />
                </TouchableOpacity>

                {/* 페이지 번호들 */}
                {pageNumbers.map((pageNum) => (
                    <TouchableOpacity
                        key={pageNum}
                        style={[
                            styles.paginationButton,
                            styles.pageNumberButton,
                            currentPage === pageNum && styles.paginationButtonActive
                        ]}
                        onPress={() => goToPage(pageNum)}
                    >
                        <Text style={[
                            styles.paginationText,
                            currentPage === pageNum && styles.paginationTextActive
                        ]}>
                            {pageNum}
                        </Text>
                    </TouchableOpacity>
                ))}

                {/* 다음 버튼 */}
                <TouchableOpacity
                    style={[
                        styles.paginationButton,
                        styles.iconButton,
                        currentPage === totalPages && styles.paginationButtonDisabled
                    ]}
                    onPress={goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    <MaterialIcons 
                        name="chevron-right" 
                        size={16} 
                        color={currentPage === totalPages ? '#ccc' : '#333'} 
                    />
                </TouchableOpacity>

                {/* 마지막 버튼 */}
                <TouchableOpacity
                    style={[
                        styles.paginationButton,
                        styles.iconButton,
                        currentPage === totalPages && styles.paginationButtonDisabled
                    ]}
                    onPress={goToLastPage}
                    disabled={currentPage === totalPages}
                >
                    <MaterialIcons 
                        name="last-page" 
                        size={14} 
                        color={currentPage === totalPages ? '#ccc' : '#333'} 
                    />
                </TouchableOpacity>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <StatusBar style="light" />
                <MaterialIcons name="dashboard" size={60} color="#ffffff" />
                <Text style={styles.loadingText}>게시글 로딩 중...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>게시판</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push('/(board)/create')}
                >
                    <MaterialIcons name="add" size={24} color="#ffffff" />
                </TouchableOpacity>
            </View>
            
            <View style={styles.content}>
                <FlatList
                    data={posts}
                    renderItem={renderPost}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.postsList}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    showsVerticalScrollIndicator={false}
                />
                
                {/* 페이지네이션 */}
                {renderPagination()}
                
                {/* 페이지 정보 */}
                <View style={styles.pageInfo}>
                    <Text style={styles.pageInfoText}>
                        페이지 {currentPage} / {totalPages} (전체 {totalPosts}개)
                    </Text>
                </View>

            </View>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#FF4500',
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
    content: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    postsList: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    postItem: {
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
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        marginRight: 10,
    },
    postActions: {
        flexDirection: 'row',
        gap: 5,
    },
    editButton: {
        padding: 5,
    },
    deleteButton: {
        padding: 5,
    },
    postBody: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 10,
    },
    postUser: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: 30,
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: '#f5f5f5',
        flexWrap: 'wrap',
        gap: 5,
    },
    paginationButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ddd',
        minWidth: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageNumberButton: {
        minWidth: 32,
    },
    iconButton: {
        minWidth: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationButtonActive: {
        backgroundColor: '#87CEEB',
        borderColor: '#87CEEB',
    },
    paginationButtonDisabled: {
        backgroundColor: '#f8f8f8',
        borderColor: '#e0e0e0',
    },
    paginationText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    paginationTextActive: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    paginationTextDisabled: {
        color: '#ccc',
    },
    pageInfo: {
        alignItems: 'flex-end',
        paddingRight: 20, 
        paddingVertical: 10,
        backgroundColor: '#f5f5f5',
    },
    pageInfoText: {
        fontSize: 10,
        color: '#666',
        fontWeight: '500',
    },    
});