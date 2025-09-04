import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Drawer from "expo-router/drawer";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  return (
    <Drawer>
      <Drawer.Screen name="home" options={{ title: "Home" }} />
      <Drawer.Screen name="profile" options={{ title: "Profile" }} />
    </Drawer>
  );

}