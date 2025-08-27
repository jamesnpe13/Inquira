import React, { useEffect } from 'react';
import { useGlobalStore } from '../store/useGlobalStore';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../router';

export default function RequireAuth({ children }) {
  const { accessToken, setAccessToken, user, setUser } = useGlobalStore();

  if (!accessToken) {
    console.log('Unauthorized access. Please login');

    return <Navigate to={ROUTES.login.path} replace />;
  }

  return children;
}
