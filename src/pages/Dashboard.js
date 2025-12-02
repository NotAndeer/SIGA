import React, { useEffect } from 'react';
import { useMember } from '../context/MemberContext';
import { useEvent } from '../context/EventContext';
import MemberStats from '../components/members/MemberStats';
import EventCalendar from '../components/events/EventCalendar';
import RecentActivity from '../components/common/RecentActivity';
import './Dashboard.css';

const Dashboard = () => {
  const { members, loadMembers } = useMember();
  const { events, loadEvents } = useEvent();

  useEffect(() => {
    // Cargar datos iniciales del dashboard
    loadMembers();
    loadEvents();
  }, [loadMembers, loadEvents]);

  const stats = {
    totalMembers: members.length,
    activeMembers: members.filter(m => m.status === 'active').length,
    pendingPayments: members.filter(m => m.paymentStatus === 'pending').length,
    upcomingEvents: events.filter(e => new Date(e.date) > new Date()).length
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Principal</h1>
        <p>Resumen general de la asociación</p>
      </div>

      <div className="dashboard-stats">
        <MemberStats stats={stats} />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Próximos Eventos</h2>
          <EventCalendar events={events.slice(0, 5)} />
        </div>

        <div className="dashboard-section">
          <h2>Actividad Reciente</h2>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
