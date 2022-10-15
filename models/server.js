require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');
const { socketController } = require('../socket/controller');


class Server{

    constructor(){

        this.app    = express();
        this.port   = process.env.PORT || 3000;
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );

        //Rutas APP
        this.paths = {
            metaGeneral       : '/meta-general',
            productos         : '/productos',
            auth              : '/auth',
            uploads           : '/uploads',
            graficas_mobile   : '/graficas-mobile'
        };

        //Conexión a la base de datos
        this.conectionBD = this.conectarDB();

        //Middelwares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();

        //this.sockets();
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
        this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles      : true,
            tempFileDir       : '/tmp/',
            createParentPath  : true
        }));
    }

    routes(){

         this.app.use(this.paths.metaGeneral, require('../routes/meta_general'));
         this.app.use(this.paths.productos,require('../routes/productos'));
         this.app.use(this.paths.auth,require('../routes/auth'));
         this.app.use(this.paths.uploads,require('../routes/uploads'));
         this.app.use(this.paths.graficas_mobile,require('../routes/graficas_mobile'));
    }

    sockets(){
        
        this.io.on('connection', socketController);
    }

    listen(){
            
        this.server.listen( this.port,'192.168.41.6', () => {
            console.log(' Servidor Corriendo en el puerto ',this.port);
        });   
       
    }
}

module.exports = Server;