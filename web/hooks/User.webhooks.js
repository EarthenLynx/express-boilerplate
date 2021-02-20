const UserWebhook = require('../../controller/user.controller');

// In this file, for each controller event, a webhook can be mounted
UserWebhook.on('handleWriteUser', (user) => {
  // You can use the business logic inside this function to communicate with other services
  console.log("The following entry comes from the event emitter")
  console.log(user);
});

UserWebhook.on('handleDeleteUser', userId => {
  console.log('Let another service know you\'ve just deleted user' + userId)
})

module.exports = UserWebhook;
