import './styles/main.scss';
import { useGlobalStore } from './store/useGlobalStore';
import { useEffect } from 'react';
import AppRoutes from './router';
import { api, apiAuth } from './api/axios';

function App() {
  const { theme, accessToken } = useGlobalStore();

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const getHealth = async () => {
    try {
      const res = await apiAuth.get('/health');
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  window.getHealth = getHealth;

  return (
    <>
      {/* <div className='container bg-color-white padding-block'>Header</div> */}
      <AppRoutes />
    </>
  );
}

export default App;
