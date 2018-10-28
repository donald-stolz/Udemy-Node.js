var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (
        clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
        scrollHeight
    ) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        }
        console.log('No error');
    });
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
    scrollToBottom();
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

const messageTextBox = jQuery('[name=message]');
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', messageTextBox.val(), function(res) {
        console.log(res);
        messageTextBox.val('');
    });
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
    scrollToBottom();
});

socket.on('updateUserList', function(users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(user => {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});
