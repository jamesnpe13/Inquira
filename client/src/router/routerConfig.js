import Homepage from '../pages/Homepage';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Catchall from '../pages/Catchall';

const route = (path, element, title) => {
  return { path, element, title };
};

export const ROUTES = {
  dashboard: route('/dashboard', <Dashboard />, 'Dashboard'),
  register: route('/register', <Register />, 'Register'),
  catchall: route('/*', <Catchall />, 'Page Not Found'),
  login: route('/login', <Login />, 'Login'),
  homepage: route('/', <Homepage />, 'Home'),
};
