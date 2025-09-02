import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

/* views */
import ResponsesView from '../views/dashboard/ResponsesView';
import AccountView from '../views/dashboard/AccountView';
import FormView from '../views/dashboard/FormView';
import MainView from '../views/dashboard/MainView';
import Navbar from '../components/Navbar';

const dashboardViews = {
  responsesView: <ResponsesView />,
  accountView: <AccountView />,
  formView: <FormView />,
  mainView: <MainView />,
};

export default function Dashboard() {
  const navigate = useNavigate();
  const defaultView = dashboardViews.mainView;
  const [currentView, setCurrentView] = useState(defaultView);

  return (
    <>
      <Navbar />
      <div className='dashboard-view-container container grow padding-inline-medium padding-block-large align-items-center'>
        {<div className='container restrict-m'>{currentView}</div>}
      </div>
    </>
  );
}
