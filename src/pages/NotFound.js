import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">404</div>
        <h1>Página No Encontrada</h1>
        <p>Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary">
            Volver al Inicio
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary">
            Volver Atrás
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;