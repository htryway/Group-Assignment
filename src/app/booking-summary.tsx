import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import { router } from "expo-router";
import { colors, radius } from "../theme/colors";
import ScreenHeader from "../components/ScreenHeader";
import PrimaryButton from "../components/PrimaryButton";
import { vatRate } from "../data/packages";
import { useBooking } from "../context/BookingContext";

const fmt = (n: number) => "R" + n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function BookingSummaryScreen() {
  // customer/totals were set on the fees screen and read back here via
  // context, instead of route.params.
  const { customer, totals, setBookingDetails } = useBooking();
  const [date, setDate] = useState("Saturday, 26 September 2026");
  const [time, setTime] = useState("14:00 – 18:00");
  const [notes, setNotes] = useState("");

  if (!customer || !totals) {
    return (
      <View style={styles.wrap}>
        <ScreenHeader title="BOOKING SUMMARY" onBack={() => router.back()} />
        <Text style={styles.body}>
          No booking details found. Please go back and calculate your fees first.
        </Text>
      </View>
    );
  }

  const onConfirm = () => {
    const reference = "NL-2026-" + Math.floor(1000 + Math.random() * 9000);
    setBookingDetails({ date, time, reference });
    router.push("/confirmation");
  };

  return (
    <View style={styles.wrap}>
      <ScreenHeader title="BOOKING SUMMARY" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={styles.heading}>Review Your Booking</Text>

        <View style={styles.card}>
          {totals.lineItems.map((li) => (
            <View key={li.id} style={styles.line}>
              <Text style={styles.lineLabel}>{li.qty} × {li.name}</Text>
              <Text style={styles.lineValue}>{fmt(li.lineTotal)}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.line}>
            <Text style={styles.lineLabel}>Subtotal</Text>
            <Text style={styles.lineValue}>{fmt(totals.subtotal)}</Text>
          </View>
          <View style={styles.line}>
            <Text style={[styles.lineLabel, { color: colors.magenta }]}>
              Squad Discount ({Math.round(totals.discountRate * 100)}%)
            </Text>
            <Text style={[styles.lineValue, { color: colors.magenta }]}>-{fmt(totals.discountAmount)}</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.lineLabel}>VAT ({Math.round(vatRate * 100)}%)</Text>
            <Text style={styles.lineValue}>{fmt(totals.vat)}</Text>
          </View>
          <View style={[styles.line, styles.totalLine]}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>{fmt(totals.grandTotal)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>When</Text>
        <Field label="Preferred Date" value={date} onChangeText={setDate} />
        <Field label="Preferred Time" value={time} onChangeText={setTime} />

        <Text style={styles.sectionTitle}>Anything We Should Know?</Text>
        <TextInput
          style={styles.textarea}
          multiline
          placeholder="Birthday, corporate group, accessibility requirements…"
          placeholderTextColor={colors.grey}
          value={notes}
          onChangeText={setNotes}
        />

        <View style={styles.customerCard}>
          <Text style={styles.customerLabel}>PRIMARY CONTACT</Text>
          <Text style={styles.customerName}>{customer.name}</Text>
          <Text style={styles.customerDetail}>{customer.email}</Text>
          <Text style={styles.customerDetail}>{customer.phone}</Text>
        </View>

        <PrimaryButton
          title={`Confirm Booking — ${fmt(totals.grandTotal)}`}
          onPress={onConfirm}
          style={{ marginTop: 24 }}
        />
      </ScrollView>
    </View>
  );
}

function Field({ label, value, onChangeText }: { label: string; value: string; onChangeText: (v: string) => void }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholderTextColor={colors.grey} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.charcoal },
  body: { color: colors.bodyText, padding: 20 },
  heading: { color: colors.offWhite, fontSize: 22, fontWeight: "800", marginBottom: 16 },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 18,
    marginBottom: 24,
  },
  line: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
  lineLabel: { color: colors.bodyText, fontSize: 13 },
  lineValue: { color: colors.offWhite, fontSize: 13 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 6 },
  totalLine: { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 6, paddingTop: 14 },
  totalLabel: { color: colors.offWhite, fontWeight: "800", fontSize: 15 },
  totalValue: { color: colors.cyan, fontWeight: "800", fontSize: 18 },
  sectionTitle: { color: colors.offWhite, fontSize: 12, fontWeight: "800", letterSpacing: 0.6, marginBottom: 12, marginTop: 6 },
  fieldLabel: { color: colors.bodyText, fontSize: 11, fontWeight: "700", marginBottom: 6 },
  input: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.sm, padding: 13, color: colors.offWhite,
  },
  textarea: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.sm, padding: 13, color: colors.offWhite, minHeight: 90, textAlignVertical: "top",
  },
  customerCard: {
    marginTop: 24, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, padding: 16,
  },
  customerLabel: { color: colors.grey, fontSize: 10, fontWeight: "800", letterSpacing: 0.6, marginBottom: 6 },
  customerName: { color: colors.offWhite, fontWeight: "800", fontSize: 15, marginBottom: 4 },
  customerDetail: { color: colors.bodyText, fontSize: 13 },
});
