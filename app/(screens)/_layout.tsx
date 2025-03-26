import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants/icon";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function NavigationIcon({ focused, icon, title }: any) {
  const isWeb = typeof document !== "undefined";
  if (focused) {
    return (
      <View className="flex-row min-w-[180px] mt-5 sm:mt-0 min-h-16 justify-center items-center rounded-full bg-banana-200">
        <Image
          source={icon}
          tintColor="#713f12"
          className="size-5"
          style={isWeb ? { width: 24, height: 24 } : {}}
        />
        <Text className="text-secondary text-base font-semibold">{title}</Text>
      </View>
    );
  }
  return (
    <View className="mt-5 sm:mt-0">
      <Image
        source={icon}
        tintColor="#713f12"
        className="size-5"
        style={isWeb ? { width: 24, height: 24 } : {}}
      />
    </View>
  );
}
const ScreensLayout = () => {
  return (
    <SafeAreaView className="flex-1">
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarStyle: {
            backgroundColor: "#fef9c3",
            borderRadius: 50,
            height: 52,
            marginHorizontal: 20,
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
              <NavigationIcon
                focused={focused}
                icon={icons.home}
                title="Home"
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
                icon={icons.explore}
                title="Explore"
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default ScreensLayout;
