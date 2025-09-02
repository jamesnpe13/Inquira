import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/routerConfig';
import axios from 'axios';
import PageLoading from '../components/PageLoading';
import { useGlobalStore } from '../store/useGlobalStore';

export default function Register() {
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useGlobalStore();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const password1Ref = useRef();
  const password2Ref = useRef();

  // check if session exists then redirect to dashboard
  useEffect(() => {
    if (accessToken) navigate(ROUTES.dashboard.path);
    setIsLoading(false);
  }, []);

  // Cancel click handler
  const handleClickCancel = (e) => {
    e.preventDefault();
    navigate(ROUTES.login.path);
  };

  // Submit click handler
  const handleClickSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());

      // validate
      if (!data.newEmail) {
        console.log('Email cannot be empty');
        hasError = true;
      }
      if (!data.newFirstName) {
        console.log('First name cannot be empty');
        hasError = true;
      }
      if (!data.newLastName) {
        console.log('Last name cannot be empty');
        hasError = true;
      }
      if (!data.newPassword) {
        console.log('Password cannot be empty');
        hasError = true;
      }
      if (!data.newConfirmPassword) {
        console.log('Password confirmation cannot be empty');
        hasError = true;
      }
      if (data.newPassword !== data.newConfirmPassword) {
        console.log('Passwords do not match');
        hasError = true;
      }

      if (hasError) return;
      register(data);
    }
  };

  // Register user
  const register = async (data) => {
    const payload = {
      email: data.newEmail,
      first_name: data.newFirstName,
      last_name: data.newLastName,
      password: data.newPassword,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', payload);
      console.log('User created successfully');
      navigate(ROUTES.login.path);
    } catch (error) {
      console.log(error);
    } finally {
      password1Ref.current.value = '';
      password2Ref.current.value = '';
    }
  };

  if (isLoading) return <PageLoading />;

  return (
    <>
      <div className='page-container container grow padding-small center-single overflow-y-auto'>
        <div className='content-container container restrict-s'>
          {/* login panel */}
          <div className='panel transparent'>
            <div className='container align-items-center gap-0'>
              <h1 className='logo-text'>Inquira.</h1>
              <p>Forms Made Easy</p>
            </div>
            <hr />
            <p className='padding-medium'>
              Welcome to Inquira! Before we can start building and sharing forms let's set you up with an account.
            </p>
            <hr />
            <h3>Create an account</h3>
            <form
              className='container registration-form'
              onSubmit={handleClickSubmit}
              autoComplete='off'
              ref={formRef}
              action=''
            >
              <div className='container'>
                <input type='text' autoComplete='newEmail' placeholder='Email' name='newEmail' />
                <input type='text' autoComplete='newFirstName' placeholder='First name' name='newFirstName' />
                <input type='text' autoComplete='newLastName' placeholder='Last name' name='newLastName' />
              </div>

              <div className='container margin-top-medium'>
                <input
                  type='password'
                  autoComplete='newPassword'
                  placeholder='Password'
                  name='newPassword'
                  ref={password1Ref}
                />
                <input
                  type='password'
                  autoComplete='newConfirmPassword'
                  placeholder='Confirm password'
                  name='newConfirmPassword'
                  ref={password2Ref}
                />
              </div>

              <div className='container row margin-top-medium wrap'>
                <button type='button' onClick={handleClickCancel} className='btn-secondary grow'>
                  Cancel
                </button>
                <button type='submit' className='grow'>
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
