var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('newMessage', function(message) {
    console.log('Message recieved:', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
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
        console.log('Recieved ', data);
    }
);

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit(
        'createMessage',
        {
            from: 'User',
            text: jQuery('[name=message]').val()
        },
        function(message) {
            console.log(message);
        }
    );
});
