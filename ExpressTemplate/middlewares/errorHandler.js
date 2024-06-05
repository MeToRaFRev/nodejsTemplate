const logger = require('../config/logger');

exports.notFound = (req, res, next) => {
  res.status(404).send('Sorry, we could not find that!');
  logger.warn(`404 - Not Found - ${req.originalUrl} - ${req.method} - ${req.ip}`);
};

exports.serverError = (err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(500).send('Something broke!');
};
