const AuthService = require('./auth');

module.exports = (logger) => new AuthService(logger);
