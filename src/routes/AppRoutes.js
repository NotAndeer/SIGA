import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componentes de páginas
import Dashboard from '../pages/Dashboard';
import MemberList from '../pages/MemberList';
import MemberForm from '../pages/MemberForm';
import EventList from '../pages/EventList';
import EventForm from '../pages/EventForm';
import FinancialReport from '../pages/FinancialReport';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';

// Componente para página no autorizada
const Unauthorized = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>Acceso No Autorizado</h2>
    <p>No tiene permisos suficientes para acceder a esta página.</p>
    <button onClick={() => window.history.back()}>Volver</button>
  </div>
);

// Componente para rutas protegidas
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Componente para rutas públicas (solo si NO está autenticado)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Ruta raíz - redirige según autenticación */}
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      {/* Rutas públicas (solo para no autenticados) */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />

      {/* Rutas protegidas */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/members" 
        element={
          <ProtectedRoute>
            <MemberList />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/members/new" 
        element={
          <ProtectedRoute requiredRole="admin">
            <MemberForm />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/members/edit/:id" 
        element={
          <ProtectedRoute requiredRole="admin">
            <MemberForm />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/events" 
        element={
          <ProtectedRoute>
            <EventList />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/events/new" 
        element={
          <ProtectedRoute requiredRole="admin">
            <EventForm />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/events/edit/:id" 
        element={
          <ProtectedRoute requiredRole="admin">
            <EventForm />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/financial" 
        element={
          <ProtectedRoute requiredRole="treasurer">
            <FinancialReport />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />

      {/* Rutas especiales */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;