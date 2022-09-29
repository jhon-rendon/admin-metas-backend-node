const { response } = require('express');

const { runQuery } = require('../database/config');

const {generarJWT} = require('../helpers/generar-jwt');

const login = async ( req, res = response ) => {
    console.log('auth login');

    const { usuario, password } = req.body;

    try {
        sql= `SELECT  s.loginusr,gambledbv10_2.decrypt(s.PASSWORD) AS clave,
                                                    (
                                                    SELECT h.ubcneg_trtrio_codigo 
                                                    FROM gamble.horariopersonas@PRUEBA	 h 
                                                    WHERE h.contvta_prs_documento = m.documento AND h.tipodia = 'N' and FECHAFINAL is null 
                                                    group by h.ubcneg_trtrio_codigo
                                                    ) territorio,
                                                    m.nombres
                                                    || ' '
                                                    || m.apellido1 AS Usuario, m.documento
                                                FROM gamble.usuarios@PRUEBA s,gamble.personas@PRUEBA m
                                                WHERE
                                                    s.loginusr   = '${usuario}'
                                                AND gambledbv10_2.decrypt(s.PASSWORD) = '${password}'
                                                AND s.loginusr = '${usuario.substring(0,2)}' || CAST(m.documento AS VARCHAR(12))`;

        //console.log(usuario.substring(0,2), sql );
        result = await runQuery(sql);

        //console.log( result,result.resultQuery.rows.length );
        
        if(result.resultQuery.rows.length >  0) {
            // Generar el JWT
            const token = await generarJWT( usuario );
            res.json({
                msg: 'ok',
                token,
                documento:usuario
            })
        }
        else{
            res.status(400).json({
                msg: 'El usuario o Password son incorrectos'
            })
        }    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
    
};

const validarToken = async ( req, res = response ) => {

    res.status(200).json({
        msg: 'Token Valido',
        success: true
    });
}

module.exports = {
    login,
    validarToken
}