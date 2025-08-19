import React from "react";
import { StyleProp, Text, View, ViewStyle, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

type Props = {
  style?: StyleProp<ViewStyle>;
  a?: number;
  b?: number;
};

export default function Step02_NumberProp({ style, a, b }: Props) {
  const params = useLocalSearchParams<{ a?: string; b?: string }>();
  const aNum = params.a !== undefined ? Number(params.a) : a ?? 0;
  const bNum = params.b !== undefined ? Number(params.b) : b ?? 0;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>
        {aNum} + {bNum} = {aNum + bNum}
      </Text>
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
    backgroundColor: "#2ecc71",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});