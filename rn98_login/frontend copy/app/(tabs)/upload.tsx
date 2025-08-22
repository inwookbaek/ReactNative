import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function UploadScreen() {
  const handleUpload = () => {
    // TODO: 업로드 로직 구현
    alert('업로드 기능이 준비 중입니다.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.uploadArea}>
        <MaterialIcons name="cloud-upload" size={64} color="#2e7d32" />
        <Text style={styles.uploadText}>사진 또는 동영상을 업로드하세요</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text style={styles.uploadButtonText}>파일 선택</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  uploadArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
  },
  uploadText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  },
  uploadButton: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
