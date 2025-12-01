import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    membershipNumber: '',
    joinDate: '',
    membershipType: '',
    status: 'active'
  });

  const [editMode, setEditMode] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = () => {
    setLoading(true);
    // Simular carga de datos del perfil
    setTimeout(() => {
      setProfileData({
        name: user?.name || 'Usuario Demo',
        email: user?.email || 'test@demo.com',
        phone: '+57 300 123 4567',
        address: 'Calle 123 #45-67, Bogotá, Colombia',
        membershipNumber: 'MEM-2024-001',
        joinDate: '2024-01-15',
        membershipType: 'active',
        status: 'active'
      });
      setLoading(false);
    }, 800);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simular actualización
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Perfil actualizado exitosamente');
      setEditMode(false);
    } catch (error) {
      alert('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      alert('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simular cambio de contraseña
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Contraseña actualizada exitosamente');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      alert('Error al cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (loading && !editMode) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Mi Perfil</h1>
        <div className="user-role-badge">
          {user?.role === 'admin' ? 'Administrador' : 'Miembro'}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="user-avatar">
            <div className="avatar-circle">
              {profileData.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h3>{profileData.name}</h3>
            <p>{profileData.email}</p>
          </div>

          <div className="profile-nav">
            <button 
              className={`nav-item ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              Información Personal
            </button>
            <button 
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Seguridad
            </button>
            <button 
              className={`nav-item ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              Actividad
            </button>
            <button 
              className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              Preferencias
            </button>
          </div>
        </div>

        <div className="profile-main">
          {activeTab === 'info' && (
            <div className="profile-section">
              <div className="section-header">
                <h2>Información Personal</h2>
                {!editMode && (
                  <button 
                    className="btn-edit"
                    onClick={() => setEditMode(true)}
                  >
                    Editar Perfil
                  </button>
                )}
              </div>

              {editMode ? (
                <form onSubmit={handleProfileSubmit} className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre Completo</label>
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Correo Electrónico</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Teléfono</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Número de Membresía</label>
                      <input
                        type="text"
                        value={profileData.membershipNumber}
                        disabled
                        className="disabled-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Dirección</label>
                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                      rows="3"
                    />
                  </div>

                  <div className="form-actions">
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => setEditMode(false)}
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Nombre:</span>
                      <span className="info-value">{profileData.name}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{profileData.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Teléfono:</span>
                      <span className="info-value">{profileData.phone}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Número de Membresía:</span>
                      <span className="info-value">{profileData.membershipNumber}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Fecha de Ingreso:</span>
                      <span className="info-value">{formatDate(profileData.joinDate)}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Estado:</span>
                      <span className={`status-badge ${profileData.status}`}>
                        {profileData.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="info-item-full">
                    <span className="info-label">Dirección:</span>
                    <span className="info-value">{profileData.address}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="profile-section">
              <h2>Seguridad y Contraseña</h2>
              
              <form onSubmit={handlePasswordSubmit} className="security-form">
                <div className="form-group">
                  <label>Contraseña Actual</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Nueva Contraseña</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength="6"
                  />
                  <small className="form-hint">Mínimo 6 caracteres</small>
                </div>

                <div className="form-group">
                  <label>Confirmar Nueva Contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
                  </button>
                </div>
              </form>

              <div className="security-tips">
                <h4>Consejos de Seguridad:</h4>
                <ul>
                  <li>Usa una contraseña única para cada cuenta</li>
                  <li>Combina letras, números y símbolos</li>
                  <li>No uses información personal obvia</li>
                  <li>Cambia tu contraseña regularmente</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="profile-section">
              <h2>Actividad Reciente</h2>
              
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">📊</div>
                  <div className="activity-content">
                    <p><strong>Inicio de sesión exitoso</strong></p>
                    <span>Hace 2 horas desde IP: 192.168.1.1</span>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon">👤</div>
                  <div className="activity-content">
                    <p><strong>Perfil actualizado</strong></p>
                    <span>Ayer a las 15:30</span>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon">📅</div>
                  <div className="activity-content">
                    <p><strong>Inscripción a evento</strong></p>
                    <span>Taller de React - 3 días atrás</span>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon">💳</div>
                  <div className="activity-content">
                    <p><strong>Pago procesado</strong></p>
                    <span>Cuota mensual - 1 semana atrás</span>
                  </div>
                </div>
              </div>

              <div className="no-activity">
                <p>No hay más actividad para mostrar</p>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="profile-section">
              <h2>Preferencias</h2>
              
              <div className="preferences-form">
                <div className="preference-item">
                  <div className="preference-info">
                    <h4>Notificaciones por Email</h4>
                    <p>Recibir notificaciones sobre eventos, pagos y actualizaciones</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="preference-item">
                  <div className="preference-info">
                    <h4>Recordatorios de Eventos</h4>
                    <p>Recordatorios automáticos 24h antes de eventos</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="preference-item">
                  <div className="preference-info">
                    <h4>Notificaciones de Pagos</h4>
                    <p>Alertas sobre vencimiento de cuotas</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="preference-item">
                  <div className="preference-info">
                    <h4>Modo Oscuro</h4>
                    <p>Interfaz con tema oscuro</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="preferences-actions">
                <button className="btn-primary">Guardar Preferencias</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;