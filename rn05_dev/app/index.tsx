import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { StackHeaderProps } from '@react-navigation/stack';

function LogoTitle(props: StackHeaderProps) {
  return (
    <Image 
      style={styles.image} 
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
      {...props}
    />
  );
}

export default function Home() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'My home',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          header: (props: StackHeaderProps) => <LogoTitle {...props} />,
        }}
      />
      <Text>Home Screen</Text>
      <Link href={{ pathname: "/details", params: { name: "Bacon" } }}>Go to Details</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});
