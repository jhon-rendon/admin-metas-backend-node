const { Router } = require('express');
const { check }  = require('express-validator');
const { login, validarToken }   = require('../controllers/auth');
const { bar } = require('../controllers/graficas_mobile');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/bar',[
   // check('usuario',' El usuario es obligatorio').not().isEmpty(),
    //check('password',' El password es obligatorio').not().isEmpty(),
    //validarCampos
],bar);




module.exports = router;