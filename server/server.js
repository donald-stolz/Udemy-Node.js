const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { isRealString } = require('./utils/validators');
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/messages');
const port = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname, '../public');
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        const { name, room } = params;
        if (!isRealString(name) || !isRealString(room)) {
            callback('Name and room name are required');
        }

        socket.emit('newMessage', generateMessage('Admin', 'Welcome'));
        socket.join(room);
        socket
            .to(room)
            .emit(
                'newMessage',
                generateMessage('Admin', `${name} joined the chat.`)
            );

        // socket.to(room).send('newMessage', generateMessage('admin', `Welcome`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('Message Sent');
    });

    socket.on('createLocationMessage', coords => {
        io.emit(
            'newLocationMessage',
            generateLocationMessage(
                'Geoservice',
                coords.latitude,
                coords.longitude
            )
        );
    });

    socket.on('disconnect', socket => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
