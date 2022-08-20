require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const { dbConnection } = require('../database/config');


class Server{

    constructor(){
        this.app  = express();
        this.port = process.env.PORT || 3000;

        //Conexión a la base de datos
        this.conectionBD = this.conectarDB();

        //Middelwares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );
        

        // Directorio Público
        //this.app.use( express.static('public') );
    }

    routes(){

         this.app.use('/meta-general', require('../routes/meta_general'));
         this.app.use('/productos',require('../routes/productos'));
         this.app.use('/auth',require('../routes/auth'));
       
    }

    listen(){
            
        this.app.listen( this.port, () => {
            console.log(' Servidor Corriendo en el puerto ',this.port);
        });   
       
    }
}

module.exports = Server;