// En src/services/clienteService.js

// ⚠️ NOTA: Asume que creaste el modelo de Cliente en src/models/Cliente.js
const Cliente = require('../models/Cliente'); 

const clienteService = {
    async findAllClientes() {
        try {
            const clientes = await Cliente.findAll();
            return clientes;
        } catch (error) {
            // 🚀 CORRECCIÓN CLAVE: Imprimir el error ANTES de relanzarlo
            console.error('ERROR DETECTADO en clienteService.findAllClientes:', error); 
            
            // Relanzar el error para que el controlador lo capture y devuelva el 500
            throw new Error('No se pudo obtener la lista de clientes.');
        }
    },
    /**
     * Crea un nuevo registro de cliente en la base de datos.
     * @param {Object} clientData - Datos del cliente, incluyendo asesor_id.
     * @returns {Promise<Object>} El cliente creado.
     */
    async createClient({ nombre_completo, documento_id, info_adicional, asesor_id }) {
        try {
            // 🚀 Llamada al método de creación del modelo Cliente
            console.log(asesor_id)
            const nuevoCliente = await Cliente.create({
                nombre_completo,
                documento_id,
                info_adicional,
                asesor_id // Este campo se guardará como 'creado_por' en la DB
            });
            
            return nuevoCliente;
        } catch (error) {
            // Manejo de errores específicos de la DB (ej., documento duplicado)
            console.error('Error en clienteService.createClient:', error);
            throw new Error('Error en la base de datos al registrar el cliente.');
        }
    },
    
    // Aquí puedes agregar otras funciones como findById, update, etc.
};

module.exports = clienteService;