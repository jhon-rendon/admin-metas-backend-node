const { Router } = require('express');
const { check }  = require('express-validator');
const { login, validarToken }   = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/login',[
    check('usuario',' El usuario es obligatorio').not().isEmpty(),
    check('password',' El password es obligatorio').not().isEmpty(),
    validarCampos
],login);

router.get('/validartoken',[
    validarJWT,
    validarCampos
  ],validarToken);


module.exports = router;