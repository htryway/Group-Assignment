import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { logoImage } from "../data/images";

/**
 * The real Next Level Gaming logo, from the website's img/logo.jpg —
 * matches style.css's own treatment (.logo img { border-radius: 12px }),
 * scaled to whatever size is requested.
 */
export function LogoBadge({ size = 40 }: { size?: number }) {
  const radius = Math.round(size * 0.27);
  return (
    <Image
      source={logoImage}
      style={{ width: size, height: size, borderRadius: radius }}
      resizeMode="cover"
    />
  );
}

/** Small badge + "NEXT LEVEL / GAMING" — used in every header. */
export function LogoNav({ size = 32 }: { size?: number }) {
  return (
    <View style={styles.navRow}>
      <LogoBadge size={size} />
      <View style={{ marginLeft: 8 }}>
        <Text style={styles.navTitle}>NEXT LEVEL</Text>
        <Text style={styles.navSubtitle}>GAMING</Text>
      </View>
    </View>
  );
}

/** Full lockup — badge + "NEXT LEVEL" + strapline — used on the splash screen. */
export function LogoLockup({ size = 120 }: { size?: number }) {
  return (
    <View style={styles.lockupWrap}>
      <LogoBadge size={size} />
      <Text style={styles.lockupTitle}>NEXT LEVEL</Text>
      <Text style={styles.lockupSubtitle}>GAMING & ESPORTS ARENA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navRow: { flexDirection: "row", alignItems: "center" },
  navTitle: { color: colors.offWhite, fontSize: 15, fontWeight: "700", letterSpacing: 0.3 },
  navSubtitle: { color: colors.cyan, fontSize: 9, fontWeight: "700", letterSpacing: 1.4 },
  lockupWrap: { alignItems: "center" },
  lockupTitle: {
    color: colors.offWhite,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 20,
  },
  lockupSubtitle: {
    color: colors.cyan,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2.5,
    marginTop: 4,
  },
});
