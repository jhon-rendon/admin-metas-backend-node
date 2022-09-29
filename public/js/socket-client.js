//Variables HTML

const online  = document.querySelector('#online');
const offline = document.querySelector('#offline');
const mensaje = document.querySelector('#mensaje').value;
const btn     = document.querySelector("#btnEnviar");

const socket = io();

socket.on('connect', ()=> {
    console.log('conectado');
    offline.style.display = 'none';
    online.style.display  = '';
});


socket.on('disconnect', ()=> {

    console.log('Desconectado');
    online.style.display = 'none';
    offline.style.display  = '';
});

btn.addEventListener('click', (event) =>{
    //console.log('click',mensaje);

    /*socket.emit('mensaje',{
        msg:'Mi mensaje',
        fecha: new Date().toLocaleString
    });*/

    socket.emit( 'mensaje2', null, ( ticket ) => {
        console.log( ticket);
    });
});

// socket.on('mensaje', ( payload ) =>{ 

//     console.log('jhjgj',payload );
// });

socket.on('mensaje', payload  =>{ 

    console.log( payload );
});


