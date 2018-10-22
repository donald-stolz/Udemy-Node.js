const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname, '../public');
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('createMessage', newMessage => {
        console.log('New message created:');
        console.log(newMessage);
    });

    socket.emit('newMessage', {
        from: 'don@email.com',
        text: 'Hello world!',
        createdAt: '10/22/18'
    });

    socket.on('disconnect', socket => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
