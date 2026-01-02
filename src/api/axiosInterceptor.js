import api from "./axios";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const setupInterceptors = (auth, login, logout) => {

  api.interceptors.request.use(
    (config) => {
      if (auth?.accessToken) {
        config.headers.Authorization =
          `Bearer ${auth.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        auth?.refreshToken
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers.Authorization =
              "Bearer " + token;
            return api(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const res = await api.post("/auth/refresh", {
            refreshToken: auth.refreshToken,
          });

          login(res.data);

          api.defaults.headers.Authorization =
            "Bearer " + res.data.accessToken;

          processQueue(null, res.data.accessToken);
          return api(originalRequest);

        } catch (err) {
          processQueue(err, null);
          logout();
          return Promise.reject(err);

        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
