var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'don@email.com',
        text: 'Hello worlds!'
    });
});

socket.on('newMessage', function(message) {
    console.log('Message recieved:', message);
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.emit(
    'createMessage',
    {
        from: 'Don',
        text: 'Hi'
    },
    function(data) {
        console.log(data);
    }
);
