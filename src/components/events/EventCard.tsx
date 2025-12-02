import React from 'react';
import { EventItem } from '../../types/models';
import './EventCard.css';

type EventCardProps = {
  event: EventItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  const eventDate = event.date ? new Date(event.date) : null;
  const formattedDate = eventDate && !Number.isNaN(eventDate) ? eventDate.toLocaleDateString('es-CO') : 'Sin fecha';
  const eventId = event.id || event._id;

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
          <button className="btn-light" onClick={() => eventId && onEdit(eventId)}>Editar</button>
          <button className="btn-danger" onClick={() => eventId && onDelete(eventId)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
