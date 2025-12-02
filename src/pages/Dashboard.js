import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Miembros', value: '156', color: '#667eea', icon: '👥', link: '/members' },
    { title: 'Eventos Activos', value: '8', color: '#4cd964', icon: '📅', link: '/events' },
    { title: 'Ingresos Mensuales', value: '$4,850', color: '#ff9500', icon: '💰', link: '/financial' },
    { title: 'Asistencia', value: '92%', color: '#ff3b30', icon: '✅', link: '/events' }
  ];

  const quickActions = [
    { title: 'Agregar Miembro', icon: '➕', link: '/members/new', role: 'admin' },
    { title: 'Crear Evento', icon: '🎯', link: '/events/new', role: 'admin' },
    { title: 'Ver Reportes', icon: '📊', link: '/financial', role: 'treasurer' },
    { title: 'Mi Perfil', icon: '👤', link: '/profile', role: null }
  ];

  return (
    <Layout>
      <div className="page-header">
        <h1>¡Bienvenido de nuevo, {user?.name}!</h1>
        <p>Resumen general y acceso rápido</p>
      </div>

      {/* Estadísticas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        {stats.map((stat, index) => (
          <Link 
            key={index} 
            to={stat.link} 
            style={{ 
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
            }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '15px'
              }}>
                <div>
                  <h3 style={{ 
                    fontSize: '14px', 
                    color: '#666', 
                    marginBottom: '5px',
                    fontWeight: '500'
                  }}>
                    {stat.title}
                  </h3>
                  <p style={{ 
                    fontSize: '28px', 
                    fontWeight: 'bold', 
                    color: stat.color,
                    margin: 0
                  }}>
                    {stat.value}
                  </p>
                </div>
                <span style={{ fontSize: '32px' }}>{stat.icon}</span>
              </div>
              <p style={{ 
                fontSize: '12px', 
                color: '#999', 
                marginTop: '10px'
              }}>
                Ver detalles →
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '20px', 
          marginBottom: '20px', 
          color: '#333'
        }}>
          Acciones Rápidas
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px' 
        }}>
          {quickActions.map((action, index) => {
            // Mostrar solo si el usuario tiene el rol requerido o si no requiere rol
            if (!action.role || user?.role === action.role || user?.role === 'admin') {
              return (
                <Link 
                  key={index} 
                  to={action.link}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{
                    background: 'white',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    border: '2px solid #f0f0f0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = '#667eea';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#f0f0f0';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                  }}
                  >
                    <div style={{ 
                      fontSize: '32px', 
                      marginBottom: '10px' 
                    }}>
                      {action.icon}
                    </div>
                    <p style={{ 
                      color: '#333', 
                      fontWeight: '500',
                      margin: 0
                    }}>
                      {action.title}
                    </p>
                  </div>
                </Link>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Actividad reciente */}
      <div style={{ 
        background: 'white', 
        borderRadius: '12px', 
        padding: '25px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          marginBottom: '20px', 
          color: '#333'
        }}>
          Actividad Reciente
        </h2>
        
        <div style={{ color: '#666' }}>
          <p>✅ <strong>Juan Pérez</strong> se registró como nuevo miembro (Hace 2 horas)</p>
          <p>🎉 <strong>Evento de Bienvenida</strong> fue creado (Hace 1 día)</p>
          <p>💰 <strong>Pago mensual</strong> procesado por María Gómez (Hace 2 días)</p>
          <p>📊 <strong>Reporte financiero</strong> generado (Hace 3 días)</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;