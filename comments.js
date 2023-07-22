// Create web server
var express = require('express');
var app = express();
// Create a server
var server = require('http').createServer(app);
// Create a socket.io instance
var io = require('socket.io').listen(server);
// Store people online
var people = {};
// Store comments
var comments = [];
// Store users
var users = [];

// Listen on port 3000
server.listen(3000);

// If user connect
io.sockets.on('connection', function(socket) {
    // Listen to event 'join' when user join the chat
    socket.on('join', function(name) {
        // Store the name in the socket session for this client
        socket.username = name;
        // Add the client's username to the global list
        people[socket.username] = socket;
        // Push to users
        users.push(name);
        // Send to client
        socket.emit('update', 'You have connected to the server.');
        // Send to all clients except sender
        socket.broadcast.emit('update', name + ' has joined the server.');
        // Send to all clients
        io.sockets.emit('update-people', users);
    });

    // Listen to event 'send' when user send message
    socket.on('send', function(msg) {
        // Send to all clients except sender
        socket.broadcast.emit('chat', socket.username, msg);
    });

    // Listen to event 'disconnect' when user disconnect
    socket.on('disconnect', function() {
        // Remove the username from global usernames list
        delete people[socket.username];
        // Remove the user from users
        for (var i = 0; i < users.length; i++) {
            if (users[i] === socket.username) {
                users.splice(i, 1);
            }
        }
        // Update the list of users in chat, client-side
        io.sockets.emit('update-people', users);
        // Send to all clients except sender
        socket.broadcast.emit('update', socket.username + ' has left the server.');
    });

    // Listen to event 'comment' when user comment
    socket.on('comment', function(comment) {
        // Push to comments
        comments.push(comment);
        // Send to all clients
        io.sockets.emit('update-comment', comments);
    });
});

// Set static folder
app.use(express.static(__dirname + '/public'));

// Route
app.get('/', function(req, res) {
    // Render index.html
    res.render('index.html');
});
