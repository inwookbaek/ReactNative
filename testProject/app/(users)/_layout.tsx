import { Stack } from "expo-router";

export default function UsersLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#9C27B0',
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen 
                name="create" 
                options={{ 
                    title: "새 사용자 등록",
                    presentation: 'modal'
                }} 
            />
            <Stack.Screen 
                name="detail/[id]" 
                options={{ 
                    title: "사용자 상세",
                }} 
            />
            <Stack.Screen 
                name="edit/[id]" 
                options={{ 
                    title: "사용자 수정",
                    presentation: 'modal'
                }} 
            />
        </Stack>
    );
}
