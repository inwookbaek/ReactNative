import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from 'react-native-paper';
import { UserProvider } from './contexts/UserContext';

export default function RootLayout() {
  return (
    <UserProvider>
      <PaperProvider>
        <View style={styles.container}>
          <Stack
            screenOptions={{
              headerShown: false,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerBackButtonDisplayMode: 'default',
            }}
          />
        </View>
      </PaperProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 25,
  },
});
