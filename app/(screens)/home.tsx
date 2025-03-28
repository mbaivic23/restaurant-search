import { ThemedView } from "@/components/ThemedView";
import { Text } from "react-native";

export default function Home() {
  return (
    <ThemedView className="flex-1 justify-center items-center">
      <Text className="text-4xl text-zinc-900 dark:text-zinc-100 font-bold">
        Restaurant Finder
      </Text>
    </ThemedView>
  );
}
