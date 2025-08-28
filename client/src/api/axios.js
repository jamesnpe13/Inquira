import axios from 'axios';
import { useGlobalStore } from '../store/useGlobalStore';

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiAuth = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach access token from global store
apiAuth.interceptors.request.use(
  (config) => {
    // get accessToken from global store
    const accessToken = useGlobalStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post('/auth/refresh');
        console.log(res);

        useGlobalStore.getState().setAccessToken(res?.data?.data?.accessToken);

        return apiAuth(originalRequest);
      } catch (error) {
        return Promise.reject({
          message: 'Refresh token invalid, aborting',
          isAuthAbort: true,
        });
      }
    }

    return Promise.reject(error);
  }
);
