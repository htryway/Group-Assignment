import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { colors, radius } from "../theme/colors";
import { LogoLockup } from "../components/Logo";
import PrimaryButton from "../components/PrimaryButton";
import AvatarPicker from "../components/AvatarPicker";
import { useUser } from "../context/UserContext";

type Mode = "signin" | "signup";

export default function LoginScreen() {
  const { setName, setUsername, setAvatarUri, avatarUri, name } = useUser();

  const [mode, setMode] = useState<Mode>("signup");
  const [fullName, setFullName] = useState(name);
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (mode === "signup") {
      if (fullName.trim().length < 2) next.fullName = "Enter your full name.";
      if (handle.trim().length < 3) next.handle = "Pick a username (3+ characters).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (password.length < 4) next.password = "Enter your password.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onContinue = () => {
    if (!validate()) return;
    if (mode === "signup") {
      setName(fullName.trim());
      setUsername(handle.trim());
    }
    router.replace("/(tabs)");
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setErrors({});
  };

  const initial = (fullName || handle || "?").trim().charAt(0).toUpperCase();

  return (
    <ScrollView style={styles.wrap} contentContainerStyle={styles.content}>
      <View style={styles.logoWrap}>
        <LogoLockup size={64} />
      </View>

      <View style={styles.tabRow}>
        <Pressable
          style={[styles.tab, mode === "signin" && styles.tabActive]}
          onPress={() => switchMode("signin")}
        >
          <Text style={[styles.tabText, mode === "signin" && styles.tabTextActive]}>Sign In</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, mode === "signup" && styles.tabActive]}
          onPress={() => switchMode("signup")}
        >
          <Text style={[styles.tabText, mode === "signup" && styles.tabTextActive]}>Create Account</Text>
        </Pressable>
      </View>

      <Text style={styles.heading}>{mode === "signup" ? "Join Next Level" : "Welcome Back"}</Text>
      <Text style={styles.sub}>
        {mode === "signup"
          ? "Set up your profile so we know who's booking."
          : "Sign in to manage your bookings and track your arena stats."}
      </Text>

      {mode === "signup" && (
        <>
          <View style={styles.avatarRow}>
            <AvatarPicker uri={avatarUri} onChange={setAvatarUri} size={84} fallbackLetter={initial} />
            <Text style={styles.avatarHint}>Tap to add a profile picture</Text>
          </View>

          <Field
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            error={errors.fullName}
            placeholder="e.g. Zane van Wyk"
          />
          <Field
            label="Username"
            value={handle}
            onChangeText={setHandle}
            error={errors.handle}
            placeholder="How you'll appear in the app"
            autoCapitalize="none"
          />
        </>
      )}

      <Field
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        placeholder="you@email.com"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Field
        label="Password"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        placeholder="••••••••"
        secureTextEntry
      />

      {mode === "signin" && (
        <Pressable style={{ alignSelf: "flex-end", marginBottom: 20 }}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </Pressable>
      )}

      <PrimaryButton
        title={mode === "signup" ? "Create Account" : "Sign In"}
        onPress={onContinue}
        style={{ marginTop: mode === "signup" ? 12 : 0 }}
      />

      <Pressable onPress={() => switchMode(mode === "signup" ? "signin" : "signup")} style={styles.switchRow}>
        <Text style={styles.sub}>
          {mode === "signup" ? (
            <>
              Already have an account? <Text style={styles.link}>Sign In</Text>
            </>
          ) : (
            <>
              Don't have an account? <Text style={styles.link}>Create Account</Text>
            </>
          )}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
  placeholder?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address" | "phone-pad";
  secureTextEntry?: boolean;
}

function Field({ label, error, ...props }: FieldProps) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : undefined]}
        placeholderTextColor={colors.grey}
        {...props}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.charcoal },
  content: { padding: 28, paddingTop: 60, paddingBottom: 60 },
  logoWrap: { alignItems: "center", marginBottom: 20 },
  tabRow: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    padding: 4,
    marginBottom: 24,
  },
  tab: { flex: 1, paddingVertical: 10, borderRadius: radius.pill, alignItems: "center" },
  tabActive: { backgroundColor: colors.cyan },
  tabText: { color: colors.bodyText, fontWeight: "700", fontSize: 13 },
  tabTextActive: { color: colors.charcoal },
  heading: { color: colors.offWhite, fontSize: 26, fontWeight: "800", marginBottom: 8 },
  sub: { color: colors.bodyText, fontSize: 13, marginBottom: 24, lineHeight: 19 },
  avatarRow: { alignItems: "center", marginBottom: 24 },
  avatarHint: { color: colors.grey, fontSize: 12, marginTop: 10 },
  label: { color: colors.offWhite, fontSize: 12, fontWeight: "700", marginBottom: 8, letterSpacing: 0.4 },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 14,
    color: colors.offWhite,
  },
  inputError: { borderColor: colors.magenta },
  error: { color: colors.magenta, marginTop: 6, fontSize: 12 },
  forgot: { color: colors.cyan, fontSize: 13, fontWeight: "600" },
  switchRow: { marginTop: 24, alignItems: "center" },
  link: { color: colors.magenta, fontWeight: "700" },
});
