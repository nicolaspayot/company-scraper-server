const Joi = require('@hapi/joi');
const CompanyService = require('../../services/company');

module.exports = server => {
  server.route({
    method: 'POST',
    path: '/companies/urls',
    handler: async (request, h) => {
      const { payload } = request;
      const companyService = new CompanyService(payload);
      const company = await companyService.findByURLsAndCreate();
      return h.response(company).code(200);
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
};
