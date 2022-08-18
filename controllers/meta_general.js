const { response } = require("express");

const { runQuery } = require('../database/config');


const metaGeneral = async (req, res = response ) =>{

    const {tipoPeticion} = req.body;
    let  sql, result;
    let  productos = [], meta_general = [],msg='',status = false,json = [];

    //tipoPeticion.forEach(  element => {
    switch( tipoPeticion ){

        case 'pagePrincipal':
            
           /* try {
                connection = await oracledb.getConnection(dbConfig);
                sql = 'SELECT descripcion,nombre_corto,codigo FROM appweb.met_producto_agrupacion  order by nombre_corto';
                result = await connection.execute(sql);

                res.json({ status: true,  result });
            }
            catch (err) {
                res.status(500).json(err);
                console.log('error al ejecutar el sql');
            } finally {
                if (connection) {
                    try {
                        await connection.close();
                    }
                    catch (err) {
                        res.status(500).json(err);
                        console.log('error al conectar la BD');
                    }
                }
            }*/
            sql = 'SELECT descripcion,nombre_corto,codigo FROM appweb.met_producto_agrupacion  order by nombre_corto';
                
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
                    status = true;
                    //json.push
                    /*res.json({
                        productos,
                        status: true,
                        result
                    });*/

                }else{
                   // console.log('No hay datos para la consulta realizada');
                    /*res.json({
                        status: false,
                        msg:'No hay datos para la consulta realizada'
                    });*/
                    
                }
            }else{
                console.log(result.error);
                //res.status(500).json(result.error);
            }

            sql='SELECT anio,mes,porcentaje_meta,nombre_corto FROM appweb.met_meta_general mg,appweb.met_producto_agrupacion pa WHERE pa.codigo = mg.id_prod_agrupacion AND anio = 2022 order by anio,mes';

            result = await runQuery(sql);
            
            if( result.status == true){
                if( result.resultQuery.rows.length > 0 ){
            
                    result.resultQuery.rows.map( metas => {

                        meta_general.push(  {
                            anio:       metas[0],
                            mes:        metas[1],
                            porcentaje: metas[2],
                            producto:   metas[3]
                        });
                    });
                    status = true;
                }else{

                }
            }else{

            }
            
            if( status ){
                res.json({
                    productos,
                    status: true,
                    meta_general
                });
            }else{
                res.status(500).json(result.error);
            }
            


    
            

        break;

        case 'listadoMetasGeneral':

            const anio = ( !req.body.anio )?new Date().getFullYear():req.body.anio; 
            
            sql='SELECT anio,mes,porcentaje_meta,nombre_corto FROM appweb.met_meta_general mg,appweb.met_producto_agrupacion pa WHERE pa.codigo = mg.id_prod_agrupacion AND anio = '+anio+' order by anio,mes';
            result = await runQuery(sql);
            
            if( result.status == true){
                if( result.resultQuery.rows.length > 0 ){
            
                    result.resultQuery.rows.map( metas => {

                        meta_general.push(  {
                            anio:       metas[0],
                            mes:        metas[1],
                            porcentaje: metas[2],
                            producto:   metas[3]
                        });
                    });
                     
                    res.json({
                        meta_general,
                        status: true
                    });
                }else{
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

        case 'listadoProductos':

            sql = 'SELECT descripcion,nombre_corto,codigo FROM appweb.met_producto_agrupacion  order by nombre_corto';
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
    }//fin swicth   

   
}


module.exports = {
    metaGeneral
}