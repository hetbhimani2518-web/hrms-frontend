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

api.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;

      const auth = JSON.parse(localStorage.getItem("auth"));

      if (!auth?.refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {

        const res = await api.post("/auth/refresh", {
          refreshToken: auth.refreshToken,
        });

        const newAccessToken = res.data.accessToken;

        auth.accessToken = newAccessToken;

        localStorage.setItem("auth", JSON.stringify(auth));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch {

        localStorage.removeItem("auth");

        window.location.href = "/login";

      }
    }

    return Promise.reject(error);
  }
);

export default api;