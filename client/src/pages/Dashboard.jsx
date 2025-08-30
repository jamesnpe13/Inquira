import { useState } from 'react';
import { useGlobalStore } from '../store/useGlobalStore';
import { useNavigate } from 'react-router-dom';
import { endSession } from '../services/sessionService';
import { ROUTES } from '../router';

const dashboardViews = {
  view1: <p>view 1</p>,
  view2: <p>view 2</p>,
  view3: <p>view 3</p>,
};

export default function Dashboard() {
  const navigate = useNavigate();
  const defaultView = dashboardViews.view1;
  const { setAccessToken, accessToken } = useGlobalStore();
  const [currentView, setCurrentView] = useState(defaultView);

  const handleClickLogout = async () => {
    await endSession();
    navigate(ROUTES.login.path, { replace: true });
  };

  return (
    <div>
      <p>Dashboard</p>
      <button onClick={handleClickLogout}>Log out</button>
    </div>
  );
}
