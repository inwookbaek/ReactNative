import { Text, View, StyleSheet } from "react-native";

export default function Write() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Write</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'mediumpurple',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});