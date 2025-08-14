import React from "react";
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

type User = {
  name: string;
  age: number;
};

export default function Step6_ObjectProp() {
  const params = useLocalSearchParams<{ user?: string }>();
  let parsed: User | null = null;
  if (typeof params.user === "string") {
    try {
      parsed = JSON.parse(params.user) as User;
    } catch (e) {
      parsed = null;
    }
  }

  if (!parsed) {
    return <Text>사용자 데이터가 없습니다.</Text>;
  }

  return (
    <Modal
      visible={true}
      transparent
      animationType="slide"
      onRequestClose={() => router.back()}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>이름: {parsed.name}</Text>
          <Text style={styles.modalText}>나이: {parsed.age}</Text>
          <Pressable style={styles.modalButton} onPress={() => router.back()}>
            <Text style={styles.modalButtonText}>닫기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(162, 216, 212, 0.96)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'rgba(197, 144, 233, 0.75)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 12,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
  },
  modalButton: {
    marginTop: 8,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});