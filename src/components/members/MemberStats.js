import React from 'react';
import './MemberStats.css';

const MemberStats = ({ stats }) => {
  const cards = [
    {
      label: 'Miembros totales',
      value: stats.totalMembers || 0,
      accent: 'primary',
      description: 'Usuarios registrados en la asociación'
    },
    {
      label: 'Activos',
      value: stats.activeMembers || 0,
      accent: 'success',
      description: 'Con participación vigente'
    },
    {
      label: 'Pagos pendientes',
      value: stats.pendingPayments || 0,
      accent: 'warning',
      description: 'Requieren seguimiento financiero'
    },
    {
      label: 'Próximos eventos',
      value: stats.upcomingEvents || 0,
      accent: 'info',
      description: 'Programados en el calendario'
    }
  ];

  return (
    <div className="member-stats-grid">
      {cards.map((card) => (
        <div key={card.label} className={`stat-card ${card.accent}`}>
          <div className="stat-meta">
            <p className="stat-label">{card.label}</p>
            <p className="stat-description">{card.description}</p>
          </div>
          <div className="stat-value">{card.value}</div>
        </div>
      ))}
    </div>
  );
};

export default MemberStats;
