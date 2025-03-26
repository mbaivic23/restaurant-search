import React, { memo } from "react";
import { View, TextInput, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = memo(
  ({ value, onChangeText, onClear, placeholder = "Search..." }) => {
    const isWeb = Platform.OS === "web";

    return (
      <View className="flex-row rounded-full px-4 py-3 shadow-sm bg-banana-100">
        <Ionicons name="search" size={20} color="#64748b" />
        <TextInput
          className="flex-1 ml-2 text-gray-800"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          style={isWeb ? { outline: "none" } : {}}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear} className="p-1">
            <Ionicons name="close-circle" size={20} color="#64748b" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);
export default SearchBar;
