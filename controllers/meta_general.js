const { response } = require("express");

const { runQuery } = require('../database/config');


const listarMetaGeneral = async ( req, res = response ) => {

    console.log('Listar Meta General');

    let  sql, result;
    let  meta_general = [];

     anio = ( !req.body.anio )?new Date().getFullYear():req.body.anio; 
            
            sql='SELECT anio,mes,porcentaje_meta,nombre_corto FROM demoappweb.met_meta_general mg,demoappweb.met_producto_agrupacion pa WHERE pa.codigo = mg.id_prod_agrupacion AND anio = '+anio+' order by anio,mes';
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
                    res.status(400).json({
                        status: false,
                        msg:'No hay datos para la consulta realizada'
                    });
                }
            }else{
                console.log(result.error);
                res.status(500).json(result.error);
            }


};

const guardarMetaGeneral = async ( req, res = response ) => {

    console.log('Guardar Meta General');

    res.json({
        msg:'ok'
    });

};




const metaGeneral = async (req, res = response ) =>{

    const {tipoPeticion} = req.body;
    let  sql, result;
    let  productos = [], meta_general = [],msg='',status = false,json = [];
    let  anio,mes;

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

            sql='SELECT anio,mes,porcentaje_meta,nombre_corto FROM demoappweb.met_meta_general mg,appweb.met_producto_agrupacion pa WHERE pa.codigo = mg.id_prod_agrupacion AND anio = 2022 order by anio,mes';

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

            anio = ( !req.body.anio )?new Date().getFullYear():req.body.anio; 
            
            sql='SELECT anio,mes,porcentaje_meta,nombre_corto FROM demoappweb.met_meta_general mg,demoappweb.met_producto_agrupacion pa WHERE pa.codigo = mg.id_prod_agrupacion AND anio = '+anio+' order by anio,mes';
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
                    res.status(400).json({
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

        case 'insert':

        let { anio:anioInsert,mes,dataPorcentajes } = req.body.data;
        cantErrores = 0;
        errores      = [];
        

        for await (const data of  dataPorcentajes) {
        // dataPorcentajes.forEach( async data => {
            producto         = data.codigo_producto;
            porcentajeMeta   = data.porcentaje;

           /* sql = `INSERT INTO DEMOAPPWEB.MET_META_GENERAL (USUARIO, FECHA_CREACION, ANIO, MES, PORCENTAJE_META, ID_PROD_AGRUPACION) 
              VALUES ('1111778805', SYSDATE, '${anioInsert}', '${mes}', '${porcentajeMeta}', '${producto}')`;
            console.log( sql );*/

            sql = `INSERT INTO DEMOAPPWEB.MET_META_GENERAL
                VALUES 
                (
                :USUARIO,
                :FECHA_CREACION,
                :ANIO,
                :MES,
                :PORCENTAJE_META,
                :ID_PROD_AGRUPACION
                )`;
            params = ['1111778804',new Date().toLocaleDateString(),anioInsert,mes,porcentajeMeta,producto];   

            result =   await runQuery(sql,params,true);

            console.log( result );

            if( result.status == false){
                cantErrores ++;
                errores.push( result.error );
            }
        };

        if( cantErrores > 0){
            res.json( {status:false, errores});
        }else{
            res.json( {status:true}); 
        }

        

        
        break;
    }//fin swicth   

   
}


module.exports = {
    metaGeneral,
    listarMetaGeneral,
    guardarMetaGeneral
}