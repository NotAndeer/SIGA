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
    activeMembers: members.filter(m => (m.status || 'active') === 'active').length,
    pendingPayments: members.filter(m => (m.paymentStatus || '').toLowerCase() === 'pending').length,
    upcomingEvents: events.filter(e => new Date(e.date) > new Date()).length
  };

  const activityItems = [...members
    .filter((m) => m.joinDate)
    .map((m) => ({
      id: `member-${m.id || m._id}`,
      title: `Nuevo miembro: ${m.name}`,
      description: m.profession,
      meta: m.email,
      date: m.joinDate,
      type: 'success'
    })),
    ...events.map((e) => ({
      id: `event-${e.id || e._id}`,
      title: `Evento: ${e.title}`,
      description: e.location,
      meta: e.status,
      date: e.date || e.createdAt || new Date().toISOString(),
      type: e.status === 'cancelled' ? 'danger' : 'info'
    }))]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

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
          <RecentActivity items={activityItems} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
