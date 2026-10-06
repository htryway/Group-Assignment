import React from "react";
import { View, Text, ScrollView, StyleSheet, Linking, Pressable, Platform } from "react-native";
import { router } from "expo-router";
import { WebView } from "react-native-webview";
import { colors, radius } from "../theme/colors";
import ScreenHeader from "../components/ScreenHeader";
import { contact } from "../data/packages";

// Read from a .env file (see README) — EXPO_PUBLIC_ prefix is required for
// Expo to expose an env var to client-side code. Never commit the real key.
const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

// Official Maps Embed API when a key is present. Falls back to the
// keyless "output=embed" form so the screen still works before you've
// set up a key.
const mapEmbedUrl = GOOGLE_MAPS_API_KEY
  ? `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(contact.address)}`
  : `https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`;

function openDirections() {
  const encoded = encodeURIComponent(contact.address);
  const url = Platform.select({
    ios: `maps:0,0?q=${encoded}`,
    android: `geo:0,0?q=${encoded}`,
    default: `https://www.google.com/maps/search/?api=1&query=${encoded}`,
  });
  Linking.openURL(url as string).catch(() => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encoded}`);
  });
}

export default function ContactScreen() {
  return (
    <View style={styles.wrap}>
      <ScreenHeader title="CONTACT & ABOUT" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <View style={styles.mapWrap}>
          <WebView
            source={{ uri: mapEmbedUrl }}
            style={styles.map}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
          />
        </View>
        <Pressable style={styles.directionsBtn} onPress={openDirections}>
          <Text style={styles.directionsText}>Get Directions</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Location & Contact</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>ADDRESS</Text>
          <Text style={styles.cardValue}>{contact.address}</Text>
        </View>

        <View style={styles.row}>
          <Pressable style={[styles.card, styles.rowCard]} onPress={() => Linking.openURL(`tel:${contact.phoneDial}`)}>
            <Text style={styles.cardLabel}>PHONE</Text>
            <Text style={styles.cardValue}>{contact.phone}</Text>
          </Pressable>
          <Pressable style={[styles.card, styles.rowCard]} onPress={() => Linking.openURL(`mailto:${contact.email}`)}>
            <Text style={styles.cardLabel}>EMAIL</Text>
            <Text style={styles.cardValue}>{contact.email}</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Arena Hours</Text>
        <View style={styles.card}>
          {contact.hours.map((h) => (
            <View key={h.day} style={styles.hourRow}>
              <Text style={styles.hourDay}>{h.day}</Text>
              <Text style={styles.hourTime}>{h.time}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Follow The Arena</Text>
        <View style={styles.socialRow}>
          {["Facebook", "Instagram", "Twitter", "YouTube"].map((s) => (
            <View key={s} style={styles.socialPill}>
              <Text style={styles.socialText}>{s[0]}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.charcoal },
  mapWrap: {
    height: 180,
    borderRadius: radius.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  map: { flex: 1 },
  directionsBtn: {
    backgroundColor: colors.cyan,
    borderRadius: radius.sm,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  directionsText: { color: colors.charcoal, fontWeight: "800", fontSize: 14 },
  sectionTitle: { color: colors.offWhite, fontSize: 13, fontWeight: "800", letterSpacing: 0.5, marginBottom: 12, marginTop: 8 },
  card: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.sm, padding: 14, marginBottom: 12,
  },
  cardLabel: { color: colors.cyan, fontSize: 10, fontWeight: "800", letterSpacing: 0.5, marginBottom: 6 },
  cardValue: { color: colors.offWhite, fontSize: 14, lineHeight: 20 },
  row: { flexDirection: "row", gap: 12 },
  rowCard: { flex: 1 },
  hourRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
  hourDay: { color: colors.bodyText, fontSize: 13 },
  hourTime: { color: colors.offWhite, fontSize: 13, fontWeight: "600" },
  socialRow: { flexDirection: "row", gap: 12 },
  socialPill: {
    width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: colors.cyan,
    alignItems: "center", justifyContent: "center",
  },
  socialText: { color: colors.cyan, fontWeight: "800" },
});
