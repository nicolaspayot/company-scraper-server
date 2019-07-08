const Hapi = require('@hapi/hapi');
const config = require('../config');
const api = require('../api');

module.exports = async () => {
  const server = Hapi.server({
    port: config.port,
    host: 'localhost',
  });

  // Load routes
  await api(server);

  return server;
};
