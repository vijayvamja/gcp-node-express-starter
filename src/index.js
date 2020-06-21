const winston = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');

const App = require('./app');
const Auth = require('./auth');

const { NODE_ENV = 'development', LOG_LEVEL = 'debug' } = process.env;

async function setup() {
  const logger = winston.createLogger({
    level: LOG_LEVEL,
    transports: [new winston.transports.Console()]
      // Add StackDriver logging in non-dev environments
      .concat(NODE_ENV === 'development' ? [] : new LoggingWinston()),
  });

  const auth = Auth(logger);

  return {
    logger,
    auth,
  };
}

exports.app = async (...params) => {
  const context = await setup();
  const app = App(context);
  return app(...params);
};
