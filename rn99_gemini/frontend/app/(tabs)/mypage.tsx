import React, { useState } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { Button, Text } from 'react-native-paper';
import LoginForm from '../components/login';

// 마이페이지 화면
export default function MyPageScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>마이페이지</Text>
      <Button mode="contained" onPress={() => setModalVisible(true)} style={styles.openLoginButton}>
        로그인 창 열기
      </Button>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
            <LoginForm 
              onClose={() => setModalVisible(false)} 
              onLoginSuccess={() => setModalVisible(false)}
            />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  openLoginButton: {
    marginTop: 10,
    paddingVertical: 5,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
});