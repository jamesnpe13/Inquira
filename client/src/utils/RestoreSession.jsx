import { restoreSession } from '../services/sessionService';
import { useGlobalStore } from '../store/useGlobalStore';
import { Outlet, useNavigate } from 'react-router-dom';
import PageLoading from '../components/PageLoading';
import { useEffect, useState } from 'react';

export default function RestoreSession() {
  const [allowRender, setAllowRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { accessToken } = useGlobalStore.getState();

    const checkSession = async () => {
      if (!accessToken) {
        const refreshSuccess = await restoreSession();

        // if no refresh token cookie
        if (!refreshSuccess) {
          setAllowRender(false);
          navigate('/');

          return;
        }
      }
      setAllowRender(true);
    };

    checkSession();
  }, []);

  return allowRender ? <Outlet /> : <PageLoading />;
}
