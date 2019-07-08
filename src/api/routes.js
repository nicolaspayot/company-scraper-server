const Joi = require('@hapi/joi');

module.exports = {
  name: 'routes',
  register: async server => {
    server.route({
      method: 'POST',
      path: '/companies/routes',
      handler: () => 'Hello, World!',
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
