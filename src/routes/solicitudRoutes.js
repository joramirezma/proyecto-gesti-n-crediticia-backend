const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');
const { authenticate } = require('../middlewares/auth'); 

// Ruta protegida para crear solicitudes: POST /api/solicitudes/crear
router.post(
    '/crear',
    authenticate, 
    solicitudController.createSolicitud
);
router.get(
    '/asesor', // Responde a /api/solicitudes/asesor?asesorId=X
    authenticate, 
    solicitudController.getSolicitudesByAsesor // Debes crear esta función
);

module.exports = router;