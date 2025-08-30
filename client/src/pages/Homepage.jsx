import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/routerConfig';
import { useGlobalStore } from '../store/useGlobalStore';
import RecommendIcon from '@mui/icons-material/Recommend';
import DeleteIcon from '@mui/icons-material/Delete';
import DoorbellIcon from '@mui/icons-material/Doorbell';

export default function Homepage() {
  const { theme, setTheme } = useGlobalStore();
  const navigate = useNavigate();

  const handleLoginClick = () => navigate(ROUTES.login.path);
  const handleRegisterClick = () => navigate(ROUTES.register.path);
  const handleChangeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return <></>;
}
