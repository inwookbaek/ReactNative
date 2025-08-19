// components/Step1_TextProp.tsx
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';

type Props = {
  message?: string;
  style?: StyleProp<ViewStyle>;
};

export default function Step01_TextProp({ message }: Props) {
  const params = useLocalSearchParams<{ message?: string }>();
  const finalMessage = params.message ?? message ?? 'Step01_TextProp';

  return (
    <View style={[styles.container]}>
      <Text  style={styles.text}>{finalMessage}</Text>
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
    backgroundColor: "mediumseagreen",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});