import { useGlobalStore } from '../store/useGlobalStore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ROUTES } from '../router/routerConfig';
import { apiAuth } from '../services/apiService';
import PageLoading from '../components/PageLoading';
import { startSession } from '../services/sessionService';

export default function Login() {
  const { setAccessToken, accessToken } = useGlobalStore();
  const navigate = useNavigate();
  const passwordRef = useRef();
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  // check if session exists then redirect to dashboard
  useEffect(() => {
    if (accessToken) navigate(ROUTES.dashboard.path);
    setIsLoading(false);
  }, []);

  // Register click handler
  const handleClickRegister = (e) => {
    e.preventDefault();
    navigate(ROUTES.register.path);
  };

  // Login click handler
  const handleClickSubmit = async (e) => {
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

    try {
      const isSuccess = await startSession({ email: data?.inputEmail, password: data?.inputPassword });
      if (isSuccess) {
        navigate(ROUTES.dashboard.path, { replace: true });
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (passwordRef.current) {
        passwordRef.current.value = '';
      }
    }
  };

  if (isLoading) return <PageLoading />;

  return (
    <div className='page-container container padding-small grow center-single overflow-y-scroll'>
      <div className='content-container container restrict-s'>
        {/* login panel */}
        <div className='panel'>
          <div className='container align-items-center gap-0'>
            <h1 className='logo-text font-color-white'>Inquira.</h1>
            <h2>Forms Made Easy</h2>
          </div>
          <hr />

          <p className='padding-medium'>Hey there! Let's get you signed in..</p>

          {accessToken && (
            <>
              <br />
              <p className=''>{accessToken}</p>
            </>
          )}

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
  );
}
