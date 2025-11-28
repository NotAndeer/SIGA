import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserProfile from '../common/UserProfile';
import './Header.css';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <h1>SIGA</h1>
            <span>Sistema Integrado de Gestión para Asociaciones</span>
          </Link>
        </div>

        {isAuthenticated && (
          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${isActiveRoute('/') ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/members"
                  className={`nav-link ${isActiveRoute('/members') ? 'active' : ''}`}
                >
                  Miembros
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/events"
                  className={`nav-link ${isActiveRoute('/events') ? 'active' : ''}`}
                >
                  Eventos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/financial"
                  className={`nav-link ${isActiveRoute('/financial') ? 'active' : ''}`}
                >
                  Finanzas
                </Link>
              </li>
            </ul>
          </nav>
        )}

        <div className="user-section">
          {isAuthenticated ? (
            <UserProfile />
          ) : (
            <div className="auth-links">
              <Link
                to="/login"
                className={`login-btn ${isActiveRoute('/login') ? 'active' : ''}`}
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className={`register-btn ${isActiveRoute('/register') ? 'active' : ''}`}
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
