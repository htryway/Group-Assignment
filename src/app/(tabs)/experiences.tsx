import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { router } from "expo-router";
import { colors } from "../../theme/colors";
import ScreenHeader from "../../components/ScreenHeader";
import PackageCard from "../../components/PackageCard";
import { experiences } from "../../data/packages";

export default function ExperiencesScreen() {
  return (
    <View style={styles.wrap}>
      <ScreenHeader title="EXPERIENCES" />
      <FlatList
        data={experiences}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <PackageCard item={item} onPress={() => router.push(`/package/${item.id}`)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.charcoal },
});
