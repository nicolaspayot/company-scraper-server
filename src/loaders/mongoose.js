const mongoose = require('mongoose');
const config = require('../config');

module.exports = async () => {
  const connection = await mongoose.connect(config.mongodbURI, { useNewUrlParser: true, useCreateIndex: true });
  return connection.connection.db;
};
