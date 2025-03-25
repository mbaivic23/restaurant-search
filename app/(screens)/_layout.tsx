import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants/icon";
import { Image, Text, View } from "react-native";
function NavigationIcon({ focused, icon, title }: any) {
  if (focused) {
    return (
      <View className="flex flex-row w-full flex-1 min-w-[180px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden bg-banana-200">
        <Image source={icon} tintColor="#713f12" className="size-5" />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </View>
    );
  }
  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#713f12" className="size-5" />
    </View>
  );
}
const ScreensLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fef9c3",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#fef9c3",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <NavigationIcon focused={focused} icon={icons.home} title="Home" />
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
              icon={icons.explore}
              title="Explore"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default ScreensLayout;