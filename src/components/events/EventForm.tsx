import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvent } from '../../context/EventContext';
import { EventItem } from '../../types/models';
import './EventForm.css';

type EventFormData = {
  title: string;
  date: string;
  location: string;
  description: string;
  capacity: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  category: string;
};

type FormErrors = Partial<Record<keyof EventFormData | 'submit', string>>;

const allowedStatuses: EventFormData['status'][] = ['scheduled', 'completed', 'cancelled'];

const emptyEvent: EventFormData = {
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

  const [formData, setFormData] = useState<EventFormData>(emptyEvent);
  const [errors, setErrors] = useState<FormErrors>({});
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
      const normalizedStatus = allowedStatuses.includes(currentEvent.status as EventFormData['status'])
        ? (currentEvent.status as EventFormData['status'])
        : 'scheduled';

      setFormData({
        title: currentEvent.title || '',
        date: currentEvent.date ? currentEvent.date.split('T')[0] : new Date().toISOString().split('T')[0],
        location: currentEvent.location || '',
        description: currentEvent.description || '',
        capacity: currentEvent.capacity ? String(currentEvent.capacity) : '',
        status: normalizedStatus,
        category: currentEvent.category || 'general'
      });
    }
  }, [currentEvent, isEditing]);

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!formData.date) newErrors.date = 'La fecha es obligatoria';
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormErrors;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[fieldName]) setErrors((prev) => ({ ...prev, [fieldName]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const payload: Partial<EventItem> = {
        ...formData,
        capacity: formData.capacity ? Number(formData.capacity) : undefined
      };

      if (isEditing) {
        await updateEvent(id, payload);
      } else {
        await createEvent(payload);
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
            rows={4}
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
