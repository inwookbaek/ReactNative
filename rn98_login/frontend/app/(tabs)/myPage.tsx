import { Text, View, StyleSheet, StatusBar, Image } from "react-native";
import { useUser } from "../contexts/UserContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function MyPage() {
  const { user } = useUser();
  const [ isImage, setIsImage ] = useState(true);
  const [ imageUri, setImageUri ] = useState(require("../../assets/images/제니.jpg"));

  if (!user.isLoggedIn) {
    return (
      <View style={styles.container}>
        <MaterialIcons name="account-circle" size={100} color="#ffffff" />
        <Text style={styles.title}>로그인을 해주세요.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {isImage ? (
        <Image source={imageUri} style={styles.profileImage} />
      ) : (
        <MaterialIcons name="account-circle" size={100} color="#ffffff" />
      )}
      <Text style={styles.subtitle}>사용자 프로필 정보</Text>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <MaterialIcons name="person" size={24} color="#ffffff" />
          <Text style={styles.infoText}>{user.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={24} color="#ffffff" />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="phone" size={24} color="#ffffff" />
          <Text style={styles.infoText}>{user.phone}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#6A5ACD',
      padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileIcon: {
    marginBottom: 20,
  },
  title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#ffffff',
      marginTop: 20,
      marginBottom: 10,
  },
  subtitle: {
      fontSize: 16,
      color: '#E6E6FA',
      marginBottom: 30,
  },
  infoContainer: {
      width: '100%',
      maxWidth: 300,
  },
  infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      paddingHorizontal: 10,
  },
  infoText: {
      fontSize: 18,
      color: '#ffffff',
      marginLeft: 15,
  },
});
