import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import axios from 'axios';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState('1');
    const [loading, setLoading] = useState(false);

    const createPost = async () => {
        if (!title.trim() || !body.trim()) {
            Alert.alert('오류', '제목과 내용을 모두 입력해주세요.');
            return;
        }

        setLoading(true);
        try {
            const { data: newPost } = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                title: title.trim(),
                body: body.trim(),
                userId: parseInt(userId),
            });

            Alert.alert('성공', '게시글이 작성되었습니다.', [
                { text: '확인', onPress: () => router.back() }
            ]);
        } catch (error) {
            Alert.alert('오류', '게시글 작성에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar style="light" />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>작성자 ID</Text>
                        <TextInput
                            style={styles.input}
                            value={userId}
                            onChangeText={setUserId}
                            keyboardType="numeric"
                            placeholder="작성자 ID를 입력하세요"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>제목</Text>
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="게시글 제목을 입력하세요"
                            multiline={false}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>내용</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={body}
                            onChangeText={setBody}
                            placeholder="게시글 내용을 입력하세요"
                            multiline={true}
                            numberOfLines={8}
                            textAlignVertical="top"
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={() => router.back()}
                        >
                            <MaterialIcons name="cancel" size={20} color="#666" />
                            <Text style={styles.cancelButtonText}>취소</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.submitButton, loading && styles.disabledButton]}
                            onPress={createPost}
                            disabled={loading}
                        >
                            <MaterialIcons name="send" size={20} color="#ffffff" />
                            <Text style={styles.submitButtonText}>
                                {loading ? '작성 중...' : '작성완료'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF4500',
    },
    scrollView: {
        flex: 1,
    },
    form: {
        padding: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 8,
        gap: 8,
    },
    cancelButton: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    disabledButton: {
        opacity: 0.6,
    },
});
