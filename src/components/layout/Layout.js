import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './Header.css';
import './Sidebar.css';
import './Footer.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="layout-main">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
