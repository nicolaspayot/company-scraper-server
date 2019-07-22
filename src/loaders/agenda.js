const Agenda = require('agenda');
const config = require('../config');
const Company = require('../models/company');

module.exports = () => {
  const agenda = new Agenda({
    db: { address: config.mongodbURI, collection: 'jobs', options: { useNewUrlParser: true } },
  });

  agenda.define('DELETE_OLD_COMPANIES', (_, done) => {
    const currentDate = new Date();
    const oneDayAgo = currentDate.setDate(currentDate.getDate() - 1);
    Company.remove({ updatedAt: { $lt: oneDayAgo } }, done);
  });

  return agenda;
};
