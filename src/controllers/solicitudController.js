const { solicitudService } = require('../services');

const solicitudController = {
    async createSolicitud(req, res) {
        try {
            const asesor_id = req.user.id; // Obtenido del token (middleware)
            const { cliente_id } = req.body; // Obtenido del formulario

            if (!cliente_id) {
                return res.status(400).json({ success: false, message: 'El cliente es requerido.' });
            }

            const nuevaSolicitud = await solicitudService.createSolicitud({
                cliente_id: parseInt(cliente_id),
                asesor_id: parseInt(asesor_id)
            });

            res.status(201).json({
                success: true,
                message: 'Solicitud creada y en estado Pendiente.',
                data: nuevaSolicitud
            });

        } catch (error) {
            console.error('Error al crear solicitud:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Error interno al procesar la solicitud.'
            });
        }
    },
    async getSolicitudesByAsesor(req, res) {
        try {
            // El asesor_id se obtiene directamente del token, lo cual es más seguro
            const asesor_id = req.user.id; 
            
            // Obtener el filtro de estado de la query string (e.g., ?estado=PENDING)
            // Si no se envía, será 'Todas' (o undefined, que pasamos como 'Todas' al servicio)
            const { estado } = req.query; 

            if (!asesor_id) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'ID de asesor no disponible, token inválido.' 
                });
            }

            const solicitudes = await solicitudService.findSolicitudesByAsesor({
                asesor_id: parseInt(asesor_id), // Convertir a número
                estado: estado // Pasa el estado (puede ser undefined o 'Todas')
            });

            res.status(200).json({
                success: true,
                message: 'Solicitudes listadas exitosamente.',
                data: solicitudes
            });

        } catch (error) {
            console.error('Error al listar solicitudes por asesor:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Error interno al obtener las solicitudes.'
            });
        }
    }
};

module.exports = solicitudController;