import { Text, View, ScrollView, Image, TextInput, StyleSheet } from "react-native";
import Cat from "./cat";
import Dog from "./dog";
import Bird from "./bird";

export default function Index() {
  return (
    <ScrollView>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 200, height: 200}}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="You can type in me"
      />
      <Cat />
      <Dog />
      <Dog />
      <Bird />
      <Bird myStyle={{ backgroundColor: 'mediumseagreen' }} textStyle={{ color: 'white', fontSize: 24 }} />
      <Text style={[styles.text]}>🐦 Tweet!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: 'black',
  },
});