const express = require('express');

const middleware = require('./middleware');
const routes = require('./routes');

module.exports = (context) => {
  // express app
  const app = express();
  app.context = context;

  // apply middleware for cors
  app.use(middleware.cors());

  app.get('/health', (_, res) => res.send('OK'));

  // app routes
  app.use('/', routes);

  // error handler
  app.use(middleware.errorHandler);

  return app;
};
