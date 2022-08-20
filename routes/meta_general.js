const {Router} = require('express');
const { check } = require('express-validator');

const { metaGeneral, guardarMetaGeneral, listarMetaGeneral } = require('../controllers/meta_general');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



router.post('/',metaGeneral);

router.post('/listar',[
  validarJWT,
  check('anio', 'El año es obligatorio').not().isEmpty(),
  validarCampos
],listarMetaGeneral);



router.post('/guardar',[
    check('data.*.anio','El año es obligatorio').not().isEmpty(),
    /*check('data.*.anio','El año es obligatorio y debe ser numerico').not().isEmpty(),
    check('data.mes','El mes es obligatorio y debe ser numerico').not().isEmpty(),
    check('data.dataPorcentajes.*.codigo_producto','El codigo del producto es obligatorio y debe ser numerico').not().isEmpty(),
    check('data.*.porcentaje','El Porcentaje de la meta es obligatorio y debe ser numerico').not().isEmpty(),*/
    validarCampos
],guardarMetaGeneral);


module.exports = router;