import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { colors, radius } from "../../theme/colors";
import ScreenHeader from "../../components/ScreenHeader";
import AvatarPicker from "../../components/AvatarPicker";
import { useUser } from "../../context/UserContext";

const UPCOMING = [
  { label: "Ultimate Gamer Pass (×2)", when: "Sat, 26 Sep · 14:00", status: "Confirmed" },
  { label: "Racing Simulator (×1)", when: "Wed, 04 Oct · 18:30", status: "Confirmed" },
];

const PAST = [{ label: "VR Experience (×2)", when: "12 Feb 2026", status: "Completed" }];

export default function ProfileScreen() {
  const { name, username, avatarUri, setAvatarUri } = useUser();
  const displayName = name || username || "Guest";
  const initial = (name || username || "?").trim().charAt(0).toUpperCase();

  return (
    <View style={styles.wrap}>
      <ScreenHeader title="MY PROFILE" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <View style={styles.profileRow}>
          <AvatarPicker uri={avatarUri} onChange={setAvatarUri} size={64} fallbackLetter={initial} />
          <View>
            <Text style={styles.name}>{displayName}</Text>
            {!!username && <Text style={styles.username}>@{username}</Text>}
            <View style={styles.tierPill}>
              <Text style={styles.tierText}>GOLD MEMBER</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
        {UPCOMING.map((b, i) => (
          <BookingRow key={i} booking={b} />
        ))}

        <Text style={styles.sectionTitle}>Past Bookings</Text>
        {PAST.map((b, i) => (
          <BookingRow key={i} booking={b} muted />
        ))}

        <Text style={styles.sectionTitle}>Settings & Account</Text>
        <MenuRow label="About Next Level" onPress={() => router.push("/about")} />
        <MenuRow label="Contact & Support" onPress={() => router.push("/contact")} />
        <MenuRow label="Payment Methods" onPress={() => {}} />
        <MenuRow label="Notifications" onPress={() => {}} />
      </ScrollView>
    </View>
  );
}

function BookingRow({ booking, muted }: { booking: { label: string; when: string; status: string }; muted?: boolean }) {
  return (
    <View style={[styles.bookingRow, muted && { opacity: 0.6 }]}>
      <View>
        <Text style={styles.bookingWhen}>{booking.when}</Text>
        <Text style={styles.bookingLabel}>{booking.label}</Text>
      </View>
      <View style={styles.statusPill}>
        <Text style={styles.statusText}>{booking.status}</Text>
      </View>
    </View>
  );
}

function MenuRow({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.menuRow} onPress={onPress}>
      <Text style={styles.menuLabel}>{label}</Text>
      <Text style={styles.menuChevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.charcoal },
  profileRow: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 28 },
  name: { color: colors.offWhite, fontSize: 18, fontWeight: "800", marginBottom: 2 },
  username: { color: colors.grey, fontSize: 12, marginBottom: 8 },
  tierPill: { borderWidth: 1, borderColor: colors.cyan, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4, alignSelf: "flex-start" },
  tierText: { color: colors.cyan, fontSize: 10, fontWeight: "800" },
  sectionTitle: { color: colors.offWhite, fontSize: 12, fontWeight: "800", letterSpacing: 0.5, marginTop: 20, marginBottom: 12 },
  bookingRow: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.sm, padding: 14, marginBottom: 10,
  },
  bookingWhen: { color: colors.cyan, fontSize: 11, fontWeight: "700", marginBottom: 4 },
  bookingLabel: { color: colors.offWhite, fontWeight: "700" },
  statusPill: { backgroundColor: colors.border, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { color: colors.offWhite, fontSize: 10, fontWeight: "700" },
  menuRow: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  menuLabel: { color: colors.offWhite, fontSize: 14 },
  menuChevron: { color: colors.grey, fontSize: 18 },
});
