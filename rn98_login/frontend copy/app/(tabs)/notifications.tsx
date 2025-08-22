import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: '새로운 메시지',
      message: '사용자님, 안녕하세요! 새로운 업데이트가 있습니다.',
      time: '방금 전',
      isRead: false,
    },
    {
      id: '2',
      title: '좋아요 알림',
      message: '사용자님이 게시물을 좋아합니다.',
      time: '1시간 전',
      isRead: true,
    },
    {
      id: '3',
      title: '팔로우 알림',
      message: '새로운 팔로워가 생겼습니다.',
      time: '3시간 전',
      isRead: true,
    },
  ]);

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <View style={[styles.notificationItem, !item.isRead && styles.unreadItem]}>
      <MaterialIcons 
        name="notifications" 
        size={24} 
        color={item.isRead ? '#999' : '#2e7d32'} 
        style={styles.icon}
      />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>알림</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    padding: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  unreadItem: {
    backgroundColor: '#f8f9f8',
  },
  icon: {
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  notificationMessage: {
    color: '#555',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});
