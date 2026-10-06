import React from "react";
import { View, Text, ScrollView, StyleSheet, FlatList, Pressable } from "react-native";
import { router } from "expo-router";
import { colors, radius } from "../../theme/colors";
import { LogoNav } from "../../components/Logo";
import PackageCard from "../../components/PackageCard";
import AvatarPicker from "../../components/AvatarPicker";
import { packages, experiences } from "../../data/packages";
import { useUser } from "../../context/UserContext";

export default function HomeScreen() {
  const { name, username, avatarUri, setAvatarUri } = useUser();
  const displayName = username || name || "Guest";
  const initial = (name || username || "?").trim().charAt(0).toUpperCase();

  return (
    <ScrollView style={styles.wrap} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <LogoNav size={32} />
        <View style={styles.headerIcons}>
          <Pressable
            onPress={() => router.push("/(tabs)/fees")}
            hitSlop={10}
            accessibilityLabel="View your booking basket"
          >
            <Text style={styles.icon}>🛒</Text>
          </Pressable>
          <AvatarPicker uri={avatarUri} onChange={setAvatarUri} size={30} fallbackLetter={initial} />
        </View>
      </View>

      <View style={styles.greetingRow}>
        <View>
          <Text style={styles.greetingSmall}>Welcome back,</Text>
          <Text style={styles.greetingName}>{displayName}</Text>
        </View>
        <View style={styles.rankChip}>
          <Text style={styles.rankText}>Rank #42</Text>
        </View>
      </View>

      <View style={styles.searchBar}>
        <Text style={{ color: colors.grey }}>Search packages, training…</Text>
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Popular Packages</Text>
        <Pressable onPress={() => router.push("/(tabs)/packages")}>
          <Text style={styles.viewAll}>View All</Text>
        </Pressable>
      </View>
      <FlatList
        data={packages}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
        renderItem={({ item }) => (
          <View style={{ width: 220 }}>
            <PackageCard item={item} onPress={() => router.push(`/package/${item.id}`)} />
          </View>
        )}
      />

      <Pressable style={styles.promoBanner} onPress={() => router.push("/(tabs)/fees")}>
        <Text style={styles.promoTitle}>Squad Up And Save 15%</Text>
        <Text style={styles.promoBody}>Book 3+ experiences or squad passes today.</Text>
      </Pressable>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Experiences</Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        {experiences.map((item) => (
          <PackageCard key={item.id} item={item} onPress={() => router.push(`/package/${item.id}`)} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.charcoal },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerIcons: { flexDirection: "row", alignItems: "center", gap: 14 },
  icon: { fontSize: 18 },
  greetingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  greetingSmall: { color: colors.grey, fontSize: 13 },
  greetingName: { color: colors.offWhite, fontSize: 20, fontWeight: "800" },
  rankChip: { borderWidth: 1, borderColor: colors.cyan, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 6 },
  rankText: { color: colors.cyan, fontSize: 12, fontWeight: "700" },
  searchBar: {
    marginHorizontal: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: 14,
    marginBottom: 24,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: { color: colors.offWhite, fontSize: 16, fontWeight: "800" },
  viewAll: { color: colors.cyan, fontSize: 13, fontWeight: "600" },
  promoBanner: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: radius.md,
    padding: 20,
    backgroundColor: colors.magenta,
  },
  promoTitle: { color: "#fff", fontWeight: "800", fontSize: 16, marginBottom: 4 },
  promoBody: { color: "#fff", fontSize: 13, opacity: 0.9 },
});
