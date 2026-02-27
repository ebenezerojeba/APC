// import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 15000,
//   headers: { 'Content-Type': 'application/json' },
// });

// // Request interceptor — attach access token
// api.interceptors.request.use((config) => {
//   // Import store here to avoid circular deps
//   const { accessToken } = JSON.parse(
//     localStorage.getItem('apc-admin-auth') || '{}'
//   );
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// // Response interceptor — handle 401 and refresh token
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return api(originalRequest);
//           })
//           .catch(Promise.reject);
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       const stored = JSON.parse(localStorage.getItem('apc-admin-auth') || '{}');
//       const refreshToken = stored.refreshToken;

//       if (!refreshToken) {
//         // No refresh token, redirect to login
//         window.location.href = '/login';
//         return Promise.reject(error);
//       }

//       try {
//         const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
//         const newAccessToken = data.data.accessToken;
//         const newRefreshToken = data.data.refreshToken;

//         // Update store
//         const state = JSON.parse(localStorage.getItem('apc-admin-auth') || '{}');
//         state.accessToken = newAccessToken;
//         state.refreshToken = newRefreshToken;
//         localStorage.setItem('apc-admin-auth', JSON.stringify(state));

//         processQueue(null, newAccessToken);
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         localStorage.removeItem('apc-admin-auth');
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;



import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://apcbackend.vercel.app/api';
// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Helper: read tokens straight from Zustand's persisted state ──────────────
// Zustand persist wraps state as { state: { ... }, version: 0 }
const getStoredTokens = () => {
  try {
    const raw = localStorage.getItem('apc-admin-auth');
    if (!raw) return { accessToken: null, refreshToken: null };
    const parsed = JSON.parse(raw);
    // Zustand persist nests under .state
    const state = parsed?.state ?? parsed;
    return {
      accessToken: state?.accessToken ?? null,
      refreshToken: state?.refreshToken ?? null,
    };
  } catch {
    return { accessToken: null, refreshToken: null };
  }
};

const setStoredTokens = (accessToken, refreshToken) => {
  try {
    const raw = localStorage.getItem('apc-admin-auth');
    const parsed = raw ? JSON.parse(raw) : { state: {}, version: 0 };
    // Handle both wrapped and unwrapped formats
    if (parsed.state) {
      parsed.state.accessToken = accessToken;
      parsed.state.refreshToken = refreshToken;
    } else {
      parsed.accessToken = accessToken;
      parsed.refreshToken = refreshToken;
    }
    localStorage.setItem('apc-admin-auth', JSON.stringify(parsed));
  } catch {
    // ignore
  }
};

const clearStoredAuth = () => {
  localStorage.removeItem('apc-admin-auth');
};

// ── Request interceptor: attach access token to every request ────────────────
api.interceptors.request.use((config) => {
  const { accessToken } = getStoredTokens();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ── Response interceptor: silent token refresh on 401 ───────────────────────
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only attempt refresh on 401, and only once per request
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Queue subsequent requests while a refresh is in-flight
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const { refreshToken } = getStoredTokens();

    if (!refreshToken) {
      isRefreshing = false;
      clearStoredAuth();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    try {
      // Use plain axios (not the intercepted instance) to avoid loops
      const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
      const newAccessToken = data.data.accessToken;
      const newRefreshToken = data.data.refreshToken;

      // Persist new tokens into localStorage (Zustand-aware)
      setStoredTokens(newAccessToken, newRefreshToken);

      processQueue(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearStoredAuth();
      window.location.href = '/login';
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;