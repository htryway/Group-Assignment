import React from "react";
import { Pressable, Text, View, Image, StyleSheet } from "react-native";
import { colors, radius } from "../theme/colors";
import { Item } from "../types";
import { itemImages } from "../data/images";

interface PackageCardProps {
  item: Item;
  onPress?: () => void;
}

export default function PackageCard({ item, onPress }: PackageCardProps) {
  const image = itemImages[item.id];

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {image && <Image source={image} style={styles.image} resizeMode="cover" />}
      <View style={styles.body}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>R{item.price.toLocaleString("en-ZA")}</Text>
        <Text style={styles.summary} numberOfLines={3}>
          {item.summary}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    overflow: "hidden",
    marginBottom: 14,
  },
  image: { width: "100%", height: 120 },
  body: { padding: 18 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.purple,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700", letterSpacing: 0.4 },
  name: { color: colors.offWhite, fontSize: 17, fontWeight: "700", marginBottom: 4 },
  price: { color: colors.cyan, fontSize: 16, fontWeight: "700", marginBottom: 8 },
  summary: { color: colors.bodyText, fontSize: 13, lineHeight: 19 },
});
