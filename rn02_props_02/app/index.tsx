import { View } from "react-native";
import Cafe from "./cafe";
import CatApp from "./catApp";
import App from "./app";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Cafe />
      <CatApp />
      <App />
    </View>
  );
}
