import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LogoNav } from "./Logo";
import { colors } from "../theme/colors";

interface ScreenHeaderProps {
  title?: string;
  onBack?: () => void;
}

export default function ScreenHeader({ title, onBack }: ScreenHeaderProps) {
  return (
    <View style={styles.wrap}>
      {onBack ? (
        <Pressable onPress={onBack} style={styles.backBtn} accessibilityLabel="Go back">
          <Text style={styles.backText}>‹</Text>
        </Pressable>
      ) : (
        <View style={styles.backBtn} />
      )}
      {title ? <Text style={styles.title}>{title}</Text> : <LogoNav size={30} />}
      <View style={styles.backBtn} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.charcoal,
  },
  backBtn: { width: 32, alignItems: "flex-start", justifyContent: "center" },
  backText: { color: colors.offWhite, fontSize: 26, lineHeight: 26 },
  title: { color: colors.offWhite, fontWeight: "700", fontSize: 14, letterSpacing: 0.6 },
});
