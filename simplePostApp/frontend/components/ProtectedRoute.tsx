import { auth } from "@/firebase/config";
import WelcomeScreen from "@/components/screens/WelcomeScreeen";
import OnboardingScreen from "./screens/OnboardingScreen";

// ProtectedRoute : 로그인 하지 않은 사용자가 처음 마주하는 화면
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // currentUser : 로그인 여부를 알려줌
  // 로그인 되어 있으면 children을 보여주고
  // 로그인 되어 있지 않으면 null
  const user = auth.currentUser;
  
  if (!user) {
    return <OnboardingScreen />;
  }

  return <>{children}</>;
}
