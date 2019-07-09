const mongooseConnect = require('./loaders/mongoose');
const hapi = require('./loaders/hapi');
const logger = require('./loaders/logger');

const init = async () => {
  await mongooseConnect();
  logger.info('Database loaded and connected!');

  const server = await hapi();
  await server.start();
  logger.info('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  logger.error(err);
  // eslint-disable-next-line
  process.exit(1);
});

init();
