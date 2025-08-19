import axios from 'axios';
import { useGlobalStore } from './store/useGlobalStore';

// axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// request interceptor
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useGlobalStore.getState();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // handle expired token
      console.warn('Unauthorized! Token may be expired.');
      // refresh token here
    }
    return Promise.reject(error);
  }
);

export default api;
