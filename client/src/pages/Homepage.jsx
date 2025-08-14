import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router';

export default function Homepage() {
  const navigate = useNavigate();

  const handleLoginClick = () => navigate(ROUTES.login.path);
  const handleRegisterClick = () => navigate(ROUTES.register.path);

  return (
    <>
      <p>{ROUTES.homepage.title}</p>
      <div>Homepage</div>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>
    </>
  );
}
