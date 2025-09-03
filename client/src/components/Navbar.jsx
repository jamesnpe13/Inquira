import { useGlobalStore } from '../store/useGlobalStore';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.scss';
import { useEffect, useState } from 'react';
import { endSession } from '../services/sessionService';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/routerConfig';

export default function Navbar() {
  const navigate = useNavigate();
  const [menuIsActive, setMenuIsActive] = useState(false);
  const { user } = useGlobalStore();
  let displayName = '';

  if (user) displayName = `${user?.firstName} ${user?.lastName}`;

  // toggle menu
  const handleClickMenu = () => setMenuIsActive(!menuIsActive);

  // logout
  const handleClickLogout = async () => {
    await endSession();
    navigate(ROUTES.login.path);
  };

  return (
    <div className='navbar container gap-0'>
      <PrimaryBar displayName={displayName} handleClickMenu={handleClickMenu} handleClickLogout={handleClickLogout} />

      <SecondaryBar />
    </div>
  );
}

// Primary bar
function PrimaryBar({ displayName, handleClickMenu, handleClickLogout }) {
  return (
    <div className='primary-bar gap padding-small padding-inline-medium'>
      <div className='logo-container container row width-min center-content push-left'>
        <h5 className='font-color-primary'>inquira.</h5>
      </div>

      <div className='nav-container container row width-min center-content push-right'>
        <p className='font-size-small'>{displayName}</p>

        <button className='btn-icon btn-transparent' onClick={handleClickMenu}>
          <MenuIcon />
        </button>

        <button className='btn-icon btn-transparent' onClick={handleClickLogout}>
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
}

// Secondary bar
function SecondaryBar() {
  return <div className='secondary-bar container row gap padding-small padding-inline-medium'></div>;
}

// Fly-out menu panel
function MenuPanel() {
  return <div className='container menu-panel'>Menu panel</div>;
}
