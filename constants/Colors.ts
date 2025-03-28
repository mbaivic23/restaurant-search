// Constants/Colors.ts
const tintColorLight = "#0891b2"; // Cyan-600 - glavna boja za light mode
const tintColorDark = "#22d3ee"; // Cyan-400 - glavna boja za dark mode

export const Colors = {
  light: {
    text: "#27272a", // Zinc-800
    background: "#ffffff", // White
    tint: tintColorLight,
    icon: "#71717a", // Zinc-500
    tabIconDefault: "#a1a1aa", // Zinc-400
    tabIconSelected: tintColorLight,
    tabBarBackground: "#f4f4f5", // Zinc-100
    tabBarBorder: "#e4e4e7", // Zinc-200
    cardBackground: "#f4f4f5", // Zinc-100
    cardBorder: "#e4e4e7", // Zinc-200
    inputBackground: "#f4f4f5", // Zinc-100
    secondary: "#94a3b8", // Slate-400
    success: "#10b981", // Emerald-500
    warning: "#f59e0b", // Amber-500
    error: "#ef4444", // Red-500
  },
  dark: {
    text: "#f4f4f5", // Zinc-100
    background: "#27272a", // Zinc-800
    tint: tintColorDark,
    icon: "#a1a1aa", // Zinc-400
    tabIconDefault: "#52525b", // Zinc-600
    tabIconSelected: tintColorDark,
    tabBarBackground: "#18181b", // Zinc-900
    tabBarBorder: "#3f3f46", // Zinc-700
    cardBackground: "#3f3f46", // Zinc-700
    cardBorder: "#52525b", // Zinc-600
    inputBackground: "#3f3f46", // Zinc-700
    secondary: "#64748b", // Slate-500
    success: "#059669", // Emerald-600
    warning: "#d97706", // Amber-600
    error: "#dc2626", // Red-600
  },
};