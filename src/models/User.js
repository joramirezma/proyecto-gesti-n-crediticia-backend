const { pool } = require('../config/database');

class User {
  /**
   * Buscar usuario por ID
   * @param {number} id - ID del usuario
   * @returns {Promise<Object|null>} Usuario encontrado o null
   */
  static async findById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, nombre, email, rol, fecha_creacion FROM usuarios WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error al buscar usuario por ID: ${error.message}`);
    }
  }

  /**
   * Buscar usuario por email
   * @param {string} email - Email del usuario
   * @returns {Promise<Object|null>} Usuario encontrado o null
   */
  static async findByEmail(email) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error al buscar usuario por email: ${error.message}`);
    }
  }

  /**
   * Crear un nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @param {string} userData.nombre - Nombre del usuario
   * @param {string} userData.email - Email del usuario
   * @param {string} userData.password - Contraseña hasheada
   * @param {string} userData.rol - Rol del usuario (Asesor, Analista)
   * @returns {Promise<Object>} Usuario creado
   */
  static async create({ nombre, email, password, rol = 'Asesor' }) {
    try {
      const [result] = await pool.execute(
        'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
        [nombre, email, password, rol]
      );
      
      return {
        id: result.insertId,
        nombre,
        email,
        rol,
        fecha_creacion: new Date()
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('El email ya está registrado');
      }
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }

  /**
   * Actualizar contraseña del usuario
   * @param {number} id - ID del usuario
   * @param {string} newPassword - Nueva contraseña hasheada
   * @returns {Promise<boolean>} True si se actualizó correctamente
   */
  static async updatePassword(id, newPassword) {
    try {
      const [result] = await pool.execute(
        'UPDATE usuarios SET password = ? WHERE id = ?',
        [newPassword, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error al actualizar contraseña: ${error.message}`);
    }
  }

  /**
   * Obtener todos los usuarios (sin contraseñas)
   * @returns {Promise<Array>} Lista de usuarios
   */
  static async findAll() {
    try {
      const [rows] = await pool.execute(
        'SELECT id, nombre, email, rol, fecha_creacion FROM usuarios'
      );
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  }

  /**
   * Verificar si existe un usuario con el email dado
   * @param {string} email - Email a verificar
   * @returns {Promise<boolean>} True si existe
   */
  static async existsByEmail(email) {
    try {
      const [rows] = await pool.execute(
        'SELECT COUNT(*) as count FROM usuarios WHERE email = ?',
        [email]
      );
      return rows[0].count > 0;
    } catch (error) {
      throw new Error(`Error al verificar email: ${error.message}`);
    }
  }
}

module.exports = User;
