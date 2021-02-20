const WebSocket = require('ws');
const UserController = require('../../controller/user.controller');

// Exports a function that can be mounted into an express server
module.exports = (server) => {
  const socketServer = new WebSocket.Server({ server });
  socketServer.on('connection', (socket) => {
    // When a client connects, you can
    UserController.on('handleWriteUser', (user) => {
      socket.send(`A new user has been created`);
      socket.send(`Name: ${user.username}`);
    });

    UserController.on('handleDeleteUser', (userId) => {
      socket.send(`User ${userId} has been deleted`);
    });
    console.log('Received connection');
  });
};
