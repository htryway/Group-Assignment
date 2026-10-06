import React, { useState, useEffect, useMemo } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { colors, radius } from "../../theme/colors";
import ScreenHeader from "../../components/ScreenHeader";
import Stepper from "../../components/Stepper";
import PrimaryButton from "../../components/PrimaryButton";
import { allItems, discountFor, vatRate } from "../../data/packages";
import { useBooking } from "../../context/BookingContext";

const fmt = (n: number) => "R" + n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function FeesCalculatorScreen() {
  // These come in as real route params, e.g. router.push({ pathname: "/(tabs)/fees",
  // params: { presetId, presetQty } }) from the package detail screen — plain
  // strings are exactly what Expo Router params are good for.
  const { presetId, presetQty } = useLocalSearchParams<{ presetId?: string; presetQty?: string }>();
  const { setCustomer, setTotals } = useBooking();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // selections is an array of { id, qty } — built and read as an array
  // throughout, per the brief's "arrays used correctly" requirement.
  const [selections, setSelections] = useState(allItems.map((item) => ({ id: item.id, qty: 0 })));

  useEffect(() => {
    if (presetId) {
      const qty = presetQty ? parseInt(presetQty, 10) || 1 : 1;
      setSelections((prev) => prev.map((s) => (s.id === presetId ? { ...s, qty } : s)));
    }
  }, [presetId, presetQty]);

  const setQtyFor = (id: string, qty: number) => {
    setSelections((prev) => prev.map((s) => (s.id === id ? { ...s, qty } : s)));
  };

  const totals = useMemo(() => {
    const lineItems = selections
      .filter((s) => s.qty > 0)
      .map((s) => {
        const item = allItems.find((i) => i.id === s.id)!;
        return { ...item, qty: s.qty, lineTotal: item.price * s.qty };
      });

    const totalBookings = lineItems.reduce((sum, li) => sum + li.qty, 0);
    const subtotal = lineItems.reduce((sum, li) => sum + li.lineTotal, 0);
    const discountRate = discountFor(totalBookings);
    const discountAmount = subtotal * discountRate;
    const afterDiscount = subtotal - discountAmount;
    const vat = afterDiscount * vatRate;
    const grandTotal = afterDiscount + vat;

    return { lineItems, totalBookings, subtotal, discountRate, discountAmount, afterDiscount, vat, grandTotal };
  }, [selections]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (!/^[+0-9()\s-]{7,}$/.test(phone.trim())) next.phone = "Enter a valid phone number.";
    if (totals.lineItems.length === 0) next.items = "Select at least one package or experience.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onProceed = () => {
    if (!validate()) return;
    // Complex objects go through context, not through the URL — see
    // src/context/BookingContext.tsx for why.
    setCustomer({ name, email, phone });
    setTotals(totals);
    router.push("/booking-summary");
  };

  return (
    <View style={styles.wrap}>
      <ScreenHeader title="CALCULATE FEES" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={styles.heading}>Calculate Fees</Text>
        <Text style={styles.body}>Build your booking and see the total update as you go.</Text>

        <Text style={styles.sectionTitle}>Your Details</Text>
        <Field label="Full Name" value={name} onChangeText={setName} error={errors.name} placeholder="e.g. Zane van Wyk" />
        <Field label="Email Address" value={email} onChangeText={setEmail} error={errors.email} placeholder="e.g. zane@example.com" keyboardType="email-address" />
        <Field label="Mobile Number" value={phone} onChangeText={setPhone} error={errors.phone} placeholder="e.g. +27 82 555 4321" keyboardType="phone-pad" />

        <Text style={styles.sectionTitle}>Add Items</Text>
        {errors.items && <Text style={styles.errorText}>{errors.items}</Text>}
        {allItems.map((item) => {
          const sel = selections.find((s) => s.id === item.id)!;
          return (
            <View key={item.id} style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>R{item.price.toLocaleString("en-ZA")}</Text>
              </View>
              <Stepper value={sel.qty} onChange={(q) => setQtyFor(item.id, q)} />
            </View>
          );
        })}

        <View style={styles.summaryCard}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>
              {totals.totalBookings > 0
                ? `${totals.totalBookings} BOOKING${totals.totalBookings > 1 ? "S" : ""} — ${Math.round(totals.discountRate * 100)}% DISCOUNT`
                : "NO ITEMS SELECTED"}
            </Text>
          </View>

          {totals.lineItems.map((li) => (
            <SummaryLine key={li.id} label={`${li.qty} × ${li.name}`} value={fmt(li.lineTotal)} />
          ))}
          <SummaryLine label="Subtotal" value={fmt(totals.subtotal)} />
          <SummaryLine label={`Discount (${Math.round(totals.discountRate * 100)}%)`} value={`-${fmt(totals.discountAmount)}`} isDiscount />
          <SummaryLine label="After Discount" value={fmt(totals.afterDiscount)} />
          <SummaryLine label={`VAT (${Math.round(vatRate * 100)}%)`} value={fmt(totals.vat)} />
          <SummaryLine label="Grand Total" value={fmt(totals.grandTotal)} isTotal />
        </View>

        <Text style={styles.tierRefTitle}>Squad Discounts</Text>
        <Text style={styles.tierRefBody}>1 booking = 0% · 2 = 5% · 3 = 10% · 4+ = 15% off total</Text>

        <PrimaryButton title="Calculate & Proceed" onPress={onProceed} style={{ marginTop: 24 }} />
      </ScrollView>
    </View>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
}

function Field({ label, error, ...props }: FieldProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : undefined]}
        placeholderTextColor={colors.grey}
        {...props}
      />
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

