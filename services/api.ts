import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isWeb = typeof document !== "undefined";
const baseURL = isWeb
  ? "https://thingproxy.freeboard.io/fetch/https://api.dinver.eu/api/app" // proxy za web
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
    const token = await AsyncStorage.getItem("accessToken");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });

      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = await AsyncStorage.getItem("refreshToken");
          if (!refreshToken) return Promise.reject(error);

          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem("refreshToken");
          await AsyncStorage.removeItem("user");
          return Promise.reject(error);
        } catch (refreshError) {
          console.error("Refresh token error:", refreshError);
          return Promise.reject(refreshError);
        }
      }
    } else if (error.request) {
      console.error("API Error: No response received", error.request);
    } else {
      console.error("API Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
