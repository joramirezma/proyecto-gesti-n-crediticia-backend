const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { 
  authenticate, 
  validateRegister, 
  validateLogin, 
  validateEmail, 
  validateResetPassword 
} = require('../middlewares');

/**
 * @route   POST /api/auth/register
 * @desc    Registrar nuevo usuario (Asesor)
 * @access  Public
 */
router.post('/register', validateRegister, authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Iniciar sesión
 * @access  Public
 */
router.post('/login', validateLogin, authController.login);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Solicitar recuperación de contraseña
 * @access  Public
 */
router.post('/forgot-password', validateEmail, authController.forgotPassword);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Restablecer contraseña con token
 * @access  Public
 */
router.post('/reset-password', validateResetPassword, authController.resetPassword);

/**
 * @route   GET /api/auth/me
 * @desc    Obtener información del usuario actual
 * @access  Private
 */
router.get('/me', authenticate, authController.getCurrentUser);

/**
 * @route   POST /api/auth/verify-token
 * @desc    Verificar si el token es válido
 * @access  Private
 */
router.post('/verify-token', authenticate, authController.verifyToken);

module.exports = router;
