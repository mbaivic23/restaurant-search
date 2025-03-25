import api from "./api";

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number | null;
  user_ratings_total: number | null;
  price_level: number | null;
  icon_url: string;
}

export interface RestaurantsResponse {
  totalRestaurants: number;
  totalPages: number;
  currentPage: number;
  restaurants: Restaurant[];
  hasSampleLimit: boolean;
  fixedSampleSize: number;
  maxRecords: number;
}
//dohvacanje restorana
export const fetchRestaurants = async (
  page: number = 1,
  search?: string
): Promise<RestaurantsResponse> => {
  try {
    const params: Record<string, string | number> = { page };
    if (search && search.trim() !== "") {
      params.search = search.trim();
    }
    const response = await api.get("/restaurants/sample", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};