import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BookingProvider } from "../context/BookingContext";
import { UserProvider } from "../context/UserContext";
import { colors } from "../theme/colors";

// This file is the Expo Router equivalent of the old RootNavigator.js.
// Instead of listing <Stack.Screen name="X" component={X} /> by hand,
// each route is just a file under app/ — the folder structure *is* the
// navigator. Screen order/history is driven by which file you push to.
export default function RootLayout() {
  return (
    <UserProvider>
      <BookingProvider>
        {/* backgroundColor isn't in newer expo-status-bar's StatusBarProps —
            Android status bar color is handled via app.json / edge-to-edge now. */}
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.charcoal },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="package/[id]" />
          <Stack.Screen name="booking-summary" />
          <Stack.Screen name="confirmation" />
          <Stack.Screen name="about" />
          <Stack.Screen name="contact" />
        </Stack>
      </BookingProvider>
    </UserProvider>
  );
}
