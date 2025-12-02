import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { authService, authMapper } from '../services/authService';
import { auth } from '../services/firebase';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        error: null
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null
      };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userData = await authMapper.buildUser(firebaseUser);
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user: userData } });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        console.error('Error al obtener el usuario de Firebase', error);
        dispatch({ type: 'LOGIN_FAILURE', payload: 'No se pudo obtener la sesión' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (credentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const result = await authService.login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: result.user } });
      return result;
    } catch (error) {
      const firebaseMessage = error.code?.includes('auth/')
        ? 'Credenciales inválidas o usuario no encontrado'
        : 'Error de autenticación';
      dispatch({ type: 'LOGIN_FAILURE', payload: firebaseMessage });
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (data) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const result = await authService.register(data);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: result.user } });
      return result;
    } catch (error) {
      const firebaseMessage = error.code?.includes('auth/')
        ? 'No se pudo crear la cuenta con los datos proporcionados'
        : 'Error al crear la cuenta';
      dispatch({ type: 'LOGIN_FAILURE', payload: firebaseMessage });
      throw error;
    }
  };

  const value = {
    ...state,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
