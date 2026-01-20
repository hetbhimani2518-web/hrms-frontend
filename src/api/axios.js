import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("auth");

    if (auth) {
      try {
        const { accessToken } = JSON.parse(auth);
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch {
        localStorage.removeItem("auth");
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
