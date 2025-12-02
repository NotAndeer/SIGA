import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <span className="brand-dot" />
        <div>
          <p className="brand-title">SIGA</p>
          <p className="brand-subtitle">Panel administrativo</p>
        </div>
        <button className="sidebar-close" onClick={onClose} aria-label="Cerrar menú">
          ✕
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink end to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="nav-icon">🏠</span>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/members" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="nav-icon">👥</span>
          <span>Miembros</span>
        </NavLink>
        <NavLink to="/events" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="nav-icon">📅</span>
          <span>Eventos</span>
        </NavLink>
        <NavLink to="/financial" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="nav-icon">💰</span>
          <span>Finanzas</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
