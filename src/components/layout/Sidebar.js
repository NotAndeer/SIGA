import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="app-sidebar">
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/members">Miembros</Link></li>
          <li><Link to="/events">Eventos</Link></li>
          <li><Link to="/financial">Finanzas</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
