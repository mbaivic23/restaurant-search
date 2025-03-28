import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
import { ThemeProvider } from "@/context/ThemeContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { WebThemeSync } from "@/components/WebThemeSync";

function ThemedSafeArea({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[theme].background,
      }}
      edges={["top", "left", "right"]}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={Colors[theme].background}
      />
      {children}
    </SafeAreaView>
  );
}

function AppLayout() {
  return (
    <ThemeProvider>
      <WebThemeSync />
      <ThemedSafeArea>
        <Stack>
          <Stack.Screen name="(screens)" options={{ headerShown: false }} />
        </Stack>
      </ThemedSafeArea>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppLayout />
    </SafeAreaProvider>
  );
}
