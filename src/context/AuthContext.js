import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Usuario de prueba
  const testUser = {
    email: 'test@demo.com',
    password: '123456',
    role: 'admin', // puedes usar 'admin', 'treasurer', etc.
    name: 'Usuario de Prueba'
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async ({ email, password }) => {
    // simulamos delay
    await new Promise(r => setTimeout(r, 500));

    if (email === testUser.email && password === testUser.password) {
      localStorage.setItem('user', JSON.stringify(testUser));
      setUser(testUser);
    } else {
      // simulamos error igual que si viniera del backend
      throw new Error('Credenciales inválidas');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
