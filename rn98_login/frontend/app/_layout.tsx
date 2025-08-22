import { Slot, Stack } from "expo-router";
import { UserProvider } from "./contexts/UserContext";

// <Slot />은 현재 선택된 화면을 나타냅니다. 예를 들어:
// /home이면 app/home.tsx 컴포넌트가 이 자리에 들어감
// /login이면 app/login.tsx가 들어감
export default function RootLayout() {
  return (
    <UserProvider>
      <Slot />
    </UserProvider>
  );
}
