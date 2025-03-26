import { useWindowDimensions } from "react-native";
export const isWeb = typeof document !== "undefined";
export function useResponsive() {
  const { width } = useWindowDimensions();
  const lgScreen = width > 1024;
  const mdScreen = width >= 640 && width < 1024;
  const smScreen = width < 640;

  const getNumColumns = () => {
    if (isWeb) {
      if (lgScreen) return 3;
      if (mdScreen) return 2;
      return 1;
    }
    return 1;
  };

  return {
    numColumns: getNumColumns(),
    lgScreen,
    mdScreen,
    smScreen,
    isWeb,
  };
}
