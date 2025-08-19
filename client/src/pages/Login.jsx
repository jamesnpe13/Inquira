import { useGlobalStore } from '../store/useGlobalStore';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { ROUTES } from '../router';
import axios from 'axios';
import api from '../axios';

export default function Login() {
  const { setAccessToken, accessToken } = useGlobalStore();
  const navigate = useNavigate();
  const passwordRef = useRef();
  const formRef = useRef();

  // Register click handler
  const handleClickRegister = (e) => {
    e.preventDefault();
    navigate(ROUTES.register.path);
  };

  // Login click handler
  const handleClickSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    let hasError = false;

    // validation
    if (!data.inputEmail) {
      console.log('Email cannot be empty');
      hasError = true;
    }
    if (!data.inputPassword) {
      console.log('Password cannot be empty');
      hasError = true;
    }

    if (hasError) return;

    login(data);
  };

  // submit form
  const login = async (data) => {
    try {
      const payload = {
        email: data.inputEmail,
        password: data.inputPassword,
      };

      const res = await api.post('/auth/login', payload); // post to api
      console.log('User logged in successfully');

      // store access token
      setAccessToken(res.data.accessToken);
    } catch (error) {
      console.log(error);
    } finally {
      passwordRef.current.value = ''; // clear password field
    }
  };

  useEffect(() => {
    console.log(accessToken);
  }, [accessToken]);

  return (
    <>
      <div className='page-container container grow'>
        <div className='content-container center padding-small container restrict-s'>
          {/* login panel */}
          <div className='panel'>
            <div className='container align-items-center gap-0'>
              <h1 className='logo-text font-color-white'>Inquira.</h1>
              <h2>Forms Made Easy</h2>
            </div>
            <hr />

            <p className='padding-medium'>Hey there! Let's get you signed in..</p>

            <hr />
            <h3>User login</h3>
            <form className='container' action='' ref={formRef} onSubmit={handleClickSubmit}>
              <input type='text' placeholder='Email' name='inputEmail' autoComplete='inputEmail' />
              <input
                type='password'
                placeholder='Password'
                name='inputPassword'
                ref={passwordRef}
                autoComplete='inputPassword'
              />

              <button type='button' onClick={handleClickRegister} className='btn-text  font-size-s'>
                Create account
              </button>

              <div className='container row margin-top-medium'>
                <button type='submit' className='btn-success grow'>
                  Let's go!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
