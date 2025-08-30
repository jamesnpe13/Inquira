import { endSession, restoreSession } from '../services/sessionService';
import PageLoading from '../components/PageLoading';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROUTES } from '../router/routerConfig';

export default function RestoreSession({ children }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const isRestored = await restoreSession();

      if (!isRestored) {
        await endSession(); // logout end session
        navigate(ROUTES.login.path, { replace: true }); // navigate to login
        setIsLoading(false);

        return;
      }

      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <PageLoading />;

  return children;
}
