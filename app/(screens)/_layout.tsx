import BottomTabs from "@/components/BottomTabs";
import { ThemedView } from "@/components/ThemedView";
import React from "react";

const ScreensLayout = () => {

  return (
      <ThemedView className="flex-1">
        <BottomTabs />
      </ThemedView>
  );
};

export default ScreensLayout;
