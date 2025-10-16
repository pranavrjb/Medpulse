import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001", // Changed back to port 3001
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 and 403 errors
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem("token"); // Clear invalid token
        // Redirect to login if not authenticated or not authorized
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;
