const {Router} = require('express');
const router = Router();
const BD = require('../config/config.js');


router.get('/',(req,res) =>{

    res.status(200).json({
        msg: 'ruta status 200'
    })
});


router.get('/meta-general',async(req, res) => {

    const meta_general     = [];
    const productos        = [];
    //sql='select anio,mes,porcentaje_meta,ID_PROD_AGRUPACION from APPWEB.met_meta_general';

    let anio = req.query.filtroAnio;

    if( !anio ){
        anio = 2022;
    }
    sql='SELECT anio,mes,porcentaje_meta,nombre_corto FROM appweb.met_meta_general mg,appweb.met_producto_agrupacion pa WHERE pa.codigo = mg.id_prod_agrupacion AND anio = '+anio+' order by anio,mes';

    result = await BD.Open(sql,[],false);

    result.rows.map( metas => {

        meta_general.push(  {
            anio:       metas[0],
            mes:        metas[1],
            porcentaje: metas[2],
            producto:   metas[3]
        } );
    });
    //console.log(vector);

    sql = 'SELECT descripcion,nombre_corto,codigo FROM appweb.met_producto_agrupacion  order by nombre_corto';

    result = await BD.Open(sql,[],false);

    result.rows.map( producto => {

        productos.push(  {
            descripcion:   producto[0],
            nombre_corto:  producto[1],
            codigo :       producto[2],
        
        } );
    });
    
    res.json({productos:productos,metas:meta_general});
});

module.exports = router;