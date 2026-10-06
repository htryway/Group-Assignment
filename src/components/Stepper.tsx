import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export default function Stepper({ value, onChange, min = 0 }: StepperProps) {
  return (
    <View style={styles.row}>
      <Pressable
        style={styles.btn}
        onPress={() => onChange(Math.max(min, value - 1))}
        accessibilityLabel="Decrease quantity"
      >
        <Text style={styles.btnText}>−</Text>
      </Pressable>
      <Text style={styles.value}>{value}</Text>
      <Pressable
        style={[styles.btn, styles.btnAdd]}
        onPress={() => onChange(value + 1)}
        accessibilityLabel="Increase quantity"
      >
        <Text style={styles.btnText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  btn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  btnAdd: { backgroundColor: colors.cyan, borderWidth: 0 },
  btnText: { color: colors.offWhite, fontSize: 18, fontWeight: "700" },
  value: { color: colors.offWhite, fontWeight: "700", minWidth: 20, textAlign: "center" },
});
