import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Catchall from './pages/Catchall';

export const ROUTES = {
  homepage: {
    path: '/',
    element: <Homepage />,
    title: 'Home',
  },
  dashboard: {
    path: '/',
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.homepage.path} element={ROUTES.homepage.element} />
        <Route path={ROUTES.dashboard.path} element={ROUTES.dashboard.element} />
        <Route path={ROUTES.login.path} element={ROUTES.login.element} />
        <Route path={ROUTES.register.path} element={ROUTES.register.element} />
        <Route path={ROUTES.catchall.path} element={ROUTES.catchall.element} />
      </Routes>
    </BrowserRouter>
  );
}
