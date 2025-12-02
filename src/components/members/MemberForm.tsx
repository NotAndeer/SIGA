import React, { useState, useEffect } from 'react';
import { useMember } from '../../context/MemberContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Member } from '../../types/models';
import './MemberForm.css';

type MemberFormData = Pick<Member, 'name' | 'email' | 'phone' | 'address' | 'profession' | 'membershipType' | 'joinDate' | 'status'>;
type FormErrors = Partial<Record<keyof MemberFormData | 'submit', string>>;

const MemberForm = () => {
  const { addMember, updateMember, getMemberById, currentMember } = useMember();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<MemberFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    profession: '',
    membershipType: 'active',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'active'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      loadMemberData();
    }
  }, [isEditing, id]);

  const loadMemberData = async () => {
    try {
      setLoading(true);
      await getMemberById(id);
    } catch (error) {
      console.error('Error loading member:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing && currentMember) {
      setFormData({
        name: currentMember.name || '',
        email: currentMember.email || '',
        phone: currentMember.phone || '',
        address: currentMember.address || '',
        profession: currentMember.profession || '',
        membershipType: currentMember.membershipType || 'active',
        joinDate: currentMember.joinDate || new Date().toISOString().split('T')[0],
        status: currentMember.status || 'active'
      });
    }
  }, [currentMember, isEditing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof MemberFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email es inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      setLoading(true);

      if (isEditing) {
        await updateMember(id, formData);
      } else {
        await addMember(formData);
      }

      navigate('/members');
    } catch (error) {
      console.error('Error saving member:', error);
      setErrors({ submit: 'Error al guardar el miembro. Por favor, intente nuevamente.' });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return <div className="loading">Cargando datos del miembro...</div>;
  }

  return (
    <div className="member-form-container">
      <div className="form-header">
        <h1>{isEditing ? 'Editar Miembro' : 'Nuevo Miembro'}</h1>
        <button 
          type="button" 
          className="btn-secondary"
          onClick={() => navigate('/members')}
        >
          Volver a la lista
        </button>
      </div>

      <form onSubmit={handleSubmit} className="member-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Nombre completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Ingresa el nombre completo"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="usuario@ejemplo.com"
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
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="profession">Profesión</label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              placeholder="Ingresa la profesión"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            placeholder="Ingresa la dirección completa"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="membershipType">Tipo de membresía</label>
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
            </select>
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
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="joinDate">Fecha de ingreso</label>
            <input
              type="date"
              id="joinDate"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {errors.submit && <div className="form-error">{errors.submit}</div>}

        <div className="form-actions">
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => navigate('/members')}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (isEditing ? 'Actualizar Miembro' : 'Registrar Miembro')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;
