import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

export default function Profile() {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <MaterialIcons name="account-circle" size={100} color="#ffffff" />
            <Text style={styles.title}>Profile Page</Text>
            <Text style={styles.subtitle}>사용자 프로필 정보</Text>
            
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <MaterialIcons name="person" size={24} color="#ffffff" />
                    <Text style={styles.infoText}>홍길동</Text>
                </View>
                <View style={styles.infoRow}>
                    <MaterialIcons name="email" size={24} color="#ffffff" />
                    <Text style={styles.infoText}>hong@example.com</Text>
                </View>
                <View style={styles.infoRow}>
                    <MaterialIcons name="phone" size={24} color="#ffffff" />
                    <Text style={styles.infoText}>010-1234-5678</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6A5ACD',
        padding: 20,
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
