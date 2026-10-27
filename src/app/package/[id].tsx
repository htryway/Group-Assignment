import React, { useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { colors, radius } from "../../theme/colors";
import ScreenHeader from "../../components/ScreenHeader";
import Stepper from "../../components/Stepper";
import PrimaryButton from "../../components/PrimaryButton";
import { findItem } from "../../data/packages";
import { itemImages } from "../../data/images";

// [id].tsx is a *dynamic* route — the filename in square brackets becomes a
// URL segment, e.g. /package/ultimate-gamer-pass, and its value is read back
// out with useLocalSearchParams(). This replaces route.params.id.
export default function PackageDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = findItem(id);
  const [qty, setQty] = useState(1);

  if (!item) {
    return (
      <View style={styles.wrap}>
        <ScreenHeader title="NOT FOUND" onBack={() => router.back()} />
        <Text style={styles.body}>That package could not be found.</Text>
      </View>
    );
  }

  const image = itemImages[item.id];

  return (
    <View style={styles.wrap}>
      <ScreenHeader title={item.name.toUpperCase()} onBack={() => router.back()} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        {image ? (
          <Image source={image} style={styles.hero} resizeMode="cover" />
        ) : (
          <View style={styles.heroPlaceholder} />
        )}

        <View style={styles.titleRow}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.badgePill}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        </View>
        <Text style={styles.price}>R{item.price.toLocaleString("en-ZA")}</Text>
        <Text style={styles.summary}>{item.summary}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>What's Included</Text>
        {item.inclusions.map((inc, i) => (
          <View key={i} style={styles.checkRow}>
            <View style={styles.checkDot}>
              <Text style={styles.checkMark}>✓</Text>
            </View>
            <Text style={styles.checkText}>{inc}</Text>
          </View>
        ))}

        <View style={styles.qtyRow}>
          <Text style={styles.sectionTitle}>Select Quantity</Text>
          <Stepper value={qty} onChange={setQty} min={1} />
        </View>
      </ScrollView>

      <View style={styles.stickyBar}>
        <View>
          <Text style={styles.stickyLabel}>TOTAL PRICE</Text>
          <Text style={styles.stickyPrice}>R{(item.price * qty).toLocaleString("en-ZA")}</Text>
        </View>
        <PrimaryButton
          title="Add To Booking"
          style={{ flex: 1, marginLeft: 16 }}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/fees",
              params: { presetId: item.id, presetQty: String(qty) },
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.charcoal },
  body: { color: colors.bodyText, padding: 20 },
  heroPlaceholder: {
    height: 180,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  hero: {
    width: "100%",
    height: 180,
    borderRadius: radius.md,
    marginBottom: 20,
  },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  name: { color: colors.offWhite, fontSize: 22, fontWeight: "800", flex: 1, marginRight: 10 },
  badgePill: { borderWidth: 1, borderColor: colors.magenta, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { color: colors.magenta, fontSize: 11, fontWeight: "700" },
  price: { color: colors.cyan, fontSize: 20, fontWeight: "800", marginTop: 6, marginBottom: 10 },
  summary: { color: colors.bodyText, fontSize: 14, lineHeight: 21 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 20 },
  sectionTitle: { color: colors.offWhite, fontSize: 14, fontWeight: "800", letterSpacing: 0.5, marginBottom: 14 },
  checkRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 12, gap: 10 },
  checkDot: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: "rgba(0,184,217,0.15)",
    alignItems: "center", justifyContent: "center", marginTop: 1,
  },
  checkMark: { color: colors.cyan, fontSize: 11, fontWeight: "800" },
  checkText: { color: colors.bodyText, fontSize: 14, flex: 1, lineHeight: 20 },
  qtyRow: { marginTop: 24 },
  stickyBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.charcoal,
  },
  stickyLabel: { color: colors.grey, fontSize: 10, fontWeight: "700", letterSpacing: 0.5 },
  stickyPrice: { color: colors.cyan, fontSize: 18, fontWeight: "800" },
});
