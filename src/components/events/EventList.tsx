import React from 'react';
import { EventItem } from '../../types/models';
import EventCard from './EventCard';
import './EventList.css';

type EventListProps = {
  events: EventItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => {
  if (!events.length) {
    return <div className="event-empty">No hay eventos registrados.</div>;
  }

  return (
    <div className="event-list">
      <div className="event-table-wrapper">
        <table className="event-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha</th>
              <th>Lugar</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              const eventDate = event.date ? new Date(event.date) : null;
              const formattedDate = eventDate && !Number.isNaN(eventDate) ? eventDate.toLocaleDateString('es-CO') : 'Sin fecha';
              const eventId = event.id || event._id;
              return (
                <tr key={eventId}>
                  <td>{event.title}</td>
                  <td>{formattedDate}</td>
                  <td>{event.location || 'Pendiente'}</td>
                  <td>
                    <span className={`badge ${event.status || 'scheduled'}`}>
                      {event.status || 'programado'}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="table-btn" onClick={() => eventId && onEdit(eventId)}>Editar</button>
                    <button className="table-btn danger" onClick={() => eventId && onDelete(eventId)}>Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="event-cards">
        {events.map((event) => (
          <EventCard key={event.id || event._id} event={event} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
