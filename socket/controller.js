
const socketController = ( socket ) => {
    console.log('CLiente Conectado');

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    socket.on('mensaje', payload => {
        //console.log( 'recibido ',payload);
        //const id=112312;
        //callback( id );
        socket.broadcast.emit('mensaje', ( payload ));
    });

    socket.on('mensaje2', ( payload, callback ) => {
        
       
        callback( payload );
        //socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length);

    });
}


module.exports = {
    socketController
}