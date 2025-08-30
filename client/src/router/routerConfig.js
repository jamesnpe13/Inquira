import Homepage from '../pages/Homepage';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Catchall from '../pages/Catchall';
import RestoreSession from '../utils/RestoreSession';
import RequireAuth from '../utils/RequireAuth';

const route = (path, element, title, isRestore = true, requireAuth = false) => {
  const routeElement1 = requireAuth ? <RequireAuth>{element}</RequireAuth> : element;
  const routeElement2 = isRestore ? <RestoreSession>{routeElement1}</RestoreSession> : routeElement1;

  return { path, element: routeElement2, title, isRestore, requireAuth };
};

export const ROUTES = {
  dashboard: route('/dashboard', <Dashboard />, 'Dashboard', true, true),
  register: route('/register', <Register />, 'Register', false, false),
  catchall: route('/*', <Catchall />, 'Page Not Found', false, false),
  homepage: route('/', <Homepage />, 'Home', true, false),
  login: route('/login', <Login />, 'Login', true, false),
};
