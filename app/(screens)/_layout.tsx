import React from "react";
import { Tabs } from "expo-router";

const ScreensLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default ScreensLayout;