const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

/**
 * Generar token JWT
 * @param {Object} payload - Datos a incluir en el token
 * @param {string} expiresIn - Tiempo de expiración (opcional)
 * @returns {string} Token JWT
 */
const generateToken = (payload, expiresIn = jwtConfig.expiresIn) => {
  return jwt.sign(payload, jwtConfig.secret, { expiresIn });
};

/**
 * Verificar token JWT
 * @param {string} token - Token a verificar
 * @returns {Object} Payload decodificado
 * @throws {Error} Si el token es inválido o expirado
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.secret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expirado');
    }
    throw new Error('Token inválido');
  }
};

/**
 * Generar token para recuperación de contraseña
 * @param {Object} payload - Datos del usuario
 * @returns {string} Token de recuperación
 */
const generateResetToken = (payload) => {
  return generateToken(
    { ...payload, type: 'password_reset' },
    jwtConfig.resetPasswordExpiresIn
  );
};

module.exports = {
  generateToken,
  verifyToken,
  generateResetToken
};
