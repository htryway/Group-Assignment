import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { colors, radius } from "../theme/colors";
import ScreenHeader from "../components/ScreenHeader";
import PrimaryButton, { SecondaryButton } from "../components/PrimaryButton";
import { useBooking } from "../context/BookingContext";

const fmt = (n: number) => "R" + n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function ConfirmationScreen() {
  const { totals, bookingDetails } = useBooking();

  if (!totals || !bookingDetails) {
    return (
      <View style={styles.wrap}>
        <ScreenHeader title="CONFIRMATION" />
        <Text style={styles.sub}>No confirmed booking found.</Text>
      </View>
    );
  }

  const { date, time, reference } = bookingDetails;

  return (
    <View style={styles.wrap}>
      <ScreenHeader title="CONFIRMATION" />
      <ScrollView contentContainerStyle={{ padding: 24, alignItems: "center", paddingBottom: 60 }}>
        <View style={styles.checkCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
        <Text style={styles.heading}>Booking Confirmed!</Text>
        <Text style={styles.sub}>Your rig has been successfully locked in.</Text>

        <View style={styles.refCard}>
          <Text style={styles.refLabel}>BOOKING REFERENCE</Text>
          <Text style={styles.refValue}>{reference}</Text>
        </View>

        <View style={styles.qrBox}>
          <Text style={styles.qrPlaceholder}>▦ ▦ ▦{"\n"}▦ ▦ ▦{"\n"}▦ ▦ ▦</Text>
          <Text style={styles.qrLabel}>SCAN AT ENTRANCE</Text>
        </View>

        <View style={styles.detailRow}>
          <Detail label="Date" value={date} />
          <Detail label="Time" value={time} />
          <Detail label="Total Paid" value={fmt(totals.grandTotal)} />
        </View>

        <SecondaryButton title="Add to Calendar" style={{ width: "100%", marginTop: 24 }} />
        <PrimaryButton
          title="Back to Home"
          style={{ width: "100%", marginTop: 12 }}
          onPress={() => router.replace("/(tabs)")}
        />
      </ScrollView>
    </View>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.charcoal },
  checkCircle: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: colors.purple,
    alignItems: "center", justifyContent: "center",
    marginTop: 30, marginBottom: 24,
  },
  checkMark: { color: "#fff", fontSize: 40, fontWeight: "800" },
  heading: { color: colors.offWhite, fontSize: 24, fontWeight: "800", marginBottom: 8 },
  sub: { color: colors.bodyText, fontSize: 13, marginBottom: 28, textAlign: "center" },
  refCard: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, paddingVertical: 18, paddingHorizontal: 32, alignItems: "center", marginBottom: 24,
  },
  refLabel: { color: colors.grey, fontSize: 10, fontWeight: "800", letterSpacing: 0.6, marginBottom: 6 },
  refValue: { color: colors.cyan, fontSize: 20, fontWeight: "800" },
  qrBox: {
    backgroundColor: "#fff", borderRadius: radius.md, padding: 24, alignItems: "center", marginBottom: 24,
  },
  qrPlaceholder: { fontSize: 22, lineHeight: 24, textAlign: "center", letterSpacing: 4 },
  qrLabel: { color: "#111", fontWeight: "800", fontSize: 11, marginTop: 10, letterSpacing: 0.5 },
  detailRow: { flexDirection: "row", justifyContent: "space-around", width: "100%", marginBottom: 10 },
  detailLabel: { color: colors.grey, fontSize: 11, marginBottom: 4 },
  detailValue: { color: colors.offWhite, fontWeight: "700", fontSize: 13 },
});
