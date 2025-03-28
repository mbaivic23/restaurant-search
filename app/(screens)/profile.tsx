import React, { useState } from "react";
import { Text, ActivityIndicator, ScrollView, Alert } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import ProfileData from "@/components/ProfileData";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import { logout } from "@/services/authService";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ProfileScreen() {
  const { user, isLoading, setUser } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);
  const primaryColor = useThemeColor({}, "tint");

  if (isLoading) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={primaryColor} />
        <Text className="mt-4 text-zinc-600 dark:text-zinc-400">
          Učitavanje...
        </Text>
      </ThemedView>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  if (!user) {
    return (
      <ThemedView className="flex-1 items-center">
        <ScrollView
          className="flex-grow w-full max-w-xl pt-20"
          keyboardShouldPersistTaps="handled"
        >
          {showSignUp ? (
            <SignUpForm
              onSuccess={() => setShowSignUp(false)}
              onSwitchToSignIn={() => setShowSignUp(false)}
            />
          ) : (
            <SignInForm onSwitchToSignUp={() => setShowSignUp(true)} />
          )}
        </ScrollView>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1 p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileData user={user} onLogout={handleLogout} />
      </ScrollView>
    </ThemedView>
  );
}
