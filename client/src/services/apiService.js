import axios from 'axios';
import { useGlobalStore } from '../store/useGlobalStore';
import { refreshToken } from './sessionService';

const devUrl = process.env.REACT_APP_API_BASE_URL_DEV;
const prodUrl = process.env.REACT_APP_API_BASE_URL;

const baseURL = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;

console.log(baseURL);

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
    const { setAccessToken } = useGlobalStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await refreshToken();
        setAccessToken(res?.data?.data?.accessToken);
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
