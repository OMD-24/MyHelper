import axios from "axios";

const USE_MOCK = true; // Toggle for hackathon demo vs real backend

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("kaamsetu_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("kaamsetu_user");
      localStorage.removeItem("kaamsetu_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { USE_MOCK };
export default api;