// En src/services/solicitudService.js

const Solicitud = require('../models/Solicitud'); 

const solicitudService = {
    /**
     * Lógica de negocio para crear una solicitud.
     */
    async createSolicitud({ cliente_id, asesor_id }) {
        try {
            // Aquí se pueden poner reglas de negocio adicionales antes de crear.
            
            const nuevaSolicitud = await Solicitud.create({
                cliente_id,
                asesor_id,
                estado: 'Pendiente' // Aseguramos el estado inicial
            });
            
            return nuevaSolicitud;
        } catch (error) {
            console.error('Error en solicitudService.createSolicitud:', error);
            throw new Error('No se pudo registrar la solicitud debido a un error interno.');
        }
    },
    async findSolicitudesByAsesor({ asesor_id, estado }) {
        try {
            // El modelo manejará la construcción dinámica de la consulta SQL
            const solicitudes = await Solicitud.findByAsesorAndStatus(asesor_id, estado);
            return solicitudes;
        } catch (error) {
            console.error('Error en solicitudService.findSolicitudesByAsesor:', error);
            throw new Error('No se pudo obtener la lista de solicitudes.');
        }
    }
    
    // Aquí puedes agregar findById, update, etc.
};

module.exports = solicitudService;