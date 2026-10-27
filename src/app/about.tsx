import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { colors, radius } from "../theme/colors";
import ScreenHeader from "../components/ScreenHeader";

export default function AboutScreen() {
  return (
    <View style={styles.wrap}>
      <ScreenHeader title="ABOUT US" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <View style={styles.heroPlaceholder} />

        <Text style={styles.eyebrow}>Established 2024</Text>
        <Text style={styles.heading}>About Next Level</Text>
        <Text style={styles.body}>
          Next Level is Africa's premier gaming and esports lifestyle arena. We host over 120
          custom liquid-cooled performance PCs, direct-drive racing cockpits, professional escape
          logic rooms and full immersive room-scale VR simulators.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Our Mission</Text>
          <Text style={styles.cardBody}>
            To empower South African gamers with uncompromising high-performance rigs, professional
            coaching frameworks, and a community space built on competitive integrity and comfort.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Our Vision</Text>
          <Text style={styles.cardBody}>
            To position Johannesburg as the beating heart of competitive esports on the continent,
            producing world-class players backed by top-tier analytical gaming infrastructure.
          </Text>
        </View>

        <View style={styles.statsRow}>
          <Stat label="Gaming Rigs" value="50+" />
          <Stat label="Tournaments / mo" value="12" />
          <Stat label="Members" value="5000+" />
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.charcoal },
  heroPlaceholder: {
    height: 160, borderRadius: radius.md, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, marginBottom: 20,
  },
  eyebrow: { color: colors.cyan, fontSize: 12, fontWeight: "700", marginBottom: 6 },
  heading: { color: colors.offWhite, fontSize: 22, fontWeight: "800", marginBottom: 12 },
  body: { color: colors.bodyText, fontSize: 14, lineHeight: 21, marginBottom: 20 },
  card: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, padding: 16, marginBottom: 14,
  },
  cardTitle: { color: colors.offWhite, fontWeight: "800", fontSize: 15, marginBottom: 8 },
  cardBody: { color: colors.bodyText, fontSize: 13, lineHeight: 20 },
  statsRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 20 },
  statValue: { color: colors.cyan, fontSize: 22, fontWeight: "800" },
  statLabel: { color: colors.grey, fontSize: 11, marginTop: 4 },
});
