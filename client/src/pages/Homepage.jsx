import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router';
import { useGlobalStore } from '../store/useGlobalStore';

export default function Homepage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  const handleLoginClick = () => navigate(ROUTES.login.path);
  const handleRegisterClick = () => navigate(ROUTES.register.path);
  const handleChangeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <>
      <p>{ROUTES.homepage.title}</p>
      <div>Homepage</div>
      <h1>H1 - Lorem ipsum dolor sit amet.</h1>
      <h2>H2 - Lorem ipsum dolor sit amet.</h2>
      <h3>H3 - Lorem ipsum dolor sit amet.</h3>

      <p className='font-size_xs'>xs - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xs semi-bold'>xs - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xs bold'>xs - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xs extra-bold'>xs - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xs italic'>xs - Lorem ipsum dolor sit amet.</p>
      <hr />
      <p className='font-size_s'>s - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_s semi-bold'>s - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_s bold'>s - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_s extra-bold'>s - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_s italic'>s - Lorem ipsum dolor sit amet.</p>
      <hr />
      <p>m - Lorem ipsum dolor sit amet.</p>
      <p className='semi-bold'>m - Lorem ipsum dolor sit amet.</p>
      <p className='bold'>m - Lorem ipsum dolor sit amet.</p>
      <p className='extra-bold'>m - Lorem ipsum dolor sit amet.</p>
      <p className='italic'>m - Lorem ipsum dolor sit amet.</p>
      <hr />
      <p className='font-size_l'>l - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_l semi-bold'>l - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_l bold'>l - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_l extra-bold'>l - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_l italic'>l - Lorem ipsum dolor sit amet.</p>
      <hr />
      <p className='font-size_xl'>xl - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xl semi-bold'>xl - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xl bold'>xl - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xl extra-bold'>xl - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xl italic'>xl - Lorem ipsum dolor sit amet.</p>
      <hr />
      <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, iste?</h1>
      <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, iste?</h2>
      <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, iste?</h3>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, iste?</p>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>
      <hr />
      <h3>Current theme: </h3>
      <p>{theme}</p>
      <button onClick={handleChangeTheme}>Change Theme</button>
    </>
  );
}
