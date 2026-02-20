import axios from "axios";

const USE_MOCK = false;

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("kaamsetu_token");

  // Only attach token if it looks like a real JWT (has 2 dots)
  if (token && token.split(".").length === 3) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // Clear everything and redirect to login
      localStorage.removeItem("kaamsetu_user");
      localStorage.removeItem("kaamsetu_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { USE_MOCK };
export default api;