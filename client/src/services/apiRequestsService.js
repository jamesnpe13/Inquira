import axios from 'axios';
import { useGlobalStore } from '../store/useGlobalStore';
import { refreshToken } from './sessionService';

const devUrl = process.env.REACT_APP_API_BASE_URL_DEV;
const prodUrl = process.env.REACT_APP_API_BASE_URL;

const baseURL = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;
