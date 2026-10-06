import React from "react";
import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../theme/colors";

interface AvatarPickerProps {
  uri: string | null;
  onChange: (uri: string) => void;
  size?: number;
  fallbackLetter?: string;
}

/**
 * A circular avatar. Tapping it opens the device photo library so the user
 * can pick a picture — used on both the login/signup screen and the
 * profile screen so the picture can be set or changed from either place.
 */
export default function AvatarPicker({ uri, onChange, size = 72, fallbackLetter = "?" }: AvatarPickerProps) {
  const pick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <Pressable
      onPress={pick}
      style={[styles.wrap, { width: size, height: size, borderRadius: size / 2 }]}
      accessibilityLabel="Change profile picture"
    >
      {uri ? (
        <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />
      ) : (
        <Text style={[styles.fallbackText, { fontSize: size * 0.35 }]}>{fallbackLetter}</Text>
      )}
      <View style={styles.editBadge}>
        <Text style={styles.editBadgeText}>✎</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cyan,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  fallbackText: { color: colors.cyan, fontWeight: "800" },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.magenta,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.charcoal,
  },
  editBadgeText: { color: "#fff", fontSize: 11 },
});
