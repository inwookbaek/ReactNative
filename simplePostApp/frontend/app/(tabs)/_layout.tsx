import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, Tabs } from "expo-router";
import { useRouter } from "expo-router";

export default function TabLayout() {
  const router = useRouter();
  return(
    <Tabs>
      <Tabs.Screen name="home" 
        options={{ 
          headerShown: true, 
          headerTitle: "Home", 
          headerStyle: { backgroundColor: "#fff" }, 
          headerTintColor: "#000",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}/>

      <Tabs.Screen
        name="user"
        options={{
          title: "사용자",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              color={focused ? "black" : "gray"}
              size={24}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}
        listeners={{
          // 탭을 눌렀을 때의 동작을 정의
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/(tabs)/user");
          },
        }}
      /> 
      <Tabs.Screen
        name="posts"
        options={{
          title: "게시글",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="list"
              color={focused ? "black" : "gray"}
              size={24}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}
        listeners={{
          // 탭을 눌렀을 때의 동작을 정의
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/(tabs)/posts/page");
          },
        }}
      /> 
      <Tabs.Screen name="write" 
        options={{ 
          headerShown: true, 
          headerTitle: "Write", 
          headerStyle: { backgroundColor: "#fff" }, 
          headerTintColor: "#000",
          tabBarLabel: "글쓰기", 
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="pencil" color={color} size={size} />
        ), 
      }}/>          
    </Tabs>
  )
}