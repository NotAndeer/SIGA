import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { authService, authMapper } from '../services/authService';
import { auth } from '../services/firebase';

type AuthError = string | null;

type AuthState = {
  isAuthenticated: boolean;
  user: any | null; // Si tienes un tipo User, cámbialo aquí
  loading: boolean;
  error: AuthError;
};

type LoginCredentials = any; // Tipar según tu app
type RegisterData = any; // Tipar según tu app

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: any } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

type AuthContextValue = AuthState & {
  login: (credentials: LoginCredentials) => Promise<any>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<any>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: 'No se pudo obtener la sesión',
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const result = await authService.login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: result.user } });
      return result;
    } catch (error: any) {
      const firebaseMessage =
        error?.code?.includes?.('auth/')
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

  const register = async (data: RegisterData) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const result = await authService.register(data);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: result.user } });
      return result;
    } catch (error: any) {
      const firebaseMessage =
        error?.code?.includes?.('auth/')
          ? 'No se pudo crear la cuenta con los datos proporcionados'
          : 'Error al crear la cuenta';
      dispatch({ type: 'LOGIN_FAILURE', payload: firebaseMessage });
      throw error;
    }
  };

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
