import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function DrawerHome() {
    const goToTabHome = () => {
        // 탭의 Home 페이지로 이동
        router.push("/(tabs)/home");
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <MaterialIcons name="home" size={100} color="#ffffff" />
            <Text style={styles.title}>Drawer Home</Text>
            <Text style={styles.subtitle}>Drawer Navigation의 Home 페이지</Text>
            
            <TouchableOpacity style={styles.button} onPress={goToTabHome}>
                <MaterialIcons name="tab" size={24} color="#6A5ACD" />
                <Text style={styles.buttonText}>탭 Home으로 이동</Text>
            </TouchableOpacity>

            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                    이 페이지는 Drawer Navigation 내의 Home 페이지입니다.
                </Text>
                <Text style={styles.infoText}>
                    버튼을 클릭하면 탭의 Home 페이지로 이동할 수 있습니다.
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2E8B57',
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
        color: '#E6FFE6',
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6A5ACD',
        marginLeft: 8,
    },
    infoContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        padding: 20,
        maxWidth: 300,
    },
    infoText: {
        fontSize: 14,
        color: '#E6FFE6',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 10,
    },
});
