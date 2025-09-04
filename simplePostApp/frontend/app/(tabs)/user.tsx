import { Text, StyleSheet, View } from "react-native";

export default function User() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>User</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#548D95',
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },  
});