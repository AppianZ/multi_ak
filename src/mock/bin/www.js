#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var http = require('http');
var appConfig = require('../config/app.config');
var port = normalizePort(appConfig.port);
var log4js = require('log4js');

/*try {
  require('fs').mkdirSync('./src/mock/logs');
} catch (e) {
  if (e.code != 'EEXIST') {
    console.error("Could not set up log directory, error was: ", e);
    process.exit(1);
  }
}*/

/**
 * Get port from environment and store in Express.
 */
app.set('port', port);
// log4js.configure('./src/mock/config/log4js.json');

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require('socket.io')(server);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * websocket work.
 */

var targetSocketArray = [];
var roomGroupList = [];


io.on('connection', function (socket) {
  socket.on('joinToRoom', function (data) {
    socket.join(data.roomGroupId)
    if(roomGroupList.indexOf(data.roomGroupId < 0)) {
      roomGroupList.push(data.roomGroupId);
    }
  })

  socket.on('addUser', function (data, func) {
    targetSocketArray.push(data.user);
    socket.in(data.roomGroupId).emit('showUser', targetSocketArray.filter(function (item) {
      return item.roomGroupId == data.roomGroupId;
    }));
    func(targetSocketArray.filter(function (item) {
      return item.roomGroupId == data.roomGroupId;
    }));
  });

  socket.on('onTimeCount', function (data, func) {
    socket.in(data.roomGroupId).emit('timeDecrease', {
      isEnd: data.isStart == 2,
      isWait: data.isStart == 0,
      time: data.time
    });
    func({
      time : data.time,
      isStart: data.isStart,
    });
  });

  socket.on('increaseCount', function (data) {
    targetSocketArray.map(function(item) {
      if(item.id == data.id) {
        item.content = Object.assign({}, item.content, data.content);
      }
      return item;
    })
    socket.in(data.roomGroupId).emit('showUser', targetSocketArray.filter(function (item) {
      return item.roomGroupId == data.roomGroupId;
    }));
  });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}
