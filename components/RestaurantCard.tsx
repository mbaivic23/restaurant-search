import React from "react";
import { View, Text, Image, Platform } from "react-native";
import { Restaurant } from "@/services/restaurantService";
import { icons } from "@/constants/icon";

interface RestaurantCardProps {
  restaurant: Restaurant;
}
const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const isWeb = Platform.OS === "web";
  const imageURL = restaurant.icon_url;
  return (
    <View style={{ backgroundColor: "white" }} className="rounded-xl">
      <Image
        source={{
          uri: imageURL,
        }}
        className="w-full h-40"
        resizeMode="cover"
        style={{ width: "100%", height: isWeb ? 160 : 200 }}
      />
      <View className="p-4">
        <Text className="text-lg font-bold text-gray-800 mb-1">
          {restaurant.name}
        </Text>
        <Text className="text-gray-600 mb-2">{restaurant.address}</Text>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            {restaurant.rating ? (
              <>
                <Image
                  source={icons.star}
                  tintColor="#FFD700"
                  style={
                    isWeb
                      ? { width: 20, height: 20 }
                      : { width: 32, height: 32 }
                  }
                  resizeMode="contain"
                />
                <Text className="text-gray-600 text-sm ml-1">
                  {restaurant.rating.toFixed(1)}{" "}
                  {restaurant.user_ratings_total
                    ? `(${restaurant.user_ratings_total})`
                    : ""}
                </Text>
              </>
            ) : (
              <></>
            )}
          </View>
          {restaurant.price_level !== null ? (
            <Text className="text-gray-700">
              {"$".repeat(restaurant.price_level)}
            </Text>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
};
export default RestaurantCard;
