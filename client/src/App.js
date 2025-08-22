import { useEffect } from 'react';
import AppRoutes from './router';
import './styles/main.scss';
import { useGlobalStore } from './store/useGlobalStore';
import useAutoRefreshToken from './hooks/useAutoRefresh';
import { refreshToken } from './api/requests';
import { apiRefresh, api } from './api/axios';

function App() {
  const { theme, accessToken } = useGlobalStore();

  window.getAccessToken = () => useGlobalStore.getState().accessToken;

  const restoreSession = async () => {
    console.log('attempting session restore');
    try {
      const res = await api.post('/auth/restore');
      if (res.data.session_status === 1) {
        await refreshToken();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    restoreSession();
  }, []);

  useAutoRefreshToken(accessToken, refreshToken);
  return (
    <>
      {/* <div className='container bg-color-white padding-block'>Header</div> */}
      <AppRoutes />
    </>
  );
}

export default App;
