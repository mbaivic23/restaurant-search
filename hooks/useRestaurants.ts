import { useState, useCallback, useEffect } from "react";
import { fetchRestaurants, Restaurant } from "@/services/restaurantService";
import { z } from "zod";
const searchQuerySchema = z.string().max(100, "Pretraga je preduga").optional();
interface RestaurantsState {
  restaurants: Restaurant[];
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}
interface UseRestaurantsReturn extends RestaurantsState {
  loadRestaurants: (
    page: number,
    refresh?: boolean,
    search?: string
  ) => Promise<void>;
  handleLoadMore: () => void;
  handleRefresh: () => void;
}
export function useRestaurants(searchQuery: string = ""): UseRestaurantsReturn {
  const validatedSearch = searchQuerySchema.parse(searchQuery);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const loadRestaurants = useCallback(
    async (
      page: number,
      refresh: boolean = false,
      search: string = validatedSearch || ""
    ) => {
      try {
        if (refresh) setRefreshing(true);
        else if (page === 1) setLoading(true);
        else setLoadingMore(true);
        const pageParam = Math.max(1, page);
        const searchParam = search.trim();
        const response = await fetchRestaurants(pageParam, searchParam);
        if (page === 1 || refresh) {
          setRestaurants(response.restaurants);
        } else {
          setRestaurants((prevRestaurants) => [
            ...prevRestaurants,
            ...response.restaurants,
          ]);
        }
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Nije moguće dohvatiti restorane";
        setError(errorMessage);
        console.error("Greška pri dohvaćanju restorana:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
        setRefreshing(false);
      }
    },
    [validatedSearch]
  );
  useEffect(() => {
    loadRestaurants(1);
  }, [loadRestaurants]);

  const handleLoadMore = useCallback(() => {
    if (loadingMore || currentPage >= totalPages) return;
    loadRestaurants(currentPage + 1, false);
  }, [loadingMore, currentPage, totalPages, loadRestaurants]);

  const handleRefresh = useCallback(() => {
    loadRestaurants(1, true);
  }, [loadRestaurants]);
  return {
    restaurants,
    loading,
    loadingMore,
    refreshing,
    error,
    currentPage,
    totalPages,
    loadRestaurants,
    handleLoadMore,
    handleRefresh,
  };
}
