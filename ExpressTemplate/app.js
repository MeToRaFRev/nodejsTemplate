const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./config/logger');

const useHttps = fs.existsSync('./certs/cert.pem') && fs.existsSync('./certs/key.pem');
const port = useHttps ? 443 : 80;
const host = process.env.HOST || 'localhost';

// Middleware for parsing JSON bodies
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Use routes
app.use('/', routes);

// 404 handler
app.use(errorHandler.notFound);

// Error handler
app.use(errorHandler.serverError);

// Start the server
if (useHttps) {
  const options = {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
    passphrase: process.env.KEY_PASSWORD || ''
  };
  https.createServer(options, app).listen(port, host, () => {
    logger.info(`HTTPS Server is running on https://0.0.0.0:${port}`);
  });
} else {
  http.createServer(app).listen(port, host, () => {
    logger.info(`HTTP Server is running on http://0.0.0.0:${port}`);
  });
}
