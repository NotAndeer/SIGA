import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './MemberForm.css';

const MemberForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    identification: '',
    birthDate: '',
    profession: '',
    company: '',
    position: '',
    membershipType: 'active',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'active',
    paymentStatus: 'current',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && id) {
      loadMemberData();
    }
  }, [isEditing, id]);

  const loadMemberData = () => {
    setLoading(true);
    // Simular carga de datos para edición
    setTimeout(() => {
      setFormData({
        name: 'Juan Carlos Pérez González',
        email: 'juan.perez@email.com',
        phone: '+57 300 123 4567',
        address: 'Carrera 45 #26-85, Bogotá, Colombia',
        identification: '1234567890',
        birthDate: '1985-06-15',
        profession: 'Ingeniero de Software',
        company: 'Tech Solutions S.A.S',
        position: 'Líder de Desarrollo',
        membershipType: 'active',
        joinDate: '2023-03-20',
        status: 'active',
        paymentStatus: 'current',
        notes: 'Miembro fundador, participa activamente en eventos.'
      });
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error si existe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validaciones básicas
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El formato del email es inválido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'El formato del teléfono es inválido';
    }
    
    if (!formData.identification.trim()) {
      newErrors.identification = 'La identificación es obligatoria';
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
      
      // Simular envío de datos (en producción sería una llamada a la API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Miembro guardado:', formData);
      alert(`Miembro ${isEditing ? 'actualizado' : 'registrado'} exitosamente`);
      navigate('/members');
      
    } catch (error) {
      console.error('Error guardando miembro:', error);
      setErrors({ submit: 'Error al guardar el miembro. Por favor, intente nuevamente.' });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  if (loading && isEditing) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando datos del miembro...</p>
      </div>
    );
  }

  return (
    <div className="member-form-container">
      <div className="form-header">
        <div>
          <h1>{isEditing ? 'Editar Miembro' : 'Nuevo Miembro'}</h1>
          <p className="form-subtitle">
            {isEditing ? 'Actualiza la información del miembro' : 'Registra un nuevo miembro en la asociación'}
          </p>
        </div>
        <button 
          type="button" 
          className="btn-secondary"
          onClick={() => navigate('/members')}
        >
          Volver a Miembros
        </button>
      </div>

      <form onSubmit={handleSubmit} className="member-form">
        <div className="form-sections">
          {/* Sección 1: Información Personal */}
          <div className="form-section">
            <h3>
              <span className="section-icon">👤</span>
              Información Personal
            </h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nombre Completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Ej: Juan Carlos Pérez González"
                  required
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="usuario@email.com"
                  required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Teléfono *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="+57 300 123 4567"
                  required
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="identification">Identificación *</label>
                <input
                  type="text"
                  id="identification"
                  name="identification"
                  value={formData.identification}
                  onChange={handleChange}
                  className={errors.identification ? 'error' : ''}
                  placeholder="Cédula o Pasaporte"
                  required
                />
                {errors.identification && <span className="error-message">{errors.identification}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="birthDate">Fecha de Nacimiento</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
                {formData.birthDate && (
                  <small className="form-hint">
                    Edad: {calculateAge(formData.birthDate)} años
                  </small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="address">Dirección</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Dirección completa"
                />
              </div>
            </div>
          </div>

          {/* Sección 2: Información Profesional */}
          <div className="form-section">
            <h3>
              <span className="section-icon">💼</span>
              Información Profesional
            </h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="profession">Profesión</label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  placeholder="Ej: Ingeniero, Médico, Abogado"
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">Empresa / Organización</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nombre de la empresa"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="position">Cargo / Posición</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Ej: Gerente, Desarrollador, Consultor"
                />
              </div>

              <div className="form-group">
                <label htmlFor="membershipType">Tipo de Membresía</label>
                <select
                  id="membershipType"
                  name="membershipType"
                  value={formData.membershipType}
                  onChange={handleChange}
                >
                  <option value="active">Activo</option>
                  <option value="honorary">Honorario</option>
                  <option value="student">Estudiante</option>
                  <option value="retired">Jubilado</option>
                  <option value="corporate">Corporativo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sección 3: Estado y Configuración */}
          <div className="form-section">
            <h3>
              <span className="section-icon">⚙️</span>
              Estado y Configuración
            </h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="joinDate">Fecha de Ingreso</label>
                <input
                  type="date"
                  id="joinDate"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
                {formData.joinDate && (
                  <small className="form-hint">
                    Registrado el: {formatDate(formData.joinDate)}
                  </small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="status">Estado</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                  <option value="suspended">Suspendido</option>
                  <option value="pending">Pendiente</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="paymentStatus">Estado de Pagos</label>
                <select
                  id="paymentStatus"
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                >
                  <option value="current">Al día</option>
                  <option value="pending">Pendiente</option>
                  <option value="overdue">Vencido</option>
                  <option value="exempt">Exento</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notas / Observaciones</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Información adicional, observaciones o comentarios sobre el miembro..."
              />
              <small className="form-hint">Esta información es solo para uso interno administrativo</small>
            </div>
          </div>
        </div>

        {errors.submit && (
          <div className="form-error">
            <span className="error-icon">⚠️</span>
            {errors.submit}
          </div>
        )}

        <div className="form-footer">
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => navigate('/members')}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-icon"></span>
                  {isEditing ? 'Actualizando...' : 'Registrando...'}
                </>
              ) : (
                isEditing ? 'Actualizar Miembro' : 'Registrar Miembro'
              )}
            </button>
          </div>
          
          {user?.role === 'admin' && (
            <div className="admin-notes">
              <small>⚠️ Como administrador, estás editando información sensible del miembro.</small>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default MemberForm;