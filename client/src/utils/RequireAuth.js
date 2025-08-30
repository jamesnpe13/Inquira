import { useEffect, useState } from 'react';
import PageLoading from '../components/PageLoading';
import { useGlobalStore } from '../store/useGlobalStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/routerConfig';

export default function RequireAuth({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const { accessToken } = useGlobalStore.getState();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      setIsAuth(true);
    } else {
      navigate(ROUTES.login.path, { replace: true });
      console.error('Unauthorized access. Please log in');
    }
  }, []);

  if (!isAuth) return <PageLoading />;
  return children;
}
