import React from 'react';
import './EventCalendar.css';

const formatDate = (value) => {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return 'Sin fecha';
  return date.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const EventCalendar = ({ events = [] }) => {
  if (!events.length) {
    return <div className="empty-calendar">No hay eventos programados</div>;
  }

  return (
    <div className="event-calendar">
      {events.map((event) => (
        <div key={event.id || event._id || event.title} className="event-calendar-item">
          <div className="event-date">
            <span className="event-day">{formatDate(event.date)}</span>
            <span className={`event-status ${event.status || 'scheduled'}`}>
              {event.status ? event.status : 'programado'}
            </span>
          </div>
          <div className="event-details">
            <h4>{event.title}</h4>
            {event.location && <p className="event-location">{event.location}</p>}
            {event.description && (
              <p className="event-description">{event.description.slice(0, 140)}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCalendar;
