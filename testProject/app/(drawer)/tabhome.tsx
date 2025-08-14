import { Redirect } from "expo-router";

export default function TabHome() {
    // 직접 탭의 Home 페이지로 리다이렉트
    return <Redirect href="/(tabs)/home" />;
}
