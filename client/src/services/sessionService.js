import { api, apiAuth } from './apiService';
import { useGlobalStore } from '../store/useGlobalStore';

export const startSession = async (data) => {
  const { setAccessToken } = useGlobalStore.getState();

  try {
    const res = await api.post('/auth/login', data); // call auth login
    setAccessToken(res.data?.data?.accessToken);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const endSession = async () => {
  const { setAccessToken } = useGlobalStore.getState();

  try {
    const res = await api.post('/auth/logout'); // call logout
    setAccessToken(null);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const restoreSession = async () => {
  try {
    return (await refreshToken()) ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const refreshToken = async () => {
  const { setAccessToken } = useGlobalStore.getState();

  try {
    const res = await api.post('/auth/refresh'); // call refresh token
    const { accessToken: newAccessToken } = res?.data?.data;
    setAccessToken(newAccessToken); // store access token
    return res;
  } catch (error) {
    console.error();
    return false;
  }
};
