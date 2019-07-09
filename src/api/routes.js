const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const logger = require('../loaders/logger');
const CompanyService = require('../services/company');

module.exports = {
  name: 'routes',
  register: async server => {
    server.route({
      method: 'POST',
      path: '/companies/routes',
      handler: async (request, h) => {
        const { payload } = request;
        try {
          const companyService = new CompanyService(payload);
          const info = await companyService.extractCompanyInformation();
          return h.response(info).code(200);
        } catch (err) {
          logger.error('%s', err.message);
          return Boom.badImplementation(err.message);
        }
      },
      options: {
        validate: {
          payload: Joi.object()
            .keys({
              linkedin: Joi.string().uri(),
              societe: Joi.string().uri(),
            })
            .or('linkedin', 'societe'),
        },
      },
    });
  },
};
