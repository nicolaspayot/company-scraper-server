const companiesQuery = require('./companies-query');
const companiesURLs = require('./companies-urls');

module.exports = {
  name: 'routes',
  register: async server => {
    companiesQuery(server);
    companiesURLs(server);
  },
};
