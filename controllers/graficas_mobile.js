const { response } = require("express");

const { runQuery } = require('../database/config');


const bar = async (req, res = response ) =>{

 
    //const {tipoPeticion} = req.body;
    let  sql, result,productos_meta=[],productos_venta=[];

    //switch( tipoPeticion ){
        
        //case 'listar':
        sql = `SELECT ID_META_GENERAL_PROD agrupacion,nombre_corto,
        sum(valormeta) valor_meta_mes,ROUND ((sum(valormeta)/(30)),0) valormeta from appweb.met_meta_centro_costo, appweb.met_producto_agrupacion
         where META_GENERAL_ANIO =  2022 AND 
         META_GENERAL_MES = 10
         AND codigo= ID_META_GENERAL_PROD
         group by ID_META_GENERAL_PROD,nombre_corto
         order by nombre_corto`;

            //sql = 'SELECT descripcion,nombre_corto,codigo FROM demoappweb.met_producto_agrupacion  order by nombre_corto';
            result = await runQuery(sql);
            
            if( result.status == true){
                if( result.resultQuery.rows.length > 0 ){
                    
                    result.resultQuery.rows.map( async producto => {
                        productos_meta.push(  {
                            codigo_linea   :  producto[0],
                            nombre_corto   :  producto[1],
                            valor_meta_mes :  producto[2],
                            valor_meta_dia :  producto[3],
                        
                        });
                    });
                   /*sql =`SELECT pa.nombre_corto agrupacion, pa.codigo codigo_agrupacion, SUM(venta) valorventa,SUM(vad.VTABRUTASINIVA) vtabrutasiniva
                            FROM appweb.met_ventacumulada_diaria vad, appweb.met_producto_agrupacion pa
                            WHERE to_char(fecha,'MM/YYYY')  = '10/2022'
                            AND vad.productoagrupacion = pa.codigo
                            GROUP BY pa.nombre_corto, pa.codigo
                            order by nombre_corto`;
                    result = await runQuery(sql);
                    if( result.status == true){
                        if( result.resultQuery.rows.length > 0 ){
                            result.resultQuery.rows.map( async producto_venta => {
                                productos_venta.push(  {
                                    codigo_linea        :  producto_venta[1],
                                    nombre_corto        :  producto_venta[0],
                                    valor_venta_mes     :  producto_venta[2],
                                    valor_venta_mes_iva :  producto_venta[3]
                                });

                                productos_meta.forEach( (value,index,array )=>{

                                    
                                    if( value.codigo_linea ===  productos_venta.codigo_linea ){
                                        array[index].push( {"valor_venta_mes": productos_venta.valor_venta_mes} );
                                    }
                                });
                            });

                            
                        }  
                    }*/

                    
                  
                    /*res.json({
                        productos_meta,
                        productos_venta,
                        status: true,
                        //result
                    });*/

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


            sql =`SELECT pa.nombre_corto agrupacion, pa.codigo codigo_agrupacion, SUM(venta) valorventa,SUM(vad.VTABRUTASINIVA) vtabrutasiniva
                            FROM appweb.met_ventacumulada_diaria vad, appweb.met_producto_agrupacion pa
                            WHERE to_char(fecha,'MM/YYYY')  = '10/2022'
                            AND vad.productoagrupacion = pa.codigo
                            GROUP BY pa.nombre_corto, pa.codigo
                            order by nombre_corto`;
            result = await runQuery(sql);
            if( result.status == true){
                        if( result.resultQuery.rows.length > 0 ){
                            result.resultQuery.rows.map( async producto_venta => {
                                productos_venta.push(  {
                                    codigo_linea        :  producto_venta[1],
                                    nombre_corto        :  producto_venta[0],
                                    valor_venta_mes     :  producto_venta[2],
                                    valor_venta_mes_iva :  producto_venta[3]
                                });

                            });

                            
                        }  
                    }
                    else{
                        console.log('No hay datos para la consulta realizada');
                        res.json({
                            status: false,
                            msg:'No hay datos para la consulta realizada'
                        });
                    }
            
           if( productos_venta.length > 0 && productos_meta.length > 0 ){

                res.json({
                    productos_meta,
                    productos_venta,
                    status: true,
                    //result
                });
           }
    

       // break;
        
    //}

}

module.exports = {
    bar
}