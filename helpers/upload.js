const { v4 }  = require('uuid');
const  path  = require('path');

const cargarFoto = ( files,extesiones = ['png','jpg','gif'],carpeta = '') => {

    return new Promise( ( resolve ,reject ) => {

        if (!files || Object.keys(files).length === 0 || !files.foto) {
            //return res.status(400).json({ msg: 'No existe la foto.' });
            reject('No existe la foto');
        }
    
        const { foto }      = files;
        const nombreCortado = foto.name.split('.');
        const extension     = nombreCortado[ nombreCortado.length-1];
        const extensionesPermitidas = ['png','jpg',' gif'];
    
        if( !extensionesPermitidas.includes(extension )){
           // return res.status(400).json({ msg: `Extensión de foto no permitida, solo se admiten ${extensionesPermitidas}`})
           reject(`Extensión de foto no permitida, solo se admiten ${extensionesPermitidas}`);
        }
        const nuevoNombre   = v4()+'.'+extension;
    
        //res.json({ msg : 'ok',  nuevoNombre});
    
        let uploadPath;
    
        
    
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        //sampleFile = req.files.sampleFile;
        uploadPath = path.join(__dirname,'../visitas/' + nuevoNombre);
    
        // Use the mv() method to place the file somewhere on your server
        foto.mv(uploadPath, function(err) {
            if (err)
            return reject( err );
    
            resolve('File uploaded!');
        });
    
    
    });
    
}

module.exports = {
    cargarFoto
}