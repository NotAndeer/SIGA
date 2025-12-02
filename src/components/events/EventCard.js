import React from 'react';
import './EventCard.css';

const EventCard = ({ event, onEdit, onDelete }) => {
  const eventDate = event.date ? new Date(event.date) : null;
  const formattedDate = eventDate && !Number.isNaN(eventDate) ? eventDate.toLocaleDateString('es-CO') : 'Sin fecha';

  return (
    <div className="event-card">
      <div>
        <p className="event-title">{event.title}</p>
        <p className="event-date-text">{formattedDate}</p>
        {event.location && <p className="event-location">{event.location}</p>}
        {event.description && <p className="event-description">{event.description}</p>}
      </div>
      <div className="event-actions">
        <span className={`badge ${event.status || 'scheduled'}`}>{event.status || 'programado'}</span>
        <div className="event-buttons">
          <button className="btn-light" onClick={() => onEdit(event.id || event._id)}>Editar</button>
          <button className="btn-danger" onClick={() => onDelete(event.id || event._id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
