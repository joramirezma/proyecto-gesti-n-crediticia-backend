const User = require('../models/User');
const { hashPassword, comparePassword, generateToken, generateResetToken, verifyToken } = require('../utils');
const { sendPasswordResetEmail } = require('./emailService');

/**
 * Servicio de autenticación
 */
const authService = {
  /**
   * Registrar nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @returns {Promise<Object>} Usuario creado y token
   */
  async register({ nombre, email, password, rol = 'Asesor' }) {
    // Verificar si el email ya existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Hashear contraseña
    const hashedPassword = await hashPassword(password);

    // Crear usuario
    const user = await User.create({
      nombre,
      email,
      password: hashedPassword,
      rol
    });

    // Generar token
    const token = generateToken({
      id: user.id,
      email: user.email,
      rol: user.rol
    });

    return {
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        fecha_creacion: user.fecha_creacion
      },
      token
    };
  },

  /**
   * Iniciar sesión
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña
   * @returns {Promise<Object>} Usuario y token
   */
  async login(email, password) {
    // Buscar usuario
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token
    const token = generateToken({
      id: user.id,
      email: user.email,
      rol: user.rol
    });

    return {
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        fecha_creacion: user.fecha_creacion
      },
      token
    };
  },

  /**
   * Solicitar recuperación de contraseña
   * @param {string} email - Email del usuario
   * @returns {Promise<Object>} Resultado de la operación
   */
  async requestPasswordReset(email) {
    // Buscar usuario
    const user = await User.findByEmail(email);
    if (!user) {
      // Por seguridad, no revelar si el email existe o no
      return { 
        success: true, 
        message: 'Si el email está registrado, recibirás instrucciones para recuperar tu contraseña' 
      };
    }

    // Generar token de recuperación
    const resetToken = generateResetToken({
      id: user.id,
      email: user.email
    });

    // Enviar email
    await sendPasswordResetEmail(user.email, resetToken, user.nombre);

    return {
      success: true,
      message: 'Si el email está registrado, recibirás instrucciones para recuperar tu contraseña'
    };
  },

  /**
   * Restablecer contraseña
   * @param {string} token - Token de recuperación
   * @param {string} newPassword - Nueva contraseña
   * @returns {Promise<Object>} Resultado de la operación
   */
  async resetPassword(token, newPassword) {
    // Verificar token
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }

    // Verificar que sea un token de reset
    if (decoded.type !== 'password_reset') {
      throw new Error('Token inválido');
    }

    // Verificar que el usuario existe
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Hashear nueva contraseña
    const hashedPassword = await hashPassword(newPassword);

    // Actualizar contraseña
    await User.updatePassword(decoded.id, hashedPassword);

    return {
      success: true,
      message: 'Contraseña actualizada correctamente'
    };
  },

  /**
   * Obtener usuario por token
   * @param {string} token - Token JWT
   * @returns {Promise<Object>} Usuario
   */
  async getUserFromToken(token) {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }
};

module.exports = authService;
