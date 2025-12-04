/**
 * Validar datos de registro
 */
const validateRegister = (req, res, next) => {
  const { nombre, email, password } = req.body;
  const errors = [];

  // Validar nombre
  if (!nombre || typeof nombre !== 'string') {
    errors.push('El nombre es requerido');
  } else if (nombre.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  } else if (nombre.trim().length > 255) {
    errors.push('El nombre no puede exceder 255 caracteres');
  }

  // Validar email
  if (!email || typeof email !== 'string') {
    errors.push('El email es requerido');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('El formato del email no es válido');
    }
  }

  // Validar password
  if (!password || typeof password !== 'string') {
    errors.push('La contraseña es requerida');
  } else if (password.length < 6) {
    errors.push('La contraseña debe tener al menos 6 caracteres');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors
    });
  }

  next();
};

/**
 * Validar datos de login
 */
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || typeof email !== 'string') {
    errors.push('El email es requerido');
  }

  if (!password || typeof password !== 'string') {
    errors.push('La contraseña es requerida');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors
    });
  }

  next();
};

/**
 * Validar email para recuperación
 */
const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'El email es requerido'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'El formato del email no es válido'
    });
  }

  next();
};

/**
 * Validar datos de reset de contraseña
 */
const validateResetPassword = (req, res, next) => {
  const { token, newPassword } = req.body;
  const errors = [];

  if (!token || typeof token !== 'string') {
    errors.push('El token es requerido');
  }

  if (!newPassword || typeof newPassword !== 'string') {
    errors.push('La nueva contraseña es requerida');
  } else if (newPassword.length < 6) {
    errors.push('La contraseña debe tener al menos 6 caracteres');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateEmail,
  validateResetPassword
};
