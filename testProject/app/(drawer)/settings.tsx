import { Text, View, StyleSheet, Switch } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function Settings() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <MaterialIcons name="settings" size={80} color="#ffffff" />
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>앱 설정 관리</Text>
            
            <View style={styles.settingsContainer}>
                <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                        <MaterialIcons name="dark-mode" size={24} color="#ffffff" />
                        <Text style={styles.settingText}>다크 모드</Text>
                    </View>
                    <Switch
                        value={isDarkMode}
                        onValueChange={setIsDarkMode}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
                    />
                </View>

                <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                        <MaterialIcons name="notifications" size={24} color="#ffffff" />
                        <Text style={styles.settingText}>알림</Text>
                    </View>
                    <Switch
                        value={isNotificationsEnabled}
                        onValueChange={setIsNotificationsEnabled}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isNotificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
                    />
                </View>

                <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                        <MaterialIcons name="location-on" size={24} color="#ffffff" />
                        <Text style={styles.settingText}>위치 서비스</Text>
                    </View>
                    <Switch
                        value={isLocationEnabled}
                        onValueChange={setIsLocationEnabled}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isLocationEnabled ? '#f5dd4b' : '#f4f3f4'}
                    />
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
        backgroundColor: '#4169E1',
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
    settingsContainer: {
        width: '100%',
        maxWidth: 350,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingText: {
        fontSize: 18,
        color: '#ffffff',
        marginLeft: 15,
    },
});
