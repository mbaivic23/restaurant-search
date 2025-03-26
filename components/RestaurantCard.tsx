import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { Restaurant } from "@/services/restaurantService";
import { Ionicons } from "@expo/vector-icons";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const imageURL = restaurant.icon_url;

  return (
    <View
      style={{ backgroundColor: "white", borderRadius: 20, overflow: "hidden" }}
    >
      <ImageBackground
        source={{ uri: imageURL }}
        resizeMode="cover"
        style={{ height: 180 }}
      >
        {restaurant.rating !== null && restaurant.rating !== undefined && (
          <View
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              borderRadius: 10,
              paddingHorizontal: 8,
              paddingVertical: 4,
            }}
          >
            <Ionicons name="star" color="#FFD700" size={16} />
            <Text
              style={{
                color: "white",
                fontSize: 14,
                marginLeft: 4,
              }}
            >
              {restaurant.rating?.toFixed(1)}{" "}
              {restaurant.user_ratings_total
                ? `(${restaurant.user_ratings_total})`
                : ""}
            </Text>
          </View>
        )}
      </ImageBackground>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 15,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-col">
          <Text className="text-lg font-bold text-gray-900 mb-1">
            {restaurant.name}
          </Text>
          <Text className="text-base text-gray-500">{restaurant.address}</Text>
        </View>
        {restaurant.price_level !== null ? (
          <Text>{"$".repeat(restaurant.price_level)}</Text>
        ) : null}
      </View>
    </View>
  );
};
export default RestaurantCard;
