const { response, request } = require("express");
const { cargarFoto } = require("../helpers/upload");


const subirFotoVisita = async ( req = request, res = response) =>{

    console.log('subir foto visita');  

    try {
         await cargarFoto(req.files); 
         
         res.json({ msg: 'ok'})
    } catch (error) {
        console.log( error );

        res.status(400).json( error );
    }
   
};

module.exports = {
    subirFotoVisita
}