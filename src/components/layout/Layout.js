import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext';

import './Header.css';
import './Sidebar.css';
import './Footer.css';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="layout">
      <Header />

      <div className="layout-body">
        {isAuthenticated && <Sidebar />}

        <main className="layout-main">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
