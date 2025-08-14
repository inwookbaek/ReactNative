import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

const notifications = [
    { id: '1', title: '새로운 메시지', message: '홍길동님이 메시지를 보냈습니다.', time: '5분 전', icon: 'message' },
    { id: '2', title: '업데이트 알림', message: '앱이 최신 버전으로 업데이트되었습니다.', time: '1시간 전', icon: 'system-update' },
    { id: '3', title: '이벤트 알림', message: '새로운 이벤트가 시작되었습니다!', time: '2시간 전', icon: 'event' },
    { id: '4', title: '보안 알림', message: '새로운 기기에서 로그인이 감지되었습니다.', time: '1일 전', icon: 'security' },
];

export default function Notifications() {
    const renderNotification = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.notificationItem}>
            <View style={styles.iconContainer}>
                <MaterialIcons name={item.icon as any} size={24} color="#FF6B35" />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <MaterialIcons name="notifications" size={60} color="#ffffff" />
                <Text style={styles.title}>Notifications</Text>
                <Text style={styles.subtitle}>최근 알림 목록</Text>
            </View>
            
            <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={(item) => item.id}
                style={styles.notificationsList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6B35',
    },
    header: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: '#FF6B35',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 10,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#FFE4D6',
        marginBottom: 20,
    },
    notificationsList: {
        flex: 1,
        paddingHorizontal: 20,
    },
    notificationItem: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFE4D6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    contentContainer: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    notificationMessage: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
        lineHeight: 20,
    },
    notificationTime: {
        fontSize: 12,
        color: '#999',
    },
});
