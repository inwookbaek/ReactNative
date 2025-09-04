import { Redirect } from "expo-router";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Index() {
  return (
    <ProtectedRoute>
      <Redirect href={{ pathname: "/(tabs)/home" }}/>
    </ProtectedRoute>
  );
}
