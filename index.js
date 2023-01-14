const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const uuid = require('uuid');

const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
const serverId = uuid.v4();

io.on('connection', (socket) => {
    socket.emit('message', {id: uuid.v4(), username: 'Socket.io Server', clientId: serverId, text: 'Welcome to the Socket.io Server!', time: new Date()});
    socket.on('message', (message) => {
        socket.emit('message', {id: uuid.v4(), username: message.username, clientId: message.clientId, text: message.text, time: new Date()})
    });
})

server.listen(port, () => {
    console.log("Server listening to port " + port);
})
