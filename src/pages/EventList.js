import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    // Datos de ejemplo para la demo
    setTimeout(() => {
      const sampleEvents = [
        {
          id: 1,
          title: 'Taller de React Avanzado',
          description: 'Aprende hooks, context API y buenas prácticas de React',
          date: '2024-12-15',
          time: '14:00',
          location: 'Auditorio Principal',
          type: 'training',
          capacity: 100,
          registered: 85,
          status: 'scheduled'
        },
        {
          id: 2,
          title: 'Asamblea General Anual',
          description: 'Reunión para presentación de resultados del año',
          date: '2024-11-30',
          time: '10:00',
          location: 'Sala de Juntas',
          type: 'meeting',
          capacity: 50,
          registered: 42,
          status: 'active'
        },
        {
          id: 3,
          title: 'Cena de Fin de Año',
          description: 'Evento social para cerrar el año con todos los miembros',
          date: '2024-12-20',
          time: '19:00',
          location: 'Hotel Grand Plaza',
          type: 'social',
          capacity: 150,
          registered: 120,
          status: 'scheduled'
        }
      ];
      setEvents(sampleEvents);
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'status-scheduled';
      case 'active': return 'status-active';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-scheduled';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled': return 'Programado';
      case 'active': return 'Activo';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return 'Programado';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no definida';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return event.status === 'scheduled' || event.status === 'active';
    if (filter === 'past') return event.status === 'completed';
    return event.status === filter;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando eventos...</p>
      </div>
    );
  }

  return (
    <div className="event-list-container">
      <div className="events-header">
        <div>
          <h1>Gestión de Eventos</h1>
          <p>Administra y visualiza todos los eventos de la asociación</p>
        </div>
        <div className="header-actions">
          <Link to="/events/new" className="btn-primary">
            + Nuevo Evento
          </Link>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            Próximos
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Activos
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completados
          </button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3>No hay eventos disponibles</h3>
          <p>No se encontraron eventos con los filtros aplicados.</p>
          <Link to="/events/new" className="btn-primary">
            Crear Primer Evento
          </Link>
        </div>
      ) : (
        <div className="events-grid">
          {filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-card-header">
                <div>
                  <h3>{event.title}</h3>
                  <span className={`event-status ${getStatusColor(event.status)}`}>
                    {getStatusText(event.status)}
                  </span>
                </div>
                <span className="event-type">
                  {event.type === 'training' ? '🎓 Capacitación' : 
                   event.type === 'meeting' ? '🤝 Reunión' : 
                   event.type === 'social' ? '🎉 Social' : '📝 Taller'}
                </span>
              </div>

              <div className="event-card-body">
                <p className="event-description">{event.description}</p>
                
                <div className="event-details">
                  <div className="detail-item">
                    <span className="detail-label">📅 Fecha:</span>
                    <span className="detail-value">{formatDate(event.date)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">🕒 Hora:</span>
                    <span className="detail-value">{event.time}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">📍 Lugar:</span>
                    <span className="detail-value">{event.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">👥 Asistentes:</span>
                    <span className="detail-value">
                      {event.registered} / {event.capacity}
                    </span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="event-card-footer">
                <Link to={`/events/edit/${event.id}`} className="btn-edit">
                  Editar
                </Link>
                <button className="btn-view">
                  Ver Detalles
                </button>
                <button className="btn-register">
                  Inscribirse
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;