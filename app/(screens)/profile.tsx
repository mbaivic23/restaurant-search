import { Text } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";

const Profile = () => {
  return (
    <ThemedView className="flex-1 justify-center items-center">
      <Text className="text-4xl text-zinc-900 dark:text-zinc-100 font-bold">
        Profile
      </Text>
    </ThemedView>
  );
};

export default Profile;
