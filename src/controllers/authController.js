const { authService } = require('../services');

/**
 * Controlador de autenticación
 */
const authController = {
  /**
   * POST /api/auth/register
   * Registrar nuevo usuario
   */
  async register(req, res) {
    try {
      const { nombre, email, password } = req.body;

      const result = await authService.register({
        nombre: nombre.trim(),
        email: email.toLowerCase().trim(),
        password,
        rol: 'Asesor' // Por defecto, los nuevos usuarios son Asesores
      });

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: result
      });
    } catch (error) {
      console.error('Error en registro:', error);
      
      if (error.message === 'El email ya está registrado') {
        return res.status(409).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error al registrar usuario'
      });
    }
  },

  /**
   * POST /api/auth/login
   * Iniciar sesión
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(
        email.toLowerCase().trim(),
        password
      );

      res.json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: result
      });
    } catch (error) {
      console.error('Error en login:', error);

      if (error.message === 'Credenciales inválidas') {
        return res.status(401).json({
          success: false,
          message: 'Correo electrónico o contraseña incorrectos'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error al iniciar sesión'
      });
    }
  },

  /**
   * POST /api/auth/forgot-password
   * Solicitar recuperación de contraseña
   */
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      const result = await authService.requestPasswordReset(
        email.toLowerCase().trim()
      );

      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      console.error('Error en recuperación de contraseña:', error);
      
      // Por seguridad, siempre devolver el mismo mensaje
      res.json({
        success: true,
        message: 'Si el email está registrado, recibirás instrucciones para recuperar tu contraseña'
      });
    }
  },

  /**
   * POST /api/auth/reset-password
   * Restablecer contraseña
   */
  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;

      const result = await authService.resetPassword(token, newPassword);

      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      console.error('Error al restablecer contraseña:', error);

      if (error.message === 'Token inválido o expirado' || error.message === 'Token inválido') {
        return res.status(400).json({
          success: false,
          message: 'El enlace de recuperación es inválido o ha expirado'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error al restablecer la contraseña'
      });
    }
  },

  /**
   * GET /api/auth/me
   * Obtener usuario actual
   */
  async getCurrentUser(req, res) {
    try {
      res.json({
        success: true,
        data: {
          user: req.user
        }
      });
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener información del usuario'
      });
    }
  },

  /**
   * POST /api/auth/verify-token
   * Verificar si el token es válido
   */
  async verifyToken(req, res) {
    try {
      res.json({
        success: true,
        message: 'Token válido',
        data: {
          user: req.user
        }
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
  }
};

module.exports = authController;
