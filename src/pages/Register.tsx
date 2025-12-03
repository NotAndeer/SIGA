// src/pages/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

type RegisterForm = { name: string; email: string; password: string; passwordConfirm: string };
type RegisterErrors = Partial<Record<keyof RegisterForm | 'submit', string>>;

const Register = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegisterForm]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const err: RegisterErrors = {};
    if (!form.name.trim()) err.name = 'El nombre es obligatorio';
    if (!form.email.trim()) err.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Formato de email inválido';
    if (!form.password) err.password = 'La contraseña es obligatoria';
    if (form.password && form.password.length < 8) err.password = 'La contraseña debe tener al menos 8 caracteres';
    if (form.password !== form.passwordConfirm) err.passwordConfirm = 'Las contraseñas no coinciden';
    return err;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    try {
      setLoading(true);
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate('/', { replace: true });
    } catch (error) {
      const message = error.message || 'Error al registrar el usuario';
      setErrors({ submit: message });
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <div className="register-header">
          <h1>Crear Cuenta</h1>
          <p>Regístrate para acceder al sistema con tu cuenta segura</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre completo</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Tu nombre completo"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
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
              value={form.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Mínimo 8 caracteres"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirmar contraseña</label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              value={form.passwordConfirm}
              onChange={handleChange}
              className={errors.passwordConfirm ? 'error' : ''}
              placeholder="Repite la contraseña"
            />
            {errors.passwordConfirm && <span className="error-message">{errors.passwordConfirm}</span>}
          </div>

          {errors.submit && <div className="form-error">{errors.submit}</div>}

          <div className="form-actions">
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Crear cuenta'}
            </button>

            <p className="helper-text">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="link-inline">Inicia sesión</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
