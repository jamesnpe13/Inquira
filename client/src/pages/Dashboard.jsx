import React, { useEffect, useState } from 'react';
import { useGlobalStore } from '../store/useGlobalStore';

const dashboardViews = {
  view1: <p>view 1</p>,
  view2: <p>view 2</p>,
  view3: <p>view 3</p>,
};

export default function Dashboard() {
  const { user, setUser } = useGlobalStore();
  const defaultView = dashboardViews.view1;
  const [currentView, setCurrentView] = useState(defaultView);

  const handleSetCurrentView = (view) => setCurrentView(view);

  return (
    <div>
      <p>Dashboard</p>
      <p>Current view:</p>
      {currentView}
      <ul>
        <li onClick={() => handleSetCurrentView(dashboardViews.view1)}>VIEW 1</li>
        <li onClick={() => handleSetCurrentView(dashboardViews.view2)}>VIEW 2</li>
        <li onClick={() => handleSetCurrentView(dashboardViews.view3)}>VIEW 3</li>
      </ul>
      <hr />
      <h4>Zustand store</h4>
      <p>{user.username}</p>
      <p>{user.firstname}</p>
      <button onClick={() => setUser({ username: 'prairie.e', firstname: 'Prairie' })}>Update user</button>
    </div>
  );
}
