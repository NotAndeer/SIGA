import axios, { AxiosRequestConfig } from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

// Base URL
const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: agrega token Firebase
api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const user = auth.currentUser;

    if (user && config.headers) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: manejo global de errores
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      await signOut(auth);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
