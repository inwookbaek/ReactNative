import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from "expo-router/drawer";
import { MaterialIcons } from "@expo/vector-icons";

export default function DrawerLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#6A5ACD',
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    drawerStyle: {
                        backgroundColor: '#F5F5F5',
                        width: 280,
                    },
                    drawerActiveTintColor: '#6A5ACD',
                    drawerInactiveTintColor: '#666',
                    drawerLabelStyle: {
                        fontSize: 16,
                        fontWeight: '500',
                    },
                }}
            >
                <Drawer.Screen
                    name="home"
                    options={{
                        title: "Home",
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="tabhome"
                    options={{
                        title: "Tab Home",
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="tab" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="person" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="settings"
                    options={{
                        title: "Settings",
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="settings" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="notifications"
                    options={{
                        title: "Notifications",
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="notifications" size={size} color={color} />
                        ),
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
