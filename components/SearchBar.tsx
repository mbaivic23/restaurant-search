import React, { memo } from "react";
import { View, TextInput, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = memo(
  ({ value, onChangeText, onClear, placeholder = "Search..." }) => {
    const isWeb = Platform.OS === "web";
    const iconColor = useThemeColor({}, "tint");
    const placeholderColor = useThemeColor({}, "icon");
    
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: useThemeColor({ light: "#f4f4f5", dark: "#3f3f46" }, "background"),
          borderRadius: 50,
          padding: 10,
          width: isWeb ? 400 : "100%",
          borderWidth: 1,
          borderColor: useThemeColor({ light: "#e4e4e7", dark: "#52525b" }, "background"),
        }}
      >
        <Ionicons
          name="search"
          size={20}
          color={iconColor}
          style={{ marginHorizontal: 10 }}
        />
        <TextInput
          className="flex-1 text-zinc-800 dark:text-zinc-100"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          style={isWeb ? { outline: "none" } : {}}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear} style={{ marginRight: 10 }}>
            <Ionicons name="close-circle" size={20} color={placeholderColor} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

export default SearchBar;