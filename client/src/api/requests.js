import { useGlobalStore } from '../store/useGlobalStore';
import { apiRefresh, api } from './axios';

export const refreshToken = async () => {
  const { setAccessToken } = useGlobalStore.getState();
  try {
    const res = await apiRefresh.post('/auth/refresh', {}, { params: { type: 'refresh' } });
    setAccessToken(res.data.data.accessToken);
    return res;
  } catch (error) {
    console.error(error);
  }
};
export const restoreSession = async () => {
  const { setAccessToken } = useGlobalStore.getState();
  try {
    const res = await apiRefresh.post('/auth/refresh', {}, { params: { type: 'restore' } });
    setAccessToken(res.data?.data?.accessToken);
    return res;
  } catch (error) {
    console.error(error);
  }
};
