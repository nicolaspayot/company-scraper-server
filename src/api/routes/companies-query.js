const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const logger = require('../../loaders/logger');
const SearchService = require('../../services/search');

module.exports = server =>
  server.route({
    method: 'POST',
    path: '/companies/query',
    handler: async (request, h) => {
      const { payload } = request;
      try {
        const search = new SearchService(payload);
        const companyURLs = await search.extractCompanyURLs();
        return h.response(companyURLs).code(200);
      } catch (err) {
        logger.error('%s', err.message);
        return Boom.badImplementation(err.message);
      }
    },
    options: {
      validate: {
        payload: Joi.object().keys({ query: Joi.string().required() }),
      },
    },
  });
