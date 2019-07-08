const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const logger = require('../loaders/logger');
const Linkedin = require('../services/linkedin/linkedin');

module.exports = {
  name: 'routes',
  register: async server => {
    server.route({
      method: 'POST',
      path: '/companies/routes',
      handler: async (request, h) => {
        try {
          const linkedin = new Linkedin(request.payload.linkedin);
          const information = await linkedin.extractCompanyInformation();
          return h.response(information).code(200);
        } catch (err) {
          logger.error('%s', err.message);
          return Boom.notFound(err.message);
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
