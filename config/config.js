
const oracledb = require('oracledb');
try {
  oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_21_6'});
} catch (err) {
  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}

db = {
    user:'system',
    password:'oracle',
    //connectString:'172.16.30.9:1521',
    connectString:'(DESCRIPTION=(ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 172.16.30.9)(PORT = 1521)))(CONNECT_DATA=(SID=gamble)))'
    //connectString:'172.16.30.9:1521/gamble'
}

async function open(sql, binds, autoCommit){

    let con       = await oracledb.getConnection(db).catch(err => console.log('ERRO', err));
    //console.log(con);
    //sql='select *  from APPWEB.met_meta_vendedor_mes where anio=2022 and mes=7';

    let resultado = await con.execute(sql);
    con.release();
    return resultado;
}

exports.Open = open;