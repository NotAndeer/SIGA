import React, { useEffect } from 'react';
import { useMember } from '../context/MemberContext';
import { useEvent } from '../context/EventContext';
import './Dashboard.css';

const Dashboard = () => {
  const { members, loadMembers } = useMember();
  const { events, loadEvents } = useEvent();

  useEffect(() => {
    loadMembers();
    loadEvents();
  }, [loadMembers, loadEvents]);

  const stats = {
    totalMembers: members.length,
    activeMembers: members.filter(m => m.status === 'active').length,
    pendingPayments: members.filter(m => m.paymentStatus === 'pending').length,
    upcomingEvents: events.filter(e => new Date(e.date) > new Date()).length
  };

  const StatCard = ({ number, label, color }) => (
    <div className="stat-card">
      <span className="stat-number">{number}</span>
      <span className="stat-label">{label}</span>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard Principal</h1>
          <p>Resumen general y métricas clave de la asociación</p>
        </div>

        <div className="dashboard-stats">
          <div className="stats-grid">
            <StatCard number={stats.totalMembers} label="Total Miembros" />
            <StatCard number={stats.activeMembers} label="Miembros Activos" />
            <StatCard number={stats.pendingPayments} label="Pagos Pendientes" />
            <StatCard number={stats.upcomingEvents} label="Próximos Eventos" />
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-section">
            <h2>📊 Resumen de Actividad</h2>
            <div style={{ padding: '1rem 0', color: '#6c757d' }}>
              <p>Bienvenido al panel de control de SIGA. Aquí podrás monitorear el estado general de la asociación.</p>
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                <strong>Funcionalidades disponibles:</strong>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  <li>Gestión completa de miembros</li>
                  <li>Calendarización de eventos</li>
                  <li>Control financiero y pagos</li>
                  <li>Reportes automatizados</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>📅 Actividad Reciente</h2>
            <div style={{ padding: '1rem 0', color: '#6c757d' }}>
              <p>No hay actividad reciente para mostrar.</p>
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
                <strong>💡 Próximos pasos:</strong>
                <p style={{ margin: '0.5rem 0 0 0' }}>Comienza agregando miembros y creando eventos para ver la actividad aquí.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;