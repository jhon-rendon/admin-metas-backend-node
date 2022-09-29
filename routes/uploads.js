const { Router } = require('express');
const { subirFotoVisita } = require('../controllers/uploads');
const router = Router();

router.post('/cargarfoto',subirFotoVisita);




module.exports = router;

