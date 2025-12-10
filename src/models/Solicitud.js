// En src/models/Solicitud.js

const { pool } = require('../config/database');

class Solicitud {
    /**
     * Crea un nuevo registro de solicitud con valores por defecto.
     * @param {Object} data - Contiene cliente_id, asesor_id, y estado.
     * @returns {Promise<Object>} Solicitud creada.
     */
    static async create({ cliente_id, asesor_id, estado = 'Pendiente' }) {
        try {
            // Inicializar campos opcionales a NULL, ya que la DB los necesita
            const fecha_actualizacion = null; 
            const resultado = null;
            const puntaje_riesgo = null;
            const comentarios = null;
            const fecha_evaluacion = null; 

            const [result] = await pool.execute(
                `INSERT INTO solicitudes (
                    cliente_id, 
                    asesor_id, 
                    estado, 
                    fecha_creacion,
                    fecha_actualizacion, 
                    resultado, 
                    puntaje_riesgo, 
                    comentarios, 
                    fecha_evaluacion
                ) VALUES (?, ?, ?, NOW(), ?, ?, ?, ?, ?)`,
                [
                    cliente_id, 
                    asesor_id, 
                    estado,
                    fecha_actualizacion, 
                    resultado, 
                    puntaje_riesgo, 
                    comentarios, 
                    fecha_evaluacion
                ]
            );

            // Retornar la solicitud creada
            return {
                id: result.insertId,
                cliente_id,
                asesor_id,
                estado,
                fecha_creacion: new Date(),
                // ... (otros campos)
            };

        } catch (error) {
            console.error('Error en Solicitud.create:', error);
            throw new Error(`Error en la base de datos al crear la solicitud: ${error.message}`);
        }
    }

    static async findByAsesorAndStatus(asesorId, estado) {
        try {
            let sql = `
                SELECT 
                    s.id, s.cliente_id, s.asesor_id, s.estado, s.fecha_creacion,
                    s.resultado, s.puntaje_riesgo, 
                    c.nombre_completo AS cliente_nombre 
                FROM solicitudes s
                JOIN clientes c ON s.cliente_id = c.id
                WHERE s.asesor_id = ? 
            `;
            const params = [asesorId];

            // 🚀 CONSTRUCCIÓN DINÁMICA DEL FILTRO DE ESTADO
            if (estado && estado !== 'Todas') {
                sql += ' AND s.estado = ?';
                params.push(estado);
            }

            // Ordenar siempre por fecha de creación descendente (las más nuevas primero)
            sql += ' ORDER BY s.fecha_creacion DESC';

            const [rows] = await pool.execute(sql, params);
            return rows;

        } catch (error) {
            console.error('Error SQL en Solicitud.findByAsesorAndStatus:', error);
            throw new Error(`Error al buscar solicitudes: ${error.message}`);
        }
    }
}

module.exports = Solicitud;