function SummaryLine({
  label,
  value,
  isTotal,
  isDiscount,
}: {
  label: string;
  value: string;
  isTotal?: boolean;
  isDiscount?: boolean;
}) {
  return (
    <View style={[styles.summaryLine, isTotal && styles.summaryLineTotal]}>
      <Text style={[styles.summaryLabel, isTotal && styles.summaryLabelTotal]}>{label}</Text>
      <Text
        style={[
          styles.summaryValue,
          isTotal && styles.summaryValueTotal,
          isDiscount && { color: colors.magenta },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.charcoal },
  heading: { color: colors.offWhite, fontSize: 24, fontWeight: "800", marginBottom: 6 },
  body: { color: colors.bodyText, fontSize: 13, marginBottom: 20 },
  sectionTitle: { color: colors.offWhite, fontSize: 12, fontWeight: "800", letterSpacing: 0.6, marginTop: 10, marginBottom: 14 },
  fieldLabel: { color: colors.bodyText, fontSize: 11, fontWeight: "700", marginBottom: 6, letterSpacing: 0.3 },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: 13,
    color: colors.offWhite,
  },
  inputError: { borderColor: colors.magenta },
  errorText: { color: colors.magenta, fontSize: 12, marginTop: 6 },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: 14,
    marginBottom: 10,
  },
  itemName: { color: colors.offWhite, fontWeight: "700", marginBottom: 2 },
  itemPrice: { color: colors.cyan, fontSize: 12 },
  summaryCard: {
    marginTop: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 18,
  },
  chip: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.magenta,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 14,
  },
  chipText: { color: colors.magenta, fontSize: 11, fontWeight: "800" },
  summaryLine: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
  summaryLabel: { color: colors.bodyText, fontSize: 13 },
  summaryValue: { color: colors.offWhite, fontSize: 13 },
  summaryLineTotal: { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 6, paddingTop: 14 },
  summaryLabelTotal: { color: colors.offWhite, fontWeight: "800", fontSize: 15 },
  summaryValueTotal: { color: colors.cyan, fontWeight: "800", fontSize: 17 },
  tierRefTitle: { color: colors.offWhite, fontSize: 12, fontWeight: "700", marginTop: 18 },
  tierRefBody: { color: colors.grey, fontSize: 12, marginTop: 4 },
});
