const winston = require('winston');
const config = require('../config');

const transports = [];
if (process.env.NODE_ENV !== 'development') {
  transports.push(new winston.transports.Console());
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.cli(), winston.format.splat()),
    }),
  );
}

const logger = winston.createLogger({
  level: config.logs.level,
  format: winston.format.combine(
    winston.format.cli(),
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    process.env.NODE_ENV !== 'development'
      ? new winston.transports.Console()
      : new winston.transports.Console({ format: winston.format.cli() }),
  ],
});

module.exports = logger;
