import axios from "axios";

const USE_MOCK = false;

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("kaamsetu_token");

  // Only attach if it looks like a real JWT (3 parts separated by dots)
  if (token && token.split(".").length === 3) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Check if this is NOT a login/register request
      const url = error.config?.url || "";
      if (!url.includes("/auth/")) {
        localStorage.removeItem("kaamsetu_user");
        localStorage.removeItem("kaamsetu_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export { USE_MOCK };
export default api;