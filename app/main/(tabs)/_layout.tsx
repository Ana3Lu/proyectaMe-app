import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#E5E5E5",
          height: 70 + insets.bottom,
          paddingBottom: 10 + insets.bottom,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
        },
      })}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: "Inicio",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="home"
              size={28}
              color={focused ? "#2F32CD" : "#999"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="SimulationsScreen"
        options={{
          title: "Simulaciones",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="brain"
              size={24}
              color={focused ? "#2F32CD" : "#999"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="MapScreen"
        options={{
          title: "Mapa",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="map"
              size={26}
              color={focused ? "#2F32CD" : "#999"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Comunidad"
        options={{
          title: "Comunidad",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="forum"
              size={26}
              color={focused ? "#2F32CD" : "#999"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={focused ? "person" : "person-outline"}
              size={26}
              color={focused ? "#2F32CD" : "#999"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
