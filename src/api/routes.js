module.exports = {
  name: 'routes',
  register: async server => {
    server.route({
      method: 'GET',
      path: '/',
      handler: () => 'Hello World!',
    });
  },
};
