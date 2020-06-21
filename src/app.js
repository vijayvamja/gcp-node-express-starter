const express = require('express');
const middleware = require('./middleware');
const routes = require('./routes');

module.exports = context => {

  // express app
  const app = express();

  // apply middleware for cors
  app.use(middleware.cors());

  // app routes
  app.get('/health', (_, res) => res.send('OK'));

  app.use('/', routes);

  return app;

}
