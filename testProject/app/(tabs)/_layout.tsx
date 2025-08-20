import { Tabs } from "expo-router";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#8E8E93',
                tabBarStyle: {
                    backgroundColor: '#F2F2F7',
                    borderTopWidth: 1,
                    borderTopColor: '#C6C6C8',
                },
            }}
        >
          <Tabs.Screen 
            name="home" 
            options={{ 
              title: "Home",
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons 
                  name="home" 
                  size={focused ? size + 5 : size} // 활성 시 크기 증가
                  color={focused ? '#007AFF' : color} // 활성 시 파란색
                />
              ),
            }} 
          />
          <Tabs.Screen 
            name="users" 
            options={{ 
              title: "Users",
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialIcons 
                  name="people" 
                  size={focused ? size + 2 : size}
                  color={focused ? '#9C27B0' : color}
                />
              ),
            }} 
          />          
          <Tabs.Screen 
            name="post" 
            options={{ 
              title: "Post",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="article" size={size} color={color} />
              ),
            }} 
          />
          <Tabs.Screen 
            name="write" 
            options={{ 
              title: "Write",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome 
                  name="edit" 
                  size={size} 
                  color={color}
                  style={{
                    textShadowColor: 'rgba(0, 0, 0, 0.3)',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
                    transform: [{ rotate: '5deg' }],
                  }}
                />
              ),
            }} 
          />
          <Tabs.Screen 
            name="board" 
            options={{ 
              title: "Board",
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialIcons 
                  name="dashboard" 
                  size={focused ? size + 2 : size}
                  color={focused ? '#FF4500' : color}
                />
              ),
            }} 
          />
          <Tabs.Screen 
            name="drawer" 
            options={{ 
              title: "Drawer",
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialIcons 
                  name="menu" 
                  size={focused ? size + 3 : size}
                  color={focused ? '#6A5ACD' : color}
                />
              ),
            }} 
          />
        </Tabs>
    )
}