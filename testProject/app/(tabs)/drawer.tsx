import { Redirect } from "expo-router";

export default function DrawerTab() {
    // drawer 탭을 클릭하면 drawer navigation으로 리다이렉트
    return <Redirect href="/(drawer)/profile" />;
}
