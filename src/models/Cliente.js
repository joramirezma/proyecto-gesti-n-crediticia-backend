const { pool } = require('../config/database');

class Cliente {
    /**
     * Crea un nuevo registro de cliente en la base de datos.
     * @param {Object} clienteData - Datos del cliente
     * @returns {Promise<Object>} Cliente creado (incluyendo su ID)
     */

    static async findAll() {
       
        try {
            const [rows] = await pool.execute(
                'SELECT id, nombre_completo, documento_id FROM clientes ORDER BY nombre_completo ASC'
            );
            return rows;
        } catch (error) {
            // 🚀 MODIFICACIÓN TEMPORAL: Mostrar el error exacto de MySQL
            console.error('Error SQL en Cliente.findAll:', error); 
            // Vuelve a lanzar el error para que lo capture el servicio
            throw new Error(`Error SQL: ${error.message}`); 
        }
    }
    static async create({ nombre_completo, documento_id, info_adicional, asesor_id }) {
        try {
            const infoAdicionalValue = info_adicional === undefined || info_adicional === '' ? null : info_adicional;
            const asesorIdValue = asesor_id === undefined ? null : asesor_id;
            console.log(asesor_id)
            const [result] = await pool.execute(
                'INSERT INTO clientes (nombre_completo, documento_id, info_adicional, creado_por) VALUES (?, ?, ?, ?)',
                [nombre_completo, documento_id, infoAdicionalValue, asesor_id]
            );
            
            // Retornar el objeto del cliente creado para confirmación
            return {
                id: result.insertId,
                nombre_completo,
                documento_id,
                info_adicional: infoAdicionalValue,
                asesorIdValue,
                fecha_registro: new Date()
            };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('Ya existe un cliente con este documento de identidad.');
            }
            throw new Error(`Error al crear cliente: ${error.message}`);
        }
    }

    /**
     * (Opcional) Buscar cliente por ID.
     */
    static async findById(id) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM clientes WHERE id = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error al buscar cliente por ID: ${error.message}`);
        }
    }
    
    // ... (Puedes añadir otras funciones como findByDocumentoId, findAll, etc.)
}

module.exports = Cliente;