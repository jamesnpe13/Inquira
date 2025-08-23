import { useEffect } from 'react';
import AppRoutes from './router';
import './styles/main.scss';
import { useGlobalStore } from './store/useGlobalStore';
import useAutoRefreshToken from './hooks/useAutoRefresh';
import { refreshToken, restoreSession } from './api/requests';
import { apiRefresh, api } from './api/axios';

function App() {
  const { theme, accessToken, setAccessToken } = useGlobalStore();

  window.getAccessToken = () => useGlobalStore.getState().accessToken;

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    restoreSession();
  }, []);

  useAutoRefreshToken(accessToken);
  return (
    <>
      {/* <div className='container bg-color-white padding-block'>Header</div> */}
      <AppRoutes />
    </>
  );
}

export default App;
