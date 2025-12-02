import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvent } from '../../context/EventContext';
import './EventForm.css';

const emptyEvent = {
  title: '',
  date: new Date().toISOString().split('T')[0],
  location: '',
  description: '',
  capacity: '',
  status: 'scheduled',
  category: 'general'
};

const EventForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { getEventById, createEvent, updateEvent, currentEvent } = useEvent();

  const [formData, setFormData] = useState(emptyEvent);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      (async () => {
        try {
          setLoading(true);
          await getEventById(id);
        } catch (error) {
          setErrors({ submit: 'No pudimos cargar el evento, intenta nuevamente.' });
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [getEventById, id, isEditing]);

  useEffect(() => {
    if (isEditing && currentEvent) {
      setFormData({
        title: currentEvent.title || '',
        date: currentEvent.date ? currentEvent.date.split('T')[0] : new Date().toISOString().split('T')[0],
        location: currentEvent.location || '',
        description: currentEvent.description || '',
        capacity: currentEvent.capacity || '',
        status: currentEvent.status || 'scheduled',
        category: currentEvent.category || 'general'
      });
    }
  }, [currentEvent, isEditing]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!formData.date) newErrors.date = 'La fecha es obligatoria';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      if (isEditing) {
        await updateEvent(id, formData);
      } else {
        await createEvent(formData);
      }
      navigate('/events');
    } catch (error) {
      setErrors({ submit: 'Error al guardar el evento, intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return <div className="event-form-loading">Cargando evento...</div>;
  }

  return (
    <div className="event-form-container">
      <div className="form-header">
        <h1>{isEditing ? 'Editar Evento' : 'Crear Evento'}</h1>
        <button type="button" className="btn-secondary" onClick={() => navigate('/events')}>
          Volver a la lista
        </button>
      </div>

      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Título *</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
              placeholder="Nombre del evento"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="date">Fecha *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Lugar</label>
            <input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Auditorio principal, sala online..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacidad</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Número de asistentes"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Estado</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}>
              <option value="scheduled">Programado</option>
              <option value="completed">Completado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange}>
              <option value="general">General</option>
              <option value="formacion">Formación</option>
              <option value="reunion">Reunión</option>
              <option value="finanzas">Finanzas</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Agenda, objetivos y notas relevantes"
          />
        </div>

        {errors.submit && <div className="form-error">{errors.submit}</div>}

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/events')}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : isEditing ? 'Actualizar evento' : 'Crear evento'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
