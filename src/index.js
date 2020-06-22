require('dotenv').config();

const mongoose = require('mongoose');
const winston = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');

const App = require('./app');
const Lead = require('./lead');

const { NODE_ENV = 'development', LOG_LEVEL = 'debug' } = process.env;

async function setup() {
  const logger = winston.createLogger({
    level: LOG_LEVEL,
    transports: [new winston.transports.Console()]
      // Add StackDriver logging in non-dev environments
      .concat(NODE_ENV === 'development' ? [] : new LoggingWinston()),
  });

  const mongoUri = process.env.MONGO_HOST;
  mongoose.connect(mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    promiseLibrary: Promise,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('error', () => {
    throw new Error(`unable to connect database: ${mongoUri}`);
  });

  const lead = Lead(logger);

  return {
    logger,
    lead,
  };
}

exports.app = async (...params) => {
  const context = await setup();
  const app = App(context);
  return app(...params);
};
