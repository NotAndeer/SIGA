import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="dashboard-layout">
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/dashboard" className="navbar-logo">
            SIGA
          </Link>
          
          <div className="navbar-user">
            <div className="user-info">
              <div className="user-avatar">
                {getInitial(user?.name)}
              </div>
              <div className="user-details">
                <div className="user-name">{user?.name}</div>
                <div className="user-role" style={{ fontSize: '12px', color: '#666' }}>
                  {user?.role === 'admin' ? 'Administrador' : 
                   user?.role === 'treasurer' ? 'Tesorero' : 'Usuario'}
                </div>
              </div>
            </div>
            
            <button onClick={handleLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;