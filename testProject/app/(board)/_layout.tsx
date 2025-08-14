import { Stack } from "expo-router";

export default function BoardLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#FF4500',
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
                    title: "새 게시글 작성",
                    presentation: 'modal'
                }} 
            />
            <Stack.Screen 
                name="detail/[id]" 
                options={{ 
                    title: "게시글 상세",
                }} 
            />
            <Stack.Screen 
                name="edit/[id]" 
                options={{ 
                    title: "게시글 수정",
                    presentation: 'modal'
                }} 
            />
        </Stack>
    );
}
