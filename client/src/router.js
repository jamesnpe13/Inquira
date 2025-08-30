import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Catchall from './pages/Catchall';
import RestoreSession from './utils/RestoreSession';

const route = (path, element, title, isRestore = true) => {
  const routeElement = isRestore ? <RestoreSession>{element}</RestoreSession> : element;

  return { path, element: routeElement, title, isRestore };
};

export const ROUTES = {
  register: route('/register', <Register />, 'Register', false),
  catchall: route('/*', <Catchall />, 'Page Not Found', false),

  // require restore
  homepage: route('/', <Homepage />, 'Home', true),
  login: route('/login', <Login />, 'Login', true),
  dashboard: route('/dashboard', <Dashboard />, 'dashboard', true),
};

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
