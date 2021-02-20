// Require the environment variables
require('dotenv').config();

// Import the server module
const app = require('./app');

// Init webhooks
require('./web/hooks/User.webhooks');

// Hook up the websocket server
require("./web/sockets/User.socket")(app);

// Make the app listen on the defined port
app.listen(process.env.PORT, () => {
  console.log(
    `App listening on ${process.env.HOST}:${process.env.PORT} in ${process.env.NODE_ENV} environment`
  );
  console.log(
    `Api documentation running on ${process.env.HOST}:${process.env.PORT}${process.env.API_VERSION}${process.env.PATH_DOCS}`
  );
});
