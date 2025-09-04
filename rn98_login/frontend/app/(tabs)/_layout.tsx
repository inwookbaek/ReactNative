// app/(tabs)/_layout.tsx
import { router, Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useUser } from '../contexts/UserContext'
import { useEffect } from 'react';

export default function TabLayout() {

  const { user } = useUser();

  useEffect(() => {
    // 로그인 상태에 따라 초기 화면 설정
    if (!user?.isLoggedIn) {
      router.replace('/(tabs)/users');
    } else {
      router.replace('/(tabs)/home');
    }
  }, [user?.isLoggedIn]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2e7d32', // 초록색 계열
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle:  styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarShowLabel: true,
      }}
      >
      <Tabs.Screen
        name="home"
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
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
        name="myPage"
        options={{       
          title: '마이페이지',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
          // 로그인 안 했을 때 아이콘 숨김
          // tabBarButton: user.isLoggedIn ? (props) => { console.log('로그인 했음') } : () => null,
          // tabBarButton: user.isLoggedIn ? (props) => {
          //   // 마이페이지는 아이콘과 텍스트가 위아래로 분리되어 이상한 간격을 보이는 현상이 있음
          //   // 로그인 안 했을 때 아이콘을 비활성화
          //   // TouchableOpacity는 onXxx에 null 값을 허용하지 않아서 에러 발생방지를 위해 undefined로 변환
          //   const { delayLongPress, onBlur, onFocus, onLongPress, onPressIn, onPressOut, onPress, ...restProps } = props;
          //   return (
          //     <TouchableOpacity
          //       {...restProps as any} // Type assertion to any to bypass the ref type incompatibility
          //       delayLongPress={delayLongPress}
          //       onBlur={onBlur}
          //       onFocus={onFocus}
          //       onLongPress={onLongPress ?? undefined}  // null을 undefined로 변환
          //       onPressIn={onPressIn ?? undefined}
          //       onPressOut={onPressOut ?? undefined}
          //       onPress={onPress ?? undefined}
          //       disabled={!user.isLoggedIn}
          //       style={{ opacity: !user.isLoggedIn ? 0.3 : 1 }}
          //     />
          //   );
          // } : () => null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    
  },
  tabBarLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
});