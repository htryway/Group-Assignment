import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions, Pressable } from "react-native";
import { router } from "expo-router";
import { colors } from "../theme/colors";
import PrimaryButton from "../components/PrimaryButton";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    title: "Book Your Rig In Seconds",
    body: "Reserve a station, a booth or a full package from your phone. No calls, no queues.",
  },
  {
    title: "Save When You Stack",
    body: "Two bookings save 5%. Three save 10%. More than three save 15% — worked out automatically.",
  },
  {
    title: "Scan In And Play",
    body: "Your booking QR code lives in the app. Show it at the front desk and your stations are ready.",
  },
];

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const goNext = () => {
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1 });
      setIndex(index + 1);
    } else {
      router.replace("/login");
    }
  };

  return (
    <View style={styles.wrap}>
      <Pressable style={styles.skip} onPress={() => router.replace("/login")}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.artwork} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />

      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.footer}>
        <PrimaryButton title={index === SLIDES.length - 1 ? "Get Started" : "Next"} onPress={goNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.charcoal },
  skip: { alignSelf: "flex-end", padding: 20, marginTop: 10 },
  skipText: { color: colors.grey, fontWeight: "600" },
  slide: { paddingHorizontal: 32, alignItems: "center", paddingTop: 40 },
  artwork: {
    width: "100%",
    height: 240,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 36,
  },
  title: { color: colors.offWhite, fontSize: 24, fontWeight: "800", textAlign: "center", marginBottom: 12 },
  body: { color: colors.bodyText, fontSize: 14, textAlign: "center", lineHeight: 21 },
  dots: { flexDirection: "row", justifyContent: "center", gap: 8, marginTop: 20 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.cyan, width: 20 },
  footer: { padding: 24, paddingBottom: 40 },
});
