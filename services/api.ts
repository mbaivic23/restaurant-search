import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from "zod";
declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}
const apiErrorSchema = z.object({
  message: z.string().optional(),
  errors: z.record(z.array(z.string())).optional(),
  statusCode: z.number().optional(),
});

export type ApiErrorResponse = z.infer<typeof apiErrorSchema>;
const isWeb = typeof document !== "undefined";
const baseURL = isWeb
  ? "https://thingproxy.freeboard.io/fetch/https://api.dinver.eu/api/app"
  : "https://api.dinver.eu/api/app";

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    } catch (error) {
      console.error("Greška u dohvaćanju tokena:", error);
      return config;
    }
  },
  (error) => {
    console.error("Pogreška zahtjeva:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response) {
      const { status, data, headers } = error.response;
      console.error("API greška:", {
        status,
        data,
        headers,
      });
      const errorValidation = apiErrorSchema.safeParse(data);
      const validatedError = errorValidation.success
        ? errorValidation.data
        : { message: "Nepoznata greška" };
      const originalRequest = error.config;
      if (status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = await AsyncStorage.getItem("refreshToken");
          if (!refreshToken) {
            await AsyncStorage.removeItem("accessToken");
            await AsyncStorage.removeItem("refreshToken");
            await AsyncStorage.removeItem("user");
            return Promise.reject(error);
          }
          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem("refreshToken");
          await AsyncStorage.removeItem("user");
          return Promise.reject(error);
        } catch (refreshError) {
          console.error("Greška u refresh token:", refreshError);
          return Promise.reject(refreshError);
        }
      }
    } else if (error.request)
      console.error("API greška: nema odgovora", error.request);
    else console.error("API greška:", error.message);
    return Promise.reject(error);
  }
);

export default api;
