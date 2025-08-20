import React from 'react';
import { Pressable } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarStyle: { display: 'none' },
        tabBarActiveTintColor: '#3498db',
        tabBarShowLabel: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="dbConnection"
        options={{
          title: 'DB연결',
          tabBarIcon: ({ color }) => <MaterialIcons name="storage" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: '사용자',
          tabBarIcon: ({ color }) => <MaterialIcons name="people" size={28} color={color} />,
          headerRight: () => (
            <Pressable onPress={() => router.push('/user/create')}>
              {({ pressed }) => (
                <MaterialIcons
                  name="add-circle-outline"
                  size={25}
                  color="#3498db"
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="board"
        options={{
          title: '게시판',
          tabBarIcon: ({ color }) => <MaterialIcons name="list-alt" size={28} color={color} />,
          headerRight: () => (
            <Pressable onPress={() => router.push('/post/create')}>
              {({ pressed }) => (
                <MaterialIcons
                  name="add-circle-outline"
                  size={25}
                  color="#3498db"
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: '마이페이지',
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
