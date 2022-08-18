//require('dotenv').config();
const port = process.env.PORT || 8080;
const express = require('express');
const morgan  = require('morgan');
const cors = require('cors');
const app = express();

const router = require('./routes/routes.js');
/*app.get('/', function (req , res ) {
    res.send('Hola mundo');
});*/
app.use(cors());
app.use( morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(router);

app.listen( port, () => {
    console.log(`servidor corriendo en el puerto ${ port }]`);
});