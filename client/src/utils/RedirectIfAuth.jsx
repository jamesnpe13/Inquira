import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGlobalStore } from '../store/useGlobalStore';
import { restoreSession } from '../services/sessionService';
import PageLoading from '../components/PageLoading';

export default function RedirectIfAuth() {
  const { accessToken } = useGlobalStore();
  const [allowRender, setAllowRender] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const isSuccess = await restoreSession();

      if (!isSuccess) {
        setIsAuth(false);
        setAllowRender(true);
        return;
      }

      setIsAuth(true);
      setAllowRender(true);
    };

    checkSession();
  }, []);

  if (!allowRender) return <PageLoading />;

  return isAuth ? <Navigate to={'/dashboard'} replace /> : <Outlet />;
}
