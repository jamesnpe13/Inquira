import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router';
import { useGlobalStore } from '../store/useGlobalStore';

export default function Homepage() {
  const { theme, setTheme } = useGlobalStore();
  const navigate = useNavigate();

  const handleLoginClick = () => navigate(ROUTES.login.path);
  const handleRegisterClick = () => navigate(ROUTES.register.path);
  const handleChangeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <p>{ROUTES.homepage.title}</p>
      <div>Homepage</div>
      <h1 className='text-color-primary'>H1 - Lorem ipsum dolor sit amet.</h1>
      <h2 className='text-color-secondary'>H2 - Lorem ipsum dolor sit amet.</h2>
      <h3 className='text-color-shade-1'>H3 - Lorem ipsum dolor sit amet.</h3>

      <p className='font-size_xs'>xs - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xs semi-bold'>xs - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xs bold'>xs - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xs extra-bold'>xs - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xs italic'>xs - Lorem ipsum dolor sit amet.</p>

      <p className='font-size_s'>s - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_s semi-bold'>s - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_s bold'>s - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_s extra-bold'>s - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_s italic'>s - Lorem ipsum dolor sit amet.</p>

      <p>m - Lorem ipsum dolor sit amet.</p>
      <p className='semi-bold'>m - Lorem ipsum dolor sit amet.</p>
      <p className='bold'>m - Lorem ipsum dolor sit amet.</p>
      <p className='extra-bold'>m - Lorem ipsum dolor sit amet.</p>
      <p className='italic'>m - Lorem ipsum dolor sit amet.</p>

      <p className='font-size_l'>l - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_l semi-bold'>l - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_l bold'>l - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_l extra-bold'>l - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_l italic'>l - Lorem ipsum dolor sit amet.</p>

      <p className='font-size_xl'>xl - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xl semi-bold'>xl - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xl bold'>xl - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xl extra-bold'>xl - Lorem ipsum dolor sit amet.</p>
      <p className='font-size_xl italic'>xl - Lorem ipsum dolor sit amet.</p>

      <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, iste?</h1>
      <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, iste?</h2>
      <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, iste?</h3>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, iste?</p>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>

      <h3>Current theme: </h3>
      <p>{theme}</p>
      <button onClick={handleChangeTheme}>Change Theme</button>
      <button className='content'>Content</button>
      <div className='test'></div>

      <div className='container'>
        <div className='panel'>
          <h1 className='text-color-primary'>Check out the new feature</h1>
          <h2>This is a Panel</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum optio tempore sed ut, similique porro,
            inventore explicabo adipisci, voluptas suscipit modi sunt dolorem rem sint sapiente voluptatem quis quisquam
            illum!
          </p>
        </div>
        <div className='panel'>
          <h1 className='text-color-primary'>Check out the new feature</h1>
          <h2>This is a Panel</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum optio tempore sed ut, similique porro,
            inventore explicabo adipisci, voluptas suscipit modi sunt dolorem rem sint sapiente voluptatem quis quisquam
            illum!
          </p>
        </div>
      </div>
    </>
  );
}
