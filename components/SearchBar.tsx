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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#ffff",
          borderRadius: 50,
          padding: 10,
          marginHorizontal: 5,
          width: isWeb ? 400 : "100%",
        }}
      >
        <Ionicons
          name="search"
          size={20}
          color="#713f12"
          style={{ marginHorizontal: 10 }}
        />
        <TextInput
          className="flex-1 text-gray-800"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#4f3e2f"
          style={isWeb ? { outline: "none" } : {}}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear} style={{ marginRight: 10 }}>
            <Ionicons name="close-circle" size={20} color="#918479" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);
export default SearchBar;
