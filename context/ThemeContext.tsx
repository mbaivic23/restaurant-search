import React, { createContext, useState, useEffect, useContext } from "react";
import { Appearance, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
type ThemeType = "light" | "dark";
interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = "@app_theme";
const storeTheme = async (theme: ThemeType) => {
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch (error) {
    console.error("Error storing theme:", error);
    return false;
  }
};
const getStoredTheme = async (): Promise<ThemeType | null> => {
  try {
    const theme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    return theme as ThemeType | null;
  } catch (error) {
    console.error("Error getting stored theme:", error);
    return null;
  }
};
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemTheme = (Appearance.getColorScheme() as ThemeType) || "light";
  const [theme, setThemeState] = useState<ThemeType>(systemTheme);
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await getStoredTheme();
      if (storedTheme) setThemeState(storedTheme);
      setIsInitialized(true);
    };
    loadTheme();
  }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (!isInitialized) return;
      const storedThemeCheck = async () => {
        const stored = await getStoredTheme();
        if (!stored && colorScheme) setThemeState(colorScheme as ThemeType);
      };
      storedThemeCheck();
    });
    return () => {
      subscription.remove();
    };
  }, [isInitialized]);

  const setTheme = async (newTheme: ThemeType) => {
    setThemeState(newTheme);
    await storeTheme(newTheme);
    if (
      Platform.OS !== "web" &&
      typeof Appearance.setColorScheme === "function"
    ) {
      Appearance.setColorScheme(newTheme);
    }
  };
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
