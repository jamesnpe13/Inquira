import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PageLoading from '../components/PageLoading';
import { useGlobalStore } from '../store/useGlobalStore';
import { refreshToken, restoreSession } from '../services/sessionService';

export default function RestoreSession() {
  const navigate = useNavigate();
  const [allowRender, setAllowRender] = useState(false);

  console.log('%c[RESTORE SESSION]', 'color: yellow');

  useEffect(() => {
    console.log('%c[USE EFFECT]', 'color: violet');
    const { accessToken } = useGlobalStore.getState();
    console.log('ACCESS TOKEN: ', accessToken);

    const checkSession = async () => {
      if (!accessToken) {
        const refreshSuccess = await restoreSession();
        console.log(`%cRefresh token success?: ${refreshSuccess}`, `${refreshSuccess ? 'color: lime' : 'color: red'}`);

        // if no refresh token cookie
        if (!refreshSuccess) {
          console.log('Setting allowRender to false');
          setAllowRender(false);

          console.log('Navigating to index');
          navigate('/');

          console.log('-------------------');

          return;
        }
      }

      console.log('Setting allowRender to true');
      setAllowRender(true);
      console.log('-------------------');
    };

    checkSession();
  }, []);

  return allowRender ? <Outlet /> : <PageLoading />;
}
