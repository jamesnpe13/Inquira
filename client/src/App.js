import { useEffect } from 'react';
import AppRoutes from './router';
import './styles/main.scss';
import { useGlobalStore } from './store/useGlobalStore';

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
      {/* <div className='bg'></div> */}
      <AppRoutes />
    </>
  );
}

export default App;
