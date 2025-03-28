import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import { Restaurant } from "@/services/restaurantService";
import RestaurantCard from "@/components/RestaurantCard";
import SearchBar from "@/components/SearchBar";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useResponsive } from "@/hooks/useResponsive";
import { useRestaurants } from "@/hooks/useRestaurants";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

const ExploreScreen: React.FC = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const { numColumns } = useResponsive();
  const debouncedSearchQuery = useDebouncedValue(searchInputValue, 200);
  const {
    restaurants,
    loading,
    loadingMore,
    refreshing,
    error,
    loadRestaurants,
    handleLoadMore,
    handleRefresh,
  } = useRestaurants(debouncedSearchQuery);

  const primaryColor = useThemeColor({}, "tint");
  const secondaryTextColor = useThemeColor({}, "icon");

  useEffect(() => {
    loadRestaurants(1, true, debouncedSearchQuery);
  }, [debouncedSearchQuery, loadRestaurants]);

  const handleSearchInputChange = useCallback((text: string): void => {
    setSearchInputValue(text);
  }, []);

  const handleClearSearch = useCallback((): void => {
    setSearchInputValue("");
  }, []);

  const ListFooterComponent = useMemo(() => {
    if (!loadingMore) return null;
    return (
      <View className="py-4 flex items-center justify-center">
        <ActivityIndicator size="small" color={primaryColor} />
        <Text className="text-zinc-500 dark:text-zinc-400 mt-2">
          Učitavanje još restorana...
        </Text>
      </View>
    );
  }, [loadingMore, primaryColor]);

  const ListEmptyComponent = useMemo(() => {
    if (loading) return null;
    return (
      <ThemedView className="flex-1 justify-center items-center p-8">
        {debouncedSearchQuery ? (
          <View className="items-center">
            <Ionicons
              name="search-outline"
              size={48}
              color={secondaryTextColor}
            />
            <Text className="text-zinc-700 dark:text-zinc-300 text-lg text-center mt-4">
              Nema rezultata za "{debouncedSearchQuery}"
            </Text>
            <TouchableOpacity
              className="mt-4 bg-zinc-200 dark:bg-zinc-700 px-4 py-2 rounded-full"
              onPress={handleClearSearch}
            >
              <Text className="text-zinc-800 dark:text-zinc-200 font-medium">
                Očisti pretragu
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="items-center">
            <Ionicons
              name="restaurant-outline"
              size={48}
              color={secondaryTextColor}
            />
            <Text className="text-zinc-700 dark:text-zinc-300 text-lg text-center mt-4">
              Nema dostupnih restorana
            </Text>
          </View>
        )}
      </ThemedView>
    );
  }, [loading, debouncedSearchQuery, secondaryTextColor, handleClearSearch]);

  const renderItem: ListRenderItem<Restaurant> = useCallback(
    ({ item }) => (
      <View
        className={`px-2 py-2 ${
          numColumns === 3 ? "w-1/3" : numColumns === 2 ? "w-1/2" : "w-full"
        }`}
      >
        <RestaurantCard restaurant={item} />
      </View>
    ),
    [numColumns]
  );

  const keyExtractor = useCallback(
    (item: Restaurant) => item.id.toString(),
    []
  );

  if (loading && !refreshing) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={primaryColor} />
        <Text className="mt-4 text-zinc-600 dark:text-zinc-400">
          Učitavanje restorana...
        </Text>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ThemedView>
        <View className="p-6 sm:flex-row justify-between items-center]">
          <Text className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-5 text-center sm:text-left sm:mb-0">
            Istraži Restorane
          </Text>
          <SearchBar
            value={searchInputValue}
            onChangeText={handleSearchInputChange}
            onClear={handleClearSearch}
            placeholder="Pretraži restorane..."
          />
        </View>

        {error ? (
          <ThemedView className="flex-1 justify-center items-center p-4">
            <Ionicons name="warning-outline" size={48} color="#EF4444" />
            <Text className="text-red-500 mt-4 mb-4 text-center">{error}</Text>
            <TouchableOpacity
              className="bg-zinc-200 dark:bg-zinc-700 px-6 py-3 rounded-full"
              onPress={() => loadRestaurants(1)}
            >
              <Text className="text-zinc-800 dark:text-zinc-200 font-medium">
                Pokušaj ponovno
              </Text>
            </TouchableOpacity>
          </ThemedView>
        ) : (
          <View className="mx-4">
            <FlatList
              data={restaurants}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              numColumns={numColumns}
              key={`column-${numColumns}`}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={[primaryColor]}
                  tintColor={primaryColor}
                />
              }
              ListEmptyComponent={ListEmptyComponent}
              ListFooterComponent={ListFooterComponent}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.3}
              removeClippedSubviews={true}
              maxToRenderPerBatch={10}
              windowSize={10}
              initialNumToRender={8}
            />
          </View>
        )}
      </ThemedView>
    </SafeAreaView>
  );
};

export default ExploreScreen;
