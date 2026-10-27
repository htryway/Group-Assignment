import React, { useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { colors, radius } from "../../theme/colors";
import ScreenHeader from "../../components/ScreenHeader";
import PackageCard from "../../components/PackageCard";
import { packages } from "../../data/packages";

export default function PackagesScreen() {
  const [filter, setFilter] = useState("All");

  // Built from whatever categories actually exist on the packages, so a new
  // category added in data/packages.ts shows up here automatically instead
  // of needing a hardcoded list kept in sync by hand.
  const filters = useMemo(() => {
    const categories = packages
      .map((p) => p.category)
      .filter((c): c is string => !!c);
    return ["All", ...Array.from(new Set(categories))];
  }, []);

  const filtered = filter === "All" ? packages : packages.filter((p) => p.category === filter);

  return (
    <View style={styles.wrap}>
      <ScreenHeader title="PACKAGES" />
      <View style={styles.filterRow}>
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(f) => f}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.chip, filter === item && styles.chipActive]}
              onPress={() => setFilter(item)}
            >
              <Text style={[styles.chipText, filter === item && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          )}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No packages in this category yet.</Text>
        }
        renderItem={({ item }) => (
          <PackageCard item={item} onPress={() => router.push(`/package/${item.id}`)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.charcoal },
  filterRow: { paddingVertical: 16 },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipActive: { backgroundColor: colors.cyan, borderColor: colors.cyan },
  chipText: { color: colors.offWhite, fontSize: 13, fontWeight: "600" },
  chipTextActive: { color: colors.charcoal },
  emptyText: { color: colors.grey, textAlign: "center", marginTop: 30, fontSize: 13 },
});
