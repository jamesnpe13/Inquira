import { useGlobalStore } from '../store/useGlobalStore';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.scss';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [menuIsActive, setMenuIsActive] = useState(false);
  const { user } = useGlobalStore();
  const displayName = `${user.firstName} ${user.lastName}`;

  // toggle menu
  const handleClickMenu = () => setMenuIsActive(!menuIsActive);

  return (
    <>
      <div className='navbar gap padding-inline'>
        <div className='logo-container container row width-min center-content push-left'>
          <h5>inquira.</h5>
        </div>

        <div className='nav-container container row width-min center-content push-right'>
          <p className='font-size-small'>{displayName}</p>
          <button className='btn-icon btn-transparent' onClick={handleClickMenu}>
            <MenuIcon />
          </button>
          <button className='btn-icon btn-transparent'>
            <LogoutIcon />
          </button>
        </div>
      </div>

      <MenuPanel />
    </>
  );
}
function MenuPanel() {
  return <div className='container menu-panel'>Menu panel</div>;
}
