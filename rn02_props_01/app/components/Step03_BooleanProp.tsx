import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

type Props = {
  isVisible: boolean;
};

export default function Step03_BooleanProp({ isVisible }: Props) {
  const params = useLocalSearchParams<{ isVisible?: string }>();
  const isVisibleFinal = params.isVisible !== undefined
    ? params.isVisible === "true"
    : isVisible;

  return (
    <View style={styles.container}>
      {isVisibleFinal ? <Text>보여요 👀</Text> : <Text>안 보여요 🙈</Text>}
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
});