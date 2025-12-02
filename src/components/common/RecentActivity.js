import React from 'react';
import './RecentActivity.css';

const formatDateTime = (value) => {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return 'Fecha desconocida';
  return date.toLocaleString('es-CO', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const RecentActivity = ({ items = [] }) => {
  if (!items.length) {
    return <div className="activity-empty">Aún no hay actividad reciente</div>;
  }

  return (
    <div className="recent-activity">
      {items.map((item, index) => (
        <div key={item.id || index} className="activity-item">
          <div className={`activity-dot ${item.type || 'info'}`} />
          <div className="activity-content">
            <div className="activity-header">
              <p className="activity-title">{item.title}</p>
              <span className="activity-date">{formatDateTime(item.date)}</span>
            </div>
            {item.description && <p className="activity-description">{item.description}</p>}
            {item.meta && <p className="activity-meta">{item.meta}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
