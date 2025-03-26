import { useWindowDimensions, Platform } from "react-native";

// vraca broj stupaca za prikaz na temelju sirine ekrana
export function useResponsiveColumns() {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  const getNumColumns = () => {
    if (isWeb) {
      if (width > 1024) return 3;
      if (width > 640) return 2;
      return 1;
    }
    return 1;
  };

  return {
    numColumns: getNumColumns(),
    isWeb,
  };
}
