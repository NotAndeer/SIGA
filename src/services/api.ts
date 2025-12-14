import axios, { InternalAxiosRequestConfig } from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

// Configuración base de Axios
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token de autenticación
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();

      // Axios v1: config.headers puede ser AxiosHeaders, soporta .set()
      if (config.headers && typeof (config.headers as any).set === 'function') {
        (config.headers as any).set('Authorization', `Bearer ${token}`);
      } else {
        // Fallback: merge sin asignar {}
        (config.headers as any) = {
          ...(config.headers as any),
          Authorization: `Bearer ${token}`,
        };
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas globalmente
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      // Token expirado o inválido - cerrar sesión y redirigir
      await signOut(auth);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
