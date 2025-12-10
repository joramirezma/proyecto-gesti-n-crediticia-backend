const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { authenticate } = require('../middlewares/auth'); // Importa tu middleware de autenticación

// Ruta protegida para la creación de clientes
// Debe usar el middleware 'authenticate' para asegurar que solo un usuario logueado pueda crear un cliente.
router.post(
    '/crear',
    authenticate, // Verifica el token y adjunta req.user
    clienteController.createClient
);
router.get(
    '/', // El path es solo '/' porque el prefijo en app.js es /api/clientes
     
    clienteController.getClientes // Llama a la función del controlador
);
module.exports = router;