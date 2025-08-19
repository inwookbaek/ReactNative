import { Text, View } from "react-native";

export default function Dog() {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
            margin: 16,
            backgroundColor: 'yellow',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
        }}>
            <Text>호두(비숑프리제)</Text>
            <Text>2022년 1월 1일</Text>
            <Text>남성</Text>
            <Text>중성화</Text>
            <Text>5kg</Text>
        </View>
    );
}