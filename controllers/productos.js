const { response } = require("express");

const { runQuery } = require('../database/config');


const listadoProductos = async (req, res = response ) =>{

    const {tipoPeticion} = req.body;
    let  sql, result,productos=[];

    switch( tipoPeticion ){
        
        case 'listar':

            sql = 'SELECT descripcion,nombre_corto,codigo FROM demoappweb.met_producto_agrupacion  order by nombre_corto';
            result = await runQuery(sql);
            
            if( result.status == true){
                if( result.resultQuery.rows.length > 0 ){
                    
                    result.resultQuery.rows.map( producto => {
                        productos.push(  {
                            descripcion:   producto[0],
                            nombre_corto:  producto[1],
                            codigo :       producto[2],
                        
                        });
                    });
                    res.json({
                        productos,
                        status: true,
                        result
                    });

                }else{
                    console.log('No hay datos para la consulta realizada');
                    res.json({
                        status: false,
                        msg:'No hay datos para la consulta realizada'
                    });
                }
            }else{
                console.log(result.error);
                res.status(500).json(result.error);
            }

        break;
        
    }

}

module.exports = {
    listadoProductos
}