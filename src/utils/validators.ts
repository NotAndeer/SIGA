// Validadores reutilizables para formularios

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateRequired = (value: string | undefined | null): boolean => {
  return !!value && value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return !!value && value.length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return !!value && value.length <= maxLength;
};

export const validatePassword = (password: string) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
    requirements: {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar
    }
  };
};

// Validador para formulario de miembros
export const validateMemberForm = (formData: Record<string, string>) => {
  const errors: Record<string, string> = {};

  if (!validateRequired(formData.name)) {
    errors.name = 'El nombre es obligatorio';
  }

  if (!validateRequired(formData.email)) {
    errors.email = 'El email es obligatorio';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'El formato del email es inválido';
  }

  if (!validateRequired(formData.phone)) {
    errors.phone = 'El teléfono es obligatorio';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'El formato del teléfono es inválido';
  }

  return errors;
};
