
const oracledb = require('oracledb');


try {
    oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_21_6'});
} catch (error) {
  console.log(error);
  throw new Error('Error al iniciar el oracle instantclient');
  process.exit(1);
}

dbConfig = {
    user          : process.env.USER,
    password      : process.env.PASSWORD,
    connectString :process.env.CONNECTSTRING
}

const dbConnection = async() => {

    try {
        await oracledb.getConnection(dbConfig);
        console.log('Base de datos online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }
}

const runQuery = async ( sql, binds=null, autoCommit=null ) =>{
    
    let connection, resultQuery;

    try {
        connection  = await oracledb.getConnection(dbConfig);
        resultQuery = await connection.execute(sql);
        
        return  {
            status : true,
            msg    : 'ok',
            error  : null,
            resultQuery
        }
        
    }//fin try
    catch (error) {
    
        console.log('error al ejecutar el sql');
        return  {
            status : false,
            msg    : 'Error al ejecutar el sql',
            error
        }
    
    }//fin catch 
    finally {
        if (connection) {
            try {
                await connection.close();
            }
            catch (error) {
                
                console.log('error al conectar la BD');
                return  {
                    status : false,
                    msg    : 'Error al conectar la BD',
                    error
                }
                
            }//fin catch
        }//fin if
    }//fin finally
}



module.exports = {
    dbConnection,
    dbConfig,
    runQuery
}