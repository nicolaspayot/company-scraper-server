const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const logger = require('../loaders/logger');
const Linkedin = require('../services/linkedin/linkedin');
const Societe = require('../services/societe/societe');

module.exports = {
  name: 'routes',
  register: async server => {
    server.route({
      method: 'POST',
      path: '/companies/routes',
      handler: async (request, h) => {
        const { payload } = request;
        try {
          if (payload.linkedin && !payload.societe) {
            const linkedin = new Linkedin(request.payload.linkedin);
            const info = await linkedin.extractCompanyInformation();
            return h.response(info).code(200);
          } else if (!payload.linkedin && payload.societe) {
            const societe = new Societe(request.payload.societe);
            const info = await societe.extractCompanyInformation();
            return h.response(info).code(200);
          } else {
            const linkedin = new Linkedin(request.payload.linkedin);
            const societe = new Societe(request.payload.societe);
            const [linkedinInfo, societeInfo] = await Promise.all([
              linkedin.extractCompanyInformation(),
              societe.extractCompanyInformation(),
            ]);
            return h.response({ linkedin: linkedinInfo, societe: societeInfo }).code(200);
          }
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
