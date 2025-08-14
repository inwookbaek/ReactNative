// d:\ReactNative\rn02_props_01\app\components\Step04_StyleProp.tsx
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Step04_StyleProp() {
  const { color, lineWidth } = useLocalSearchParams<{ color?: string; lineWidth?: string }>();

  const parsedWidth = Number(lineWidth);
  const safeWidth = Number.isFinite(parsedWidth) && parsedWidth > 0 ? parsedWidth : 2;
  const safeColor = typeof color === "string" && color.trim().length > 0 ? color : "gray";

  const boxStyle = { borderColor: safeColor, borderWidth: safeWidth } as const;

  return (
    <View style={styles.container}>
      <View style={[{ width: 100, height: 100, backgroundColor: "gray" }, boxStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
});