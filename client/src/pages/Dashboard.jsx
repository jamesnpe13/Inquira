import React, { useEffect, useState } from 'react';
import { useGlobalStore } from '../store/useGlobalStore';
import { useNavigate } from 'react-router-dom';
import RequireAuth from '../utils/RequireAuth';

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

  return (
    <RequireAuth>
      <div>
        <p>Dashboard</p>
      </div>
    </RequireAuth>
  );
}
