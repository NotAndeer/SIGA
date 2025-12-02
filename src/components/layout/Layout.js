import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext';
import './Header.css';
import './Sidebar.css';
import './Footer.css';

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="layout">
      <Header onToggleSidebar={handleToggleSidebar} />
      <div className={`layout-body ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {isAuthenticated && (
          <>
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
            <div
              className={`sidebar-backdrop ${sidebarOpen ? 'visible' : ''}`}
              onClick={closeSidebar}
            />
          </>
        )}
        <main className="layout-main" onClick={closeSidebar}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
