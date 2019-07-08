const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (!dotenv.config()) {
  throw new Error("⚠️ Couldn't find .env file ⚠️");
}

module.exports = {
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  port: parseInt(process.env.PORT, 10),
  api: {
    prefix: '/api',
  },
  linkedin: {
    email: process.env.LINKEDIN_EMAIL,
    password: process.env.LINKEDIN_PASSWORD,
  },
};
