const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { isRealString } = require('./utils/validators');
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/messages');
const { Users } = require('./utils/users');
const port = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname, '../public');
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        const { name, room } = params;
        if (!isRealString(name) || !isRealString(room)) {
            return callback('Name and room name are required');
        }
        socket.join(room);
        users.removeUser(socket.id);
        users.addUser(socket.id, name, room);

        io.to(room).emit('updateUserList', users.getUserList(room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome'));
        socket
            .to(room)
            .emit(
                'newMessage',
                generateMessage('Admin', `${name} joined the chat.`)
            );

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if (user && isRealString(message)) {
            const { name, room } = user;
            io.to(room).emit('newMessage', generateMessage(name, message));
            return callback();
        }
        return callback();
    });

    socket.on('createLocationMessage', coords => {
        var user = users.getUser(socket.id);

        if (user) {
            const { name, room } = user;
            io.to(room).emit(
                'newLocationMessage',
                generateLocationMessage(name, coords.latitude, coords.longitude)
            );
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        const { name, room } = user;
        if (user) {
            io.to(room).emit('updateUserList', users.getUserList(room));
            io.to(room).emit(
                'newMessage',
                generateMessage('Admin', `${name} has left ${room}`)
            );
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on localhost:${port}`);
});
