import axios from "axios";
const isWeb = typeof document !== "undefined";
const baseURL = isWeb
  ? "https://thingproxy.freeboard.io/fetch/https://api.dinver.eu/api/app" // proxy za web
  : "https://api.dinver.eu/api/app"; // direktni URL za native

// postavljanje axios instance
const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
// dodavanje interceptora za odgovore
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error("API Error: No response received", error.request);
    } else {
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);
export default api;
