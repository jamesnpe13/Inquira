import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Catchall from '../pages/Catchall';
import Dashboard from '../pages/Dashboard';
import RestoreSession from '../utils/RestoreSession';
import RedirectIfAuth from '../utils/RedirectIfAuth';
import Register from '../pages/Register';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redirect if authenticated */}
      <Route element={<RedirectIfAuth />}>
        <Route path='/' element={<Navigate to={'/login'} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>

      {/* Restore session */}
      <Route element={<RestoreSession />}>
        <Route path='/Dashboard' element={<Dashboard />} />
      </Route>

      {/* Catch all */}
      <Route path='*' element={<Catchall />} />
    </Routes>
  );
}
