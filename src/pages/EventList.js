import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/common/LoadingScreen';
import EventList from '../components/events/EventList';
import { useEvent } from '../context/EventContext';
import './EventList.css';

const EventListPage = () => {
  const navigate = useNavigate();
  const { events, loadEvents, deleteEvent, loading, error } = useEvent();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title?.toLowerCase().includes(search.toLowerCase()) ||
        event.location?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || (event.status || 'scheduled') === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [events, search, statusFilter]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Eliminar este evento?');
    if (!confirmed) return;
    await deleteEvent(id);
  };

  if (loading) {
    return <LoadingScreen message="Cargando eventos..." />;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Eventos</h1>
          <p>Organiza el calendario y los eventos clave de la asociación</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => loadEvents()}>Actualizar</button>
          <button className="btn-primary" onClick={() => navigate('/events/new')}>Nuevo evento</button>
        </div>
      </div>

      <div className="filters">
        <input
          type="search"
          placeholder="Buscar por título o lugar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Todos</option>
          <option value="scheduled">Programados</option>
          <option value="completed">Completados</option>
          <option value="cancelled">Cancelados</option>
        </select>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <EventList
        events={filteredEvents}
        onEdit={(id) => navigate(`/events/edit/${id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EventListPage;
