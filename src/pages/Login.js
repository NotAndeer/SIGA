import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // mensaje opcional si viene de registro
  const registeredMessage = location.state?.registered ? 'Registro exitoso. Por favor inicia sesión.' : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const err = {};
    if (!credentials.email.trim()) err.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(credentials.email)) err.email = 'Formato de email inválido';
    if (!credentials.password) err.password = 'La contraseña es obligatoria';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    try {
      setLoading(true);
      await login({ email: credentials.email, password: credentials.password });
      navigate('/', { replace: true });
    } catch (err) {
      const message = err.response?.data?.message || 'Credenciales inválidas';
      setErrors({ submit: message });
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-header">
          <h1>SIGA</h1>
          <p>Sistema Integrado de Gestión para Asociaciones</p>
        </div>

        {registeredMessage && <div className="form-success">{registeredMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="usuario@ejemplo.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Ingresa tu contraseña"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {errors.submit && <div className="form-error">{errors.submit}</div>}

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>

          <div className="login-footer">
            <p>
              ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
