const logger = require('../config/logger');

exports.home = (req, res) => {
  res.send('Hello, World!');
  logger.info('Home route accessed');
};

exports.postData = (req, res) => {
  const data = req.body;
  res.send(`You sent: ${JSON.stringify(data)}`);
  logger.info('Data received', { data });
};
