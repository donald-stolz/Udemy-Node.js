const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/messages');
const port = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname, '../public');
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('Message Sent');
    });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome!'));

    socket.broadcast.emit(
        'newMessage',
        generateMessage('Admin', 'New user joined chat')
    );

    socket.on('disconnect', socket => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
