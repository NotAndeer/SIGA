import api from './api';

export const authService = {
  // Login de usuario
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);

    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Verificar token
  verifyToken: async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      // Token inválido - limpiar storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      throw error;
    }
  },

  // Registro de nuevo usuario
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Cambiar contraseña
  changePassword: async (passwordData) => {
    const response = await api.post('/auth/change-password', passwordData);
    return response.data;
  }
};
