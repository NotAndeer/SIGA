import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ message = 'Cargando sesión...' }) => {
  return (
    <div className="loading-screen">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
};

export default LoadingScreen;
