import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routerConfig';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.homepage.path} element={<Navigate to={ROUTES.login.path} replace />} />
      <Route path={ROUTES.login.path} element={ROUTES.login.element} />
      <Route path={ROUTES.register.path} element={ROUTES.register.element} />
      <Route path={ROUTES.dashboard.path} element={ROUTES.dashboard.element} />
      <Route path={ROUTES.catchall.path} element={ROUTES.catchall.element} />
    </Routes>
  );
}
