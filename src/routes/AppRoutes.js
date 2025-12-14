import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Páginas
import Dashboard from '../pages/Dashboard';
import MemberList from '../pages/MemberList';
import MemberForm from '../pages/MemberForm';
import EventList from '../pages/EventList';
import EventForm from '../pages/EventForm';
import FinancialReport from '../pages/FinancialReport';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import LoadingScreen from '../components/common/LoadingScreen';

// Página no autorizada
const Unauthorized = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>Acceso No Autorizado</h2>
    <p>No tiene permisos suficientes para acceder a esta página.</p>
    <button onClick={() => window.history.back()}>Volver</button>
  </div>
);

// Ruta protegida
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingScreen message="Verificando acceso..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Si pides rol, deja pasar si es el rol o si es admin
  if (requiredRole && user?.role !== requiredRole && user?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protegidas */}
      <Route
        path="/"
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

      {/* ✅ CAMBIO CLAVE: Finanzas SIN requiredRole para que no bloquee */}
      <Route
        path="/financial"
        element={
          <ProtectedRoute>
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

      {/* Especiales */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
