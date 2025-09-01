import './styles/main.scss';
import { useGlobalStore } from './store/useGlobalStore';
import { useEffect } from 'react';
import AppRoutes from './router/router';
import { apiAuth } from './services/apiService';

function App() {
  const { theme } = useGlobalStore();

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

  return <AppRoutes />;
}

export default App;
