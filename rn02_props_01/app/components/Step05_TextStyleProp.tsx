import { Text, StyleSheet, View, TextStyle } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// props로 직접 전달도 가능하고, 네비게이션 params로도 동작하도록 모두 지원
type Props = {
  textColor?: string;
  textSize?: string | number;
  textWeight?: string;
};

export default function Step5_TextStyleProp({ textColor, textSize, textWeight }: Props) {
  const params = useLocalSearchParams<{
    textColor?: string;
    textSize?: string;
    textWeight?: string;
  }>();

  const colorSrc = textColor ?? params.textColor;
  const sizeSrc = textSize ?? params.textSize;
  const weightSrc = textWeight ?? params.textWeight;

  const sizeNum = Number(sizeSrc);
  const safeStyle: TextStyle = {
    color: typeof colorSrc === 'string' && colorSrc.trim().length > 0 ? colorSrc : '#333',
    fontSize: Number.isFinite(sizeNum) && sizeNum > 0 ? sizeNum : 16,
    fontWeight: (weightSrc ?? 'normal') as TextStyle['fontWeight'],
  };

  return (
    <View style={styles.container}>
      <Text style={safeStyle}>스타일 있는 텍스트</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'mediumseagreen',
  },
});