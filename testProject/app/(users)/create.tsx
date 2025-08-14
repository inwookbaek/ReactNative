import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import axios from 'axios';

export default function CreateUser() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [catchPhrase, setCatchPhrase] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [loading, setLoading] = useState(false);

    const createUser = async () => {
        if (!name.trim() || !username.trim() || !email.trim()) {
            Alert.alert('오류', '이름, 사용자명, 이메일은 필수 입력 항목입니다.');
            return;
        }

        setLoading(true);
        try {
            const { data: newUser } = await axios.post('https://jsonplaceholder.typicode.com/users', {
                name: name.trim(),
                username: username.trim(),
                email: email.trim(),
                phone: phone.trim(),
                website: website.trim(),
                company: {
                    name: companyName.trim(),
                    catchPhrase: catchPhrase.trim(),
                    bs: ""
                },
                address: {
                    street: street.trim(),
                    suite: "",
                    city: city.trim(),
                    zipcode: zipcode.trim(),
                    geo: {
                        lat: "0",
                        lng: "0"
                    }
                }
            });

            Alert.alert('성공', '사용자가 등록되었습니다.', [
                { text: '확인', onPress: () => router.back() }
            ]);
        } catch (error) {
            Alert.alert('오류', '사용자 등록에 실패했습니다.');
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
                    <Text style={styles.sectionTitle}>기본 정보</Text>
                    
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>이름 *</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="이름을 입력하세요"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>사용자명 *</Text>
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                            placeholder="사용자명을 입력하세요"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>이메일 *</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="이메일을 입력하세요"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>전화번호</Text>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="전화번호를 입력하세요"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>웹사이트</Text>
                        <TextInput
                            style={styles.input}
                            value={website}
                            onChangeText={setWebsite}
                            placeholder="웹사이트를 입력하세요"
                        />
                    </View>

                    <Text style={styles.sectionTitle}>회사 정보</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>회사명</Text>
                        <TextInput
                            style={styles.input}
                            value={companyName}
                            onChangeText={setCompanyName}
                            placeholder="회사명을 입력하세요"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>회사 슬로건</Text>
                        <TextInput
                            style={styles.input}
                            value={catchPhrase}
                            onChangeText={setCatchPhrase}
                            placeholder="회사 슬로건을 입력하세요"
                        />
                    </View>

                    <Text style={styles.sectionTitle}>주소 정보</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>거리</Text>
                        <TextInput
                            style={styles.input}
                            value={street}
                            onChangeText={setStreet}
                            placeholder="거리를 입력하세요"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>도시</Text>
                        <TextInput
                            style={styles.input}
                            value={city}
                            onChangeText={setCity}
                            placeholder="도시를 입력하세요"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>우편번호</Text>
                        <TextInput
                            style={styles.input}
                            value={zipcode}
                            onChangeText={setZipcode}
                            placeholder="우편번호를 입력하세요"
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
                            onPress={createUser}
                            disabled={loading}
                        >
                            <MaterialIcons name="person-add" size={20} color="#ffffff" />
                            <Text style={styles.submitButtonText}>
                                {loading ? '등록 중...' : '등록완료'}
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
        backgroundColor: '#9C27B0',
    },
    scrollView: {
        flex: 1,
    },
    form: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 20,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
        paddingBottom: 5,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
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
