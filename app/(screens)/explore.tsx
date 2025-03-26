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
import { useResponsive, isWeb } from "@/hooks/useResponsive";
import { useRestaurants } from "@/hooks/useRestaurants";

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

  // ucitaj restorane kada se promijeni debouncedSearchQuery
  useEffect(() => {
    loadRestaurants(1, true, debouncedSearchQuery);
  }, [debouncedSearchQuery, loadRestaurants]);

  // funkcija za promjenu teksta pretrage
  const handleSearchInputChange = useCallback((text: string): void => {
    setSearchInputValue(text);
  }, []);

  // funkcija za brisanje pretrage
  const handleClearSearch = useCallback((): void => {
    setSearchInputValue("");
  }, []);

  // footer za lazy loading
  const ListFooterComponent = useMemo(() => {
    if (!loadingMore) return null;
    return (
      <View className="py-4 flex items-center justify-center">
        <ActivityIndicator size="small" color="#713f12" />
        <Text className="text-gray-500 mt-2">Učitavanje još restorana...</Text>
      </View>
    );
  }, [loadingMore]);

  // komponenta za prazno stanje
  const ListEmptyComponent = useMemo(() => {
    if (loading) return null;
    return (
      <View className="flex-1 justify-center items-center p-8">
        {debouncedSearchQuery ? (
          <>
            <Text className="text-gray-700 text-lg text-center mb-4">
              Nema rezultata
            </Text>
          </>
        ) : (
          <Text className="text-gray-700 text-lg text-center mb-4">
            Nema dostupnih restorana
          </Text>
        )}
      </View>
    );
  }, [loading, debouncedSearchQuery]);

  // stil za container
  const contentContainerStyle = useMemo(
    () => ({
      paddingVertical: 16,
      paddingHorizontal: isWeb ? 8 : 0,
    }),
    [isWeb]
  );

  // renderer za stavke liste
  const renderItem: ListRenderItem<Restaurant> = useCallback(
    ({ item }) => (
      <View
        className={`px-4 py-2 ${
          numColumns === 3 ? "w-1/3" : numColumns === 2 ? "w-1/2" : "w-full"
        }`}
      >
        <RestaurantCard restaurant={item} />
      </View>
    ),
    [numColumns]
  );

  // keyExtractor za FlatList
  const keyExtractor = useCallback((item: Restaurant) => item.id, []);

  // prikaz stanja ucitavanja
  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#713f12" />
        <Text className="mt-4 text-gray-500">Učitavanje restorana...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="px-4 py-4 sm:flex-row justify-between items-center">
        <Text className="text-2xl font-extrabold text-banana-800 mb-5 text-center sm:text-left sm:ml-5 sm:mb-0">
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
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 mb-4">{error}</Text>
          <TouchableOpacity
            className="bg-banana-300 px-4 py-2 rounded-lg"
            onPress={() => loadRestaurants(1)}
          >
            <Text className="text-black font-medium">Pokušaj ponovno</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          style={{ marginBottom: isWeb ? 45 : 70 }}
          data={restaurants}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={numColumns}
          key={`column-${numColumns}`}
          contentContainerStyle={contentContainerStyle}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#0891b2"]}
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
      )}
    </SafeAreaView>
  );
};

export default ExploreScreen;
