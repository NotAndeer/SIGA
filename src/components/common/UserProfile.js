import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './UserProfile.css';

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();

  const initials =
    user?.displayName?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    'U';

  return (
    <div className="user-profile">
      <div className="avatar" aria-hidden>
        {initials}
      </div>

      <div className="user-meta">
        <span className="user-name">
          {user?.displayName || 'Usuario'}
        </span>
        <span className="user-email">
          {user?.email || ''}
        </span>
      </div>

      <button
        type="button"
        className="logout"
        onClick={logout}
      >
        Salir
      </button>
    </div>
  );
};

export default UserProfile;
