import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Catchall from './pages/Catchall';
import { useGlobalStore } from './store/useGlobalStore';

export const ROUTES = {
  homepage: {
    path: '/',
    element: <Homepage />,
    title: 'Home',
  },
  dashboard: {
    path: '/dashboard',
    element: <Dashboard />,
    title: 'Dashboard',
  },
  login: {
    path: '/login',
    element: <Login />,
    title: 'Login',
  },
  register: {
    path: '/register',
    element: <Register />,
    title: 'Register',
  },
  catchall: {
    path: '*',
    element: <Catchall />,
    title: 'Page Not Found',
  },
};

export default function AppRoutes() {
  const { user } = useGlobalStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.homepage.path}
          element={<Navigate to={user ? ROUTES.dashboard.path : ROUTES.login.path} replace />}
        />
        <Route path={ROUTES.dashboard.path} element={ROUTES.dashboard.element} />
        <Route path={ROUTES.login.path} element={ROUTES.login.element} />
        <Route path={ROUTES.register.path} element={ROUTES.register.element} />
        <Route path={ROUTES.catchall.path} element={ROUTES.catchall.element} />
      </Routes>
    </BrowserRouter>
  );
}
