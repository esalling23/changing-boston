module.exports = function(app, socket) {

  var io = require('socket.io')(app, {path: '/creating-boston/'});

  var CommonHandler = require('./handlers/Common');
  var PromptManager = require('../lib/PromptManager');

  io.on('connection', function (socket) {

    console.log("Player connection", socket.id);

    // Create event handlers for this socket
    var eventHandlers = {
        common: new CommonHandler(io, socket)
    };

    // Bind events to handlers
    for (var category in eventHandlers) {
        var handler = eventHandlers[category].handler;
        for (var event in handler) {
            socket.on(event, handler[event]);
        }
    }

    socket.send(socket.id);

  });

  console.log('creating-boston: socket.io inititalized');

};