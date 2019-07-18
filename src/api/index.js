const config = require('../config');
const routes = require('./routes');

module.exports = async server => {
  await server.register({
    plugin: require('hapi-cors'),
    options: {
      origins: ['http://localhost:8080'],
    },
  });

  await server.register(routes, {
    routes: {
      prefix: config.api.prefix,
    },
  });
};
