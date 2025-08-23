import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router';
import { refreshToken } from '../api/requests';

export default async function useAutoRefreshToken(token) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    console.log('AUTO REFRESH INITIATED <<');

    const { exp } = jwtDecode(token);
    if (!exp || typeof exp !== 'number') return;

    const timeDiff = exp * 1000 - Date.now(); // ms until expiry
    const timeAdvance = 1 * 60 * 1000; // 1 minute in ms
    const timeUntilRefresh = timeDiff - timeAdvance;

    if (timeUntilRefresh <= 0) {
      // Refresh immediately if token is expired or about to expire
      refreshToken();
      return;
    }

    const timeoutId = setTimeout(() => {
      refreshToken();
    }, timeUntilRefresh);

    return () => clearTimeout(timeoutId);
  }, [token]);
}
