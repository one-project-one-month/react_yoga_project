import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const res = await api
          .post("/api/v1/refresh", { token: refreshToken });
        if (res.status === 200) {
          localStorage.setItem("authToken", res.data.authToken);
          api.defaults.headers.common["Authorization"] = `Bearer ${res.data.authToken}`;
          return api(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;