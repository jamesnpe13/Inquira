import './styles/main.scss';
import { useGlobalStore } from './store/useGlobalStore';
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

  return (
    <>
      {/* <div className='container bg-color-white padding-block'>Header</div> */}
      <AppRoutes />
    </>
  );
}

export default App;
