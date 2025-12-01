// Agregar estas rutas a tu AppRoutes.js existente
import EventForm from './pages/EventForm';
import Events from './pages/Events';

// Dentro del componente AppRoutes, agregar:
<Route 
  path="/events" 
  element={
    <ProtectedRoute>
      <Events />
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