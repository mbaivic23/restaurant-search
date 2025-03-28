import React from "react";
import { Text, TouchableOpacity, View, Alert, Switch } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { User, logout } from "@/services/authService";

interface ProfileDataProps {
  user: User;
  onLogout?: () => void;
}

const ProfileData: React.FC<ProfileDataProps> = ({ user, onLogout }) => {
  const { setUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  return (
    <View className="w-full max-w-xl self-center mt-8">
      <Text className="text-2xl font-bold dark:text-white text-black text-center my-8">
        Korisnički profil
      </Text>
      <View
        className={`rounded-2xl p-6 ${
          isDarkMode ? "bg-zinc-900" : "bg-zinc-100"
        } shadow-sm`}
      >
        <View className="flex-row justify-between mb-3 pb-2 border-b border-zinc-300 dark:border-zinc-700">
          <Text className="text-gray-600 dark:text-zinc-400 font-medium">
            Ime:
          </Text>
          <Text className="dark:text-white text-black">{user.firstName}</Text>
        </View>
        <View className="flex-row justify-between mb-3 pb-2 border-b border-zinc-300 dark:border-zinc-700">
          <Text className="text-zinc-600 dark:text-zinc-400 font-medium">
            Prezime:
          </Text>
          <Text className="dark:text-white text-black">{user.lastName}</Text>
        </View>
        <View className="flex-row justify-between mb-3 pb-2 border-b border-zinc-300 dark:border-zinc-700">
          <Text className="text-zinc-600 dark:text-zinc-400 font-medium">
            Email:
          </Text>
          <Text className="dark:text-white text-black">{user.email}</Text>
        </View>
        <View className="flex-row justify-between mb-3 pb-2 border-b border-zinc-300 dark:border-zinc-700">
          <Text className="text-zinc-600 dark:text-zinc-400 font-medium">
            Jezik:
          </Text>
          <Text className="dark:text-white text-black">{user.language}</Text>
        </View>
        <View className="flex-row justify-between mb-3 pb-2 border-b border-zinc-300 dark:border-zinc-700">
          <Text className="text-zinc-600 dark:text-zinc-400 font-medium">
            Uloga:
          </Text>
          <Text className="dark:text-white text-black">{user.role}</Text>
        </View>
        <View className="flex-row justify-between items-center my-4 pb-2 border-b border-zinc-300 dark:border-zinc-700">
          <Text className="text-zinc-600 dark:text-zinc-400">Dark Mode:</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
        <TouchableOpacity
          className="w-full bg-zinc-950 dark:bg-zinc-800 py-3 rounded-md items-center mt-2"
          onPress={handleLogout}
        >
          <Text className="text-white font-medium">Odjava</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileData;
