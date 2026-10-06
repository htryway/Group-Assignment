import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { router } from "expo-router";
import { LogoLockup } from "../components/Logo";
import { colors } from "../theme/colors";

// app/index.tsx is the "/" route — it's what loads first, same job the
// initialRouteName="Splash" stack screen used to do.
export default function SplashScreen() {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(() => router.replace("/onboarding"));
  }, []);

  const width = progress.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });

  return (
    <View style={styles.wrap}>
      <View style={styles.center}>
        <LogoLockup size={110} />
      </View>
      <View style={styles.bottom}>
        <View style={styles.track}>
          <Animated.View style={[styles.fill, { width }]} />
        </View>
        <Text style={styles.loadingText}>Loading arena resources…</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.charcoal, justifyContent: "space-between" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  bottom: { paddingHorizontal: 40, paddingBottom: 60 },
  track: { height: 4, backgroundColor: colors.border, borderRadius: 2, overflow: "hidden" },
  fill: { height: 4, backgroundColor: colors.cyan },
  loadingText: { color: colors.grey, fontSize: 12, textAlign: "center", marginTop: 14 },
});
