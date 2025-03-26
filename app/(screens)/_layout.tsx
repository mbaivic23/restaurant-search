import BottomTabs from "@/navigation/BottomTabs";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreensLayout = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BottomTabs />
    </SafeAreaView>
  );
};

export default ScreensLayout;
