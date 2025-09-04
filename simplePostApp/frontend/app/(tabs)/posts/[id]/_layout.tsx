import { Stack, useLocalSearchParams } from "expo-router";

export default function PostLayout() {
  const { postId } = useLocalSearchParams();

  return (
    // <Stack screenOptions={{ title: `${postId} 번 게시글` }} />
    <Stack screenOptions={{ headerShown: false }} />
  );
}