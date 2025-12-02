import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importar páginas
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import MemberList from '../pages/MemberList';
import MemberForm from '../pages/MemberForm';
import EventList from '../pages/EventList';
import EventForm from '../pages/EventForm';
import FinancialReport from '../pages/FinancialReport';
import Profile from '../pages/Profile';

// Función simple para verificar login
const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

// Componente para rutas protegidas SIMPLE
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div style={{ 
          background: 'white', 
          color: '#333',
          padding: '40px', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h2>🚫 Acceso No Autorizado</h2>
          <p>No tienes permisos para ver esta página</p>
          <button 
            onClick={() => window.history.back()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta raíz - redirige a login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Login público */}
      <Route path="/login" element={<Login />} />
      
      {/* Rutas protegidas */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/members" element={
        <ProtectedRoute>
          <MemberList />
        </ProtectedRoute>
      } />
      
      <Route path="/members/new" element={
        <ProtectedRoute requiredRole="admin">
          <MemberForm />
        </ProtectedRoute>
      } />
      
      <Route path="/events" element={
        <ProtectedRoute>
          <EventList />
        </ProtectedRoute>
      } />
      
      <Route path="/financial" element={
        <ProtectedRoute requiredRole="treasurer">
          <FinancialReport />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      
      {/* 404 - Página no encontrada */}
      <Route path="*" element={
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>404</h1>
            <p style={{ fontSize: '20px' }}>Página no encontrada</p>
            <a 
              href="/dashboard"
              style={{
                display: 'inline-block',
                marginTop: '20px',
                padding: '10px 30px',
                background: 'white',
                color: '#667eea',
                textDecoration: 'none',
                borderRadius: '5px',
                fontWeight: 'bold'
              }}
            >
              Ir al Dashboard
            </a>
          </div>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;