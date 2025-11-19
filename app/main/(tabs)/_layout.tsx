import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#E5E5E5",
          height: 70,
          paddingBottom: 10,
        },
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              fontFamily: focused ? "PoppinsBold" : "PoppinsRegular",
              color: focused ? "#2F32CD" : "#999",
              fontSize: 11,
            }}
          >
            {route.name}
          </Text>
        ),
      })}
    >

      <Tabs.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={focused ? "home" : "home-filled"}
              size={26}
              color={focused ? "#2F32CD" : "#999"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Simulaciones"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={focused ? "psychology" : "psychology-alt"}
              size={26}
              color={focused ? "#2F32CD" : "#999"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Mapa"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={focused ? "map" : "map"} // no tiene una versión outline
              size={26}
              color={focused ? "#2F32CD" : "#999"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Comunidad"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={focused ? "forum" : "forum"}
              size={26}
              color={focused ? "#2F32CD" : "#999"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Perfil"
        options={{
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
