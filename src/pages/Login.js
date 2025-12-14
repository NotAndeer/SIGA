import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const featureList = [
  'Panel claro para eventos, finanzas y miembros',
  'Notificaciones y accesos directos a tus tareas',
  'Sesiones seguras respaldadas por Firebase Auth',
];

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!credentials.email.trim()) newErrors.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(credentials.email))
      newErrors.email = 'El formato del email es inválido';

    if (!credentials.password) newErrors.password = 'La contraseña es obligatoria';

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
      await login(credentials);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-page">
      <section className="login-hero">
        <p className="app-name">SIGA</p>
        <h1>Tu asociación conectada en un solo lugar</h1>
        <p className="subtitle">
          Accede a un panel intuitivo para organizar miembros, eventos y finanzas con total transparencia.
        </p>

        <div className="hero-features">
          {featureList.map((feature) => (
            <div key={feature} className="chip">
              {feature}
            </div>
          ))}
        </div>

        <div className="status-card">
          <div>
            <p className="status-title">Operación segura</p>
            <p className="status-copy">Autenticación cifrada con Firebase y sesiones renovables.</p>
          </div>
          <span className="status-badge">En línea</span>
        </div>
      </section>

      <section className="login-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Acceso privado</p>
            <h2>Inicia sesión</h2>
            <p className="description">Ingresa con las credenciales de tu asociación</p>
          </div>
          <Link to="/register" className="ghost-button">
            Crear cuenta
          </Link>
        </div>

        {location.state?.registered && (
          <div className="success-banner">Cuenta creada correctamente. Ahora puedes iniciar sesión.</div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="input-block">
            <span>Correo electrónico</span>
            <div className={`input-shell ${errors.email ? 'has-error' : ''}`}>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="usuario@asociacion.com"
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="hint error">{errors.email}</span>}
          </label>

          <label className="input-block">
            <span>Contraseña</span>
            <div className={`input-shell ${errors.password ? 'has-error' : ''}`}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            {errors.password && <span className="hint error">{errors.password}</span>}
          </label>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Ingresando...' : 'Entrar al panel'}
          </button>

          <p className="helper">¿Problemas para ingresar? Contacta al administrador de tu asociación.</p>
        </form>
      </section>
    </div>
  );
};

export default Login;
