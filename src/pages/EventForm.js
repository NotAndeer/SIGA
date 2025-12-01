import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventForm.css';

const EventForm = () => {
  const navigate = useNavigate();
  const isEditing = window.location.pathname.includes('/edit/');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    eventType: 'training',
    capacity: 50,
    status: 'scheduled',
    registrationDeadline: '',
    price: 0
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      // Simular carga de datos para edición
      loadEventData();
    }
  }, [isEditing]);

  const loadEventData = () => {
    setLoading(true);
    setTimeout(() => {
      setFormData({
        title: 'Taller de Desarrollo Web Avanzado',
        description: 'Taller práctico sobre React, Node.js y bases de datos',
        date: '2024-12-15',
        time: '14:00',
        location: 'Auditorio Principal - Sede Central',
        eventType: 'training',
        capacity: 100,
        status: 'scheduled',
        registrationDeadline: '2024-12-10',
        price: 0
      });
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' || name === 'price' ? Number(value) : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }
    
    if (!formData.date) {
      newErrors.date = 'La fecha es obligatoria';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'La ubicación es obligatoria';
    }
    
    if (formData.capacity < 1) {
      newErrors.capacity = 'La capacidad debe ser mayor a 0';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    try {
      setLoading(true);
      
      // Simular envío de datos
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Evento guardado:', formData);
      alert(`Evento ${isEditing ? 'actualizado' : 'creado'} exitosamente`);
      navigate('/events');
      
    } catch (error) {
      console.error('Error guardando evento:', error);
      setErrors({ submit: 'Error al guardar el evento' });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando datos del evento...</p>
      </div>
    );
  }

  return (
    <div className="event-form-container">
      <div className="form-header">
        <h1>{isEditing ? 'Editar Evento' : 'Crear Nuevo Evento'}</h1>
        <button 
          type="button" 
          className="btn-secondary"
          onClick={() => navigate('/events')}
        >
          Volver a Eventos
        </button>
      </div>

      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-section">
          <h3>Información Básica</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Título del Evento *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? 'error' : ''}
                placeholder="Ej: Taller de React Avanzado"
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="eventType">Tipo de Evento</label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
              >
                <option value="training">Capacitación</option>
                <option value="meeting">Reunión</option>
                <option value="social">Social</option>
                <option value="conference">Conferencia</option>
                <option value="workshop">Taller</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe los objetivos y contenido del evento..."
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Fecha y Lugar</h3>
          
          <div className="form-row">
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

            <div className="form-group">
              <label htmlFor="time">Hora</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="registrationDeadline">Fecha límite inscripción</label>
              <input
                type="date"
                id="registrationDeadline"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Ubicación *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={errors.location ? 'error' : ''}
                placeholder="Ej: Auditorio Principal, Sede Central"
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Configuración</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="capacity">Capacidad Máxima *</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className={errors.capacity ? 'error' : ''}
                min="1"
                max="1000"
              />
              {errors.capacity && <span className="error-message">{errors.capacity}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="price">Precio (COP)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="1000"
              />
              <small>0 = Evento gratuito</small>
            </div>

            <div className="form-group">
              <label htmlFor="status">Estado</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="scheduled">Programado</option>
                <option value="active">Activo</option>
                <option value="cancelled">Cancelado</option>
                <option value="completed">Completado</option>
              </select>
            </div>
          </div>
        </div>

        {errors.submit && <div className="form-error">{errors.submit}</div>}

        <div className="form-actions">
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => navigate('/events')}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (isEditing ? 'Actualizar Evento' : 'Crear Evento')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;s