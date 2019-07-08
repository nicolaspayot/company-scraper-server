const config = require('../config');
const routes = require('./routes');

module.exports = server =>
  server.register(routes, {
    routes: {
      prefix: config.api.prefix,
    },
  });
