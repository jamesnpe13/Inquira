import { useEffect } from 'react';
import AppRoutes from './router';
import './styles/main.scss';
import { useGlobalStore } from './store/useGlobalStore';
import BG from './assets/bg.png';

function App() {
  const { theme } = useGlobalStore();

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <>
      {/* <div className='container bg-color-white padding-block'>Header</div> */}
      <AppRoutes />
    </>
  );
}

export default App;
