import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="user-profile">
      <div className="user-avatar">
        {user?.name?.charAt(0).toUpperCase() || 'U'}
      </div>
      <div className="user-info">
        <span className="user-name">{user?.name || 'Usuario'}</span>
        <span className="user-role">{user?.role || 'Miembro'}</span>
      </div>
      <button onClick={logout} className="logout-btn">
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserProfile;