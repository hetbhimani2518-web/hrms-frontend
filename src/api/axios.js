import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

/* REQUEST INTERCEPTOR */
api.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth");

  if (auth) {
    const { accessToken } = JSON.parse(auth);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

/* RESPONSE INTERCEPTOR */
api.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const auth = JSON.parse(localStorage.getItem("auth"));

        const res = await axios.post(
          "http://localhost:8080/api/auth/refresh",
          { refreshToken: auth.refreshToken }
        );

        const newToken = res.data.accessToken;

        auth.accessToken = newToken;
        localStorage.setItem("auth", JSON.stringify(auth));

        isRefreshing = false;
        onRefreshed(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);

      } catch (err) {
        isRefreshing = false;
        localStorage.removeItem("auth");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;