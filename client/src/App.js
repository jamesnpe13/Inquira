import './styles/main.scss';
import useAutoRefreshToken from './hooks/useAutoRefresh';
import { useGlobalStore } from './store/useGlobalStore';
import { restoreSession } from './api/requests';
import { useEffect } from 'react';
import AppRoutes from './router';

function App() {
  const { theme, accessToken } = useGlobalStore();

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => {
        console.log('[DEVELOPMENT MODE]');
        restoreSession();
      }, 0);

      return () => clearTimeout(timer);
    }

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
