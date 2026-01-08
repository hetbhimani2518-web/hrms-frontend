import axios from "axios";

let setGlobalLoading = null;

export const bindLoading = (setter) => {
  setGlobalLoading = setter;
};

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    if (setGlobalLoading) setGlobalLoading(true);

    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  (error) => {
    if (setGlobalLoading) setGlobalLoading(false);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (setGlobalLoading) setGlobalLoading(false);
    return response;
  },
  async (error) => {
    if (setGlobalLoading) setGlobalLoading(false);

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const auth = JSON.parse(localStorage.getItem("auth"));

        const res = await axios.post(
          "http://localhost:8080/auth/refresh",
          { refreshToken: auth.refreshToken }
        );

        const newAccessToken = res.data.accessToken;

        const updatedAuth = {
          ...auth,
          accessToken: newAccessToken,
        };

        localStorage.setItem("auth", JSON.stringify(updatedAuth));

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("auth");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
