import axios from "axios";
import { getCookie } from "cookies-next";

// Create axios instance with base URL
const axiosClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:3000/api",
  timeout: 10000,
  withCredentials: true, // send cookies to backend (access_token httpOnly cookie)
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to automatically add JWT token
axiosClient.interceptors.request.use(
  (config) => {
    // Get token safely based on environment
    let token;

    if (typeof window !== "undefined") {
      // Client-side: try to read a JS-accessible cookie if we stored one
      // in addition to the httpOnly cookie that backend sets.
      token = getCookie("accessToken") || getCookie("access_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      // Clear invalid tokens and optionally trigger logout flow
      if (typeof window !== "undefined") {
        // Client-side redirect to login; a future refresh-token handler could
        // try to obtain a new access token before redirecting.
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
