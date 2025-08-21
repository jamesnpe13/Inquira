import axios from 'axios';
import { useGlobalStore } from './store/useGlobalStore';

const axiosConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// axios instance
const api = axios.create(axiosConfig);
const apiRefresh = axios.create(axiosConfig);

// request interceptor
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useGlobalStore.getState();
    console.log(`REQ INTERCEPTOR ACCESS TOKEN: ${accessToken}`);
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    const { accessToken, setAccessToken } = useGlobalStore.getState();

    if (error.response?.status === 401 && !config._retry) {
      console.warn('Unauthorized! Token may be expired.');
      config._retry = true;

      setAccessToken(null);

      try {
        const res = await apiRefresh.post('/auth/refresh');
        console.log(res.data);
        setAccessToken(res.data.accessToken);

        return api(config);
      } catch (error) {
        console.log(error);
      }
      // refresh token here
    }
    return Promise.reject(error);
  }
);

export default api;
