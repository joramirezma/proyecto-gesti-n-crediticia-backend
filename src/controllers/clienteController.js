const { clienteService } = require('../services');

/**
 * Controlador de autenticación
 */
const clienteController = {

    async createClient(req, res) {
        try {
            const asesorId = req.user.id;
            const { nombre_completo, documento_id, info_adicional } = req.body;

            // 🚨 La línea que fallaba: Ahora clienteService ya existe
            const nuevoCliente = await clienteService.createClient({
                nombre_completo,
                documento_id,
                info_adicional,
                asesor_id: asesorId
            });

            res.status(201).json({
                success: true,
                message: 'Cliente registrado exitosamente',
                data: nuevoCliente
            });

            

        } catch (error) {
            console.error('Error al crear cliente:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno al registrar cliente'
            });
        }
    },
    async getClientes(req, res) {
        try {
            // Llama al servicio que contiene la lógica de MySQL
            const clientes = await clienteService.findAllClientes(); 
            
            res.status(200).json({
                success: true,
                message: 'Clientes listados exitosamente',
                data: clientes // ⬅️ Devuelve la lista de clientes
            });
        } catch (error) {
            // ... (manejo de error)
            res.status(500).json({ success: false, message: 'Error interno al listar clientes' });
        }
    }
};

module.exports = clienteController;