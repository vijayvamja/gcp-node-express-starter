const cors = require('cors');
const errors = require('http-errors');

/**
 * Catch all app errors and respond with friendly JSON.
 */
exports.errorHandler = (err, req, res, next) => {
  if (err) {
    let statusCode = err.status || err.statusCode || 500;

    // Joi errors indicate a bad request
    if (err.joi) statusCode = 400;

    // Any unknown errors should be alerted and looked into.
    if (statusCode > 499) {
      console.error(err);
    }

    return res.status(statusCode).send(err.message);
  }
  return next();
};

exports.cors = () => {
  const options = {
    origin: true,
    credentials: true,
  };
  return cors(options);
};
