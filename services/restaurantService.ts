import api from "./api";
import {
  searchParamsSchema,
  restaurantsResponseSchema,
  Restaurant,
} from "@/utils/validation";

export type { Restaurant };
export interface RestaurantsResponse {
  totalRestaurants: number;
  totalPages: number;
  currentPage: number;
  restaurants: Restaurant[];
  hasSampleLimit: boolean;
  fixedSampleSize: number;
  maxRecords: number;
}

export const fetchRestaurants = async (
  page: number = 1,
  search?: string
): Promise<RestaurantsResponse> => {
  try {
    const paramsResult = searchParamsSchema.safeParse({ page, search });
    const params: Record<string, string | number> = {
      page: paramsResult.success ? paramsResult.data.page : 1,
    };
    if (
      paramsResult.success &&
      paramsResult.data.search &&
      paramsResult.data.search.trim() !== ""
    ) {
      params.search = paramsResult.data.search.trim();
    }
    const response = await api.get("/restaurants/sample", { params });
    const responseResult = restaurantsResponseSchema.safeParse(response.data);
    if (responseResult.success) {
      return responseResult.data;
    } else {
      console.warn("Nevažeći API odgovor:", responseResult.error);
      return response.data as RestaurantsResponse;
    }
  } catch (error) {
    console.error("Pogreška pri dohvaćanju restorana:", error);
    throw error;
  }
};
