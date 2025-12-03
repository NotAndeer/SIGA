import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="app-footer">
    <div className="footer-container">
      <p>© {new Date().getFullYear()} SIGA - Sistema Integrado de Gestión</p>
    </div>
  </footer>
);

export default Footer;
