import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useResponsive, isWeb } from "@/hooks/useResponsive";

function NavigationIcon({ focused, icon, title, smScreen }: any) {
  return (
    <View
      className={`flex-row items-center justify-center ${
        focused ? "bg-banana-300" : ""
      } ${isWeb ? "cursor-pointer" : ""}`}
      style={{
        minWidth: focused ? 200 : 50,
        minHeight: 60,
        borderRadius: 50,
        marginBottom: (!smScreen && !isWeb) ? 0 : -20,
      }}
    >
      <Ionicons name={icon} size={24} color={focused ? "#713f12" : "#a78b71"} />
      {focused && (
        <Text
          className="text-secondary text-base font-semibold ml-2"
          style={{ color: "#713f12" }}
        >
          {title}
        </Text>
      )}
    </View>
  );
}

const BottomTabs = () => {
  const { smScreen } = useResponsive();
  const { lgScreen } = useResponsive();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fef9c3",
          borderRadius: 50,
          height: 60,
          marginHorizontal: 20,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#fef9c3",
          marginBottom: isWeb && smScreen ? 20 : 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <NavigationIcon
              focused={focused}
              icon="home"
              title="Home"
              smScreen={smScreen}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <NavigationIcon
              focused={focused}
              icon="navigate"
              title="Explore"
              smScreen={smScreen}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default BottomTabs;
