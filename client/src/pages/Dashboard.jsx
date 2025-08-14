import React, { useEffect, useState } from 'react';
import { useGlobalStore } from '../store/useGlobalStore';
import { useDashboardStore } from '../store/useDashboardStore';

const dashboardViews = {
  view1: <p>view 1</p>,
  view2: <p>view 2</p>,
  view3: <p>view 3</p>,
};

export default function Dashboard() {
  const defaultView = dashboardViews.view1;
  const [currentView, setCurrentView] = useState(defaultView);

  return (
    <div>
      <p>Dashboard</p>
    </div>
  );
}
