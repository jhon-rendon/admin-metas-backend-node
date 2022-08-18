const {Router} = require('express');
const { metaGeneral } = require('../controllers/meta_general');
const router = Router();



router.post('/',metaGeneral);


module.exports = router;