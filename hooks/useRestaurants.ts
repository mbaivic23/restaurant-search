import { useState, useCallback, useEffect } from "react";
import { fetchRestaurants, Restaurant } from "@/services/restaurantService";

// dohvacanje i upravljanje restoranima
export function useRestaurants(searchQuery: string = "") {
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
      search: string = searchQuery
    ) => {
      // postavi odgovarajuce stanje ucitavanja
      if (refresh) {
        setRefreshing(true);
      } else if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const response = await fetchRestaurants(page, search);

        // azuriraj listu restorana ovisno o tipu zahtjeva
        if (page === 1 || refresh) {
          setRestaurants(response.restaurants);
        } else {
          setRestaurants((prevRestaurants) => [
            ...prevRestaurants,
            ...response.restaurants,
          ]);
        }
        // azuriraj informacije o paginaciji
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
        setError(null);
      } catch (err) {
        setError("Nije moguće dohvatiti restorane");
        console.error("Error fetching restaurants:", err);
      } finally {
        // resetiraj stanja ucitavanja
        setLoading(false);
        setLoadingMore(false);
        setRefreshing(false);
      }
    },
    [searchQuery]
  );
  // inicijalno ucitavanje
  useEffect(() => {
    loadRestaurants(1);
  }, [loadRestaurants]);
  // funkcija za ucitavanje vise restorana (infinite scroll)
  const handleLoadMore = useCallback(() => {
    if (loadingMore || currentPage >= totalPages) return;
    loadRestaurants(currentPage + 1, false);
  }, [loadingMore, currentPage, totalPages, loadRestaurants]);
  // funkcija za osvježavanje (pull-to-refresh)
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
