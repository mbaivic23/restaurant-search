import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { Restaurant } from "@/services/restaurantService";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const imageURL = restaurant.icon_url;
  const backgroundColor = useThemeColor(
    { light: "#f4f4f5", dark: "#3f3f46" },
    "background"
  );
  const cardBorderColor = useThemeColor(
    { light: "#e4e4e7", dark: "#52525b" },
    "background"
  );

  const renderPriceLevel = () => {
    if (
      restaurant.price_level === null ||
      restaurant.price_level === undefined
    ) {
      return null;
    }
    const priceColor = useThemeColor(
      { light: "#059669", dark: "#10b981" },
      "tint"
    );
    return (
      <View className="bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded-full">
        <Text style={{ color: priceColor }}>
          {"$".repeat(restaurant.price_level)}
        </Text>
      </View>
    );
  };

  return (
    <View className="rounded-2xl overflow-hidden" style={{ backgroundColor }}>
      <ImageBackground
        className="h-48 w-full overflow-hidden"
        source={{ uri: imageURL }}
        resizeMode="cover"
      >
        {restaurant.rating !== null && restaurant.rating !== undefined && (
          <View className="absolute bottom-4 right-4 flex-row items-center bg-black bg-opacity-60 rounded-xl px-2 py-1">
            <Ionicons name="star" color="#FFD700" size={16} />
            <Text className="text-white text-base ml-1">
              {restaurant.rating?.toFixed(1)}{" "}
              {restaurant.user_ratings_total
                ? `(${restaurant.user_ratings_total})`
                : ""}
            </Text>
          </View>
        )}
      </ImageBackground>
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="flex-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {restaurant.name}
          </Text>
          {renderPriceLevel()}
        </View>
        <View className="flex-row items-center">
          <Ionicons
            className="mr-4"
            name="location"
            size={16}
            color={useThemeColor({}, "icon")}
          />
          <Text className="flex-1 text-zinc-500 dark:text-zinc-400">
            {restaurant.address}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RestaurantCard;
