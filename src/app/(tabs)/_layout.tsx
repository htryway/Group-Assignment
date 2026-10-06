import React from "react";
import { Text } from "react-native";
import { Tabs } from "expo-router";
import { colors } from "../../theme/colors";

const ICONS: Record<string, string> = {
  index: "🏠",
  packages: "📦",
  experiences: "🎮",
  fees: "🧾",
  profile: "👤",
};

// This is the Expo Router equivalent of MainTabs.js. Each <Tabs.Screen name="x">
// maps to a file in this same (tabs) folder — "index" maps to index.tsx (Home).
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.cyan,
        tabBarInactiveTintColor: colors.grey,
        tabBarStyle: { backgroundColor: colors.charcoal, borderTopColor: colors.border },
        tabBarIcon: () => <Text style={{ fontSize: 18 }}>{ICONS[route.name]}</Text>,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="packages" options={{ title: "Packages" }} />
      <Tabs.Screen name="experiences" options={{ title: "Experiences" }} />
      <Tabs.Screen name="fees" options={{ title: "Fees" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
