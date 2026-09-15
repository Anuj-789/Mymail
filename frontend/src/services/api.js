import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  // Required for refreshToken HTTP-only cookie
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});


// =========================================================
// REQUEST INTERCEPTOR
// =========================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);


// =========================================================
// REFRESH TOKEN CONTROL
// =========================================================

// Prevent multiple refresh requests
// when multiple API calls return 401 together.

let isRefreshing = false;

let refreshSubscribers = [];


// =========================================================
// SUBSCRIBE REQUEST
// =========================================================

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};


// =========================================================
// NOTIFY ALL WAITING REQUESTS
// =========================================================

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => {
    callback(newToken);
  });

  refreshSubscribers = [];
};


// =========================================================
// CLEAR AUTH DATA
// =========================================================

const clearAuthSession = () => {
  localStorage.removeItem("accessToken");

  // User-friendly session-expired message
  sessionStorage.setItem(
    "authMessage",
    "Your session has expired. Please login again to continue.",
  );
};


// =========================================================
// RESPONSE INTERCEPTOR
// =========================================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // =====================================================
    // ONLY HANDLE 401
    // =====================================================

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry
    ) {
      return Promise.reject(error);
    }


    // =====================================================
    // DO NOT REFRESH THESE AUTH REQUESTS
    // =====================================================

    const requestUrl = originalRequest?.url || "";

    const isAuthRequest =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/refresh-token") ||
      requestUrl.includes("/auth/forgot-password") ||
      requestUrl.includes("/auth/reset-password") ||
      requestUrl.includes("/auth/verify-email") ||
      requestUrl.includes("/auth/logout");


    if (isAuthRequest) {
      return Promise.reject(error);
    }


    // =====================================================
    // MARK REQUEST AS RETRIED
    // =====================================================

    originalRequest._retry = true;


    // =====================================================
    // IF REFRESH IS ALREADY RUNNING
    // WAIT FOR NEW TOKEN
    // =====================================================

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newToken) => {
          if (!newToken) {
            reject(error);
            return;
          }

          originalRequest.headers.Authorization =
            `Bearer ${newToken}`;

          resolve(api(originalRequest));
        });
      });
    }


    // =====================================================
    // START REFRESH
    // =====================================================

    isRefreshing = true;


    try {
      const refreshResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
        {},
        {
          withCredentials: true,
        },
      );


      const newAccessToken =
        refreshResponse.data?.accessToken;


      // ===================================================
      // REFRESH FAILED - NO TOKEN
      // ===================================================

      if (!newAccessToken) {
        throw new Error(
          "Unable to refresh authentication session.",
        );
      }


      // ===================================================
      // SAVE NEW ACCESS TOKEN
      // ===================================================

      localStorage.setItem(
        "accessToken",
        newAccessToken,
      );


      // ===================================================
      // UPDATE WAITING REQUESTS
      // ===================================================

      onRefreshed(newAccessToken);


      // ===================================================
      // RETRY ORIGINAL REQUEST
      // ===================================================

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;


      return api(originalRequest);

    } catch (refreshError) {

      // ===================================================
      // REFRESH TOKEN ALSO EXPIRED / INVALID
      // ===================================================

      onRefreshed(null);

      clearAuthSession();


      // Redirect to login
      window.location.href = "/login";


      return Promise.reject(refreshError);

    } finally {
      isRefreshing = false;
    }
  },
);


export default api;