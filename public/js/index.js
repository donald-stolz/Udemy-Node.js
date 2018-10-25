var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    const { text, from } = message;
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text,
        from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// socket.emit(
//     'createMessage',
//     {
//         from: 'Don',
//         text: 'Hi'
//     },
//     function(data) {
//         console.log('Recieved ', data);
//     }
// );

const messageTextBox = jQuery('[name=message]');
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit(
        'createMessage',
        {
            from: 'User',
            text: messageTextBox.val()
        },
        function() {
            messageTextBox.val('');
        }
    );
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending...');

    navigator.geolocation.getCurrentPosition(
        function(position) {
            locationButton.removeAttr('disabled').text('Send Location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        },
        function() {
            locationButton.removeAttr('disabled').text('Send Location');
            alert('Unable to fetch location');
        }
    );
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    const { url, from } = message;
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url,
        from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
});
