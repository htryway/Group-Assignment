import React from "react";
import { Pressable, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { colors, radius } from "../theme/colors";

interface PrimaryButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Gradient CTA button. Built with an SVG rect background so the
 * cyan → purple → magenta gradient always renders identically to
 * the website's --gradient token, on both iOS and Android.
 */
export default function PrimaryButton({ title, onPress, disabled, style }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={[styles.wrap, disabled && styles.disabled, style]}
    >
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
        <Defs>
          <LinearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colors.cyan} />
            <Stop offset="55%" stopColor={colors.purple} />
            <Stop offset="100%" stopColor={colors.magenta} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" rx={radius.sm} fill="url(#btnGrad)" />
      </Svg>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

export function SecondaryButton({ title, onPress, style }: PrimaryButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.secondaryWrap, style]}>
      <Text style={styles.secondaryText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 52,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  disabled: { opacity: 0.5 },
  text: { color: "#fff", fontWeight: "700", fontSize: 15 },
  secondaryWrap: {
    height: 52,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: { color: colors.offWhite, fontWeight: "600", fontSize: 15 },
});
