import { Text, View, StyleProp, ViewStyle, TextStyle } from "react-native"

const Bird = ({ myStyle, textStyle }: { myStyle?: StyleProp<ViewStyle>, textStyle?: StyleProp<TextStyle> }) => {
    return (
      <View style={[
        {
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
        },
         myStyle,
        ]}>
            <Text style={textStyle}>나는야 앵무새</Text>
        </View>
    );
}

export default Bird;
