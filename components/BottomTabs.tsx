import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { View } from "react-native";
import { isWeb } from "@/hooks/useResponsive";

export default function BottomTab() {
  const { theme } = useTheme();

  const tabBarStyle = {
    backgroundColor: Colors[theme].tabBarBackground,
    borderTopWidth: 1,
    borderTopColor:
      Colors[theme].tabBarBorder || Colors[theme].tabBarBackground,
    elevation: 0,
    height: 60,
    paddingBottom: isWeb ? 0 : 70,
    paddingTop: isWeb ? 0 : 7,
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        tabBarInactiveTintColor: Colors[theme].tabIconDefault,
        headerShown: false,
        tabBarStyle: tabBarStyle,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Početna",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                size={24}
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Istraži",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                size={24}
                name={focused ? "restaurant" : "restaurant-outline"}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                size={24}
                name={focused ? "person" : "person-outline"}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
