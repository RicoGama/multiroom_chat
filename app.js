/* importar configurações do servidor */
var app = require('./config/server');

/* parametrizar porta de escuta */
var server = app.listen(3000, function () {
    console.log('Server on!')
});

var io = require('socket.io').listen(server);

app.set('io', io);

/* criar conexão por websocket */
io.on('connection', function (socket) {
    console.log("Usuário conectou");

    socket.on('disconnect', function () {
        console.log("Usuário desconectou");
    });

    socket.on('msgParaServidor', function(data) {
        socket.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        socket.broadcast.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            );
    
            socket.broadcast.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            );
        }
        
    });
});