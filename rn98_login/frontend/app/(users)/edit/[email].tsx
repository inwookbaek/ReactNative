import React, { useCallback, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { API_URL } from "../../contexts/appConfig";
import { Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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

export default function EditUser() {

  //const email = useLocalSearchParams().email; // type error발생생
  const { email } = useLocalSearchParams<{ email: string }>();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [changeEmail, setChangeEmail] = useState(email);

  const getUser = useCallback(async () => {
    try {
      const { data: user } = await axios.get(`${API_URL}/users/${email}`);
      setName(user.name);
      setUsername(user.username);
      setPhone(user.phone);
      setWebsite(user.website);
      setCompanyName(user.company.name);
      setCatchPhrase(user.company.catchPhrase);
      setStreet(user.address.street);
      setCity(user.address.city);
      setZipcode(user.address.zipcode);
    } catch (_) {
      Alert.alert('오류', '사용자 정보를 불러오는데 실패했습니다.');
    } finally {
      setInitialLoading(false);
    }
  }, [email])

  useEffect(() => {
    getUser();
  }, [email, getUser])

  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
          <StatusBar barStyle="light-content" />
          <MaterialIcons name="person" size={60} color="#ffffff" />
          <Text style={styles.loadingText}>사용자 정보 로딩 중...</Text>
      </View>
    );
  }
  
  const checkDupEmail = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/users/dup/${changeEmail}`);
      if (data.count > 0) {
        Alert.alert('오류', '이미 사용 중인 이메일입니다.');
      } else {
        setIsEditingEmail(false);
      }
    } catch (_) {
      Alert.alert('오류', '이메일 중복 확인 중 오류가 발생했습니다.');
    }
  }

  const checkDupUsername = async () => {
    const { data } = await axios.get(`${API_URL}/users/dup/${username}`);
    if (data.count > 0) {
      Alert.alert('오류', '이미 사용 중인 별명입니다.');
    } 
  }
  const updateUser = async () => {  

    if (!name.trim() || !username.trim() || !email.trim()) {
      Alert.alert('오류', '이름, 별명, 이메일은 필수 입력 항목입니다.');
      return;
    }

    setLoading(true);

    try {
      await axios.put(`${API_URL}/users/${email}`, {
        name: name.trim(),
        username: username.trim(),
        email: changeEmail.trim(),
        phone: phone.trim(),
        website: website.trim(),
        company: {
            name: companyName.trim(),
            catchPhrase: catchPhrase.trim(),
            bs: "",
        },
        address: {
            street: street.trim(),
            suite: "",
            city: city.trim(),
            zipcode: zipcode.trim(),
            geo: {
                lat: "0",
                lng: "0",
            },
        },
    });

      Alert.alert('성공', '사용자 정보가 수정되었습니다.', [
        { text: '확인', onPress: () => router.push('/users') }
      ]);
    } catch (_) {
      Alert.alert('오류', '사용자 정보 수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    // KeyboardAvoidingView
    // 키보드가 화면을 가리는 문제를 해결하기 위한 컴포넌트, iOS에서만 효과
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            {!isEditingEmail ? <Text style={styles.sectionTitle}>{changeEmail}</Text> :
              <View>
                <TextInput   
                  style={[styles.input, { marginTop: 10, marginBottom: 10, minWidth: '90%' }]}            
                  value={changeEmail}
                  onChangeText={setChangeEmail}
                  onBlur={checkDupEmail}
                  placeholder="이메일을 입력하세요"
                  keyboardType="email-address"
                />
              </View>
            }
            <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setIsEditingEmail(!isEditingEmail);
                  if (!isEditingEmail) {
                    setChangeEmail(changeEmail);
                  }
                }}
            >
                <MaterialIcons name="edit" size={20} color="#4CAF50" />
            </TouchableOpacity>
          </View>

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
            <Text style={styles.label}>별명 *</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                onBlur={checkDupUsername}
                placeholder="별명을 입력하세요"
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
              onPress={() => router.push('/users')}
            >
              <MaterialIcons name="cancel" size={20} color="#666" />
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.submitButton, loading && styles.disabledButton]}
              onPress={updateUser}
              disabled={loading}
            >
              <MaterialIcons name="save" size={20} color="#ffffff" />
              <Text style={styles.submitButtonText}>
                  {loading ? '수정 중...' : '수정완료'}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9C27B0',
  },
  loadingText: {
      color: '#ffffff',
      fontSize: 20,
      marginTop: 20,
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
  editButton: {
    padding: 5,
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
