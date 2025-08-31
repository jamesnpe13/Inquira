import { useEffect, useState } from 'react';
import { useGlobalStore } from '../store/useGlobalStore';
import { restoreSession } from '../services/sessionService';
import PageLoading from '../components/PageLoading';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/routerConfig';

export default function RestoreSession({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [allowRender, setAllowRender] = useState(false);
  const { user } = useGlobalStore();

  console.log('[>>> COMPONENT RENDER]', location.pathname);

  useEffect(() => {
    console.log('[useEffect]');
    console.log('USER: ', user);

    async function checkToken() {
      console.log('Setting a new access token');
      try {
        const res = await restoreSession();
        if (!res) throw new Error('REDIRECTING TO LOGIN');
      } catch (error) {
        console.error(error);
        navigate(ROUTES.login.path, { replace: true });
      }
    }

    if (!user) {
      checkToken();
      return;
    }

    if (
      location.pathname === ROUTES.login.path ||
      location.pathname === ROUTES.homepage.path ||
      location.pathname === ROUTES.register.path
    ) {
      console.log('navigating back to dashboard');
      navigate(ROUTES.dashboard.path, { replace: true });
      return;
    }

    setAllowRender(true);
  }, [user, location.pathname]);

  return allowRender ? children : <PageLoading />;
}
