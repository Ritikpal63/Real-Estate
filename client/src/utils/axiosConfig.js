// src/utils/axiosConfig.js
import axios from "axios";

const baseURL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : (console.error("⚠️ VITE_API_URL is not set in production!"), "/api");

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠️ No token found for request:", config.url);
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(
      "Response error:",
      error.response?.status,
      error.response?.data,
    );

    if (error.response?.status === 401) {
      console.warn("⚠️ Token expired or invalid");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];

      // Redirect to login page
      if (window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
