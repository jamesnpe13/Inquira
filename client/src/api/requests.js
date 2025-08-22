import { useGlobalStore } from '../store/useGlobalStore';
import { apiRefresh } from './axios';

export const refreshToken = async () => {
  const { setAccessToken } = useGlobalStore.getState();
  try {
    const res = await apiRefresh.post('/auth/refresh');
    setAccessToken(res.data.accessToken);
    return res;
  } catch (error) {
    console.error(error);
  }
};
