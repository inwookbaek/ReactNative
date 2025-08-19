import { Text, View, StyleSheet } from "react-native";

export default function Post() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Post</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'mediumturquoise',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});