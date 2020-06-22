const LeadsService = require('./lead');

module.exports = (logger) => new LeadsService(logger);
