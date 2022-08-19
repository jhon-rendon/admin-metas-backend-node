const {Router} = require('express');
const { listadoProductos } = require('../controllers/productos');
const router = Router();



router.post('/',listadoProductos);


module.exports = router;