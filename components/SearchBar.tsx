import React, { memo, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { searchInputSchema } from "@/utils/validation";
import { z } from "zod";

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
    const errorColor = "#ef4444";
    const [error, setError] = useState<string | null>(null);
    const handleChangeText = (text: string) => {
      try {
        searchInputSchema.parse(text);
        setError(null);
        onChangeText(text);
      } catch (err) {
        if (err instanceof z.ZodError) {
          setError(err.errors[0].message);
          onChangeText(text);
        }
      }
    };

    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: useThemeColor(
              { light: "#f4f4f5", dark: "#3f3f46" },
              "background"
            ),
            borderRadius: 50,
            padding: 10,
            width: isWeb ? 400 : "100%",
            borderWidth: 1,
            borderColor: error
              ? errorColor
              : useThemeColor(
                  { light: "#e4e4e7", dark: "#52525b" },
                  "background"
                ),
          }}
        >
          <Ionicons
            name="search"
            size={20}
            color={error ? errorColor : iconColor}
            style={{ marginHorizontal: 10 }}
          />
          <TextInput
            className="flex-1 text-zinc-800 dark:text-zinc-100"
            value={value}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            style={isWeb ? { outline: "none" } : {}}
          />
          {value.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                onClear();
                setError(null);
              }}
              style={{ marginRight: 10 }}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={error ? errorColor : placeholderColor}
              />
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <Text
            style={{
              color: errorColor,
              fontSize: 12,
              marginTop: 4,
              marginLeft: 16,
            }}
          >
            {error}
          </Text>
        )}
      </View>
    );
  }
);

export default SearchBar;
