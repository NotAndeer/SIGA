import React, { ReactNode } from 'react';
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

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string | null;
}

// Rutas protegidas
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = null,
}) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Verificando acceso..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

// Página de no autorizado
const Unauthorized: React.FC = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>Acceso No Autorizado</h2>
    <p>No tiene permisos suficientes para acceder a esta página.</p>
    <button onClick={() => window.history.back()}>Volver</button>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas */}
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